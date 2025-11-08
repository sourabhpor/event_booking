import Event from "../models/EventModel.js";
import utility from "../utils/utility.js";
// import redis from "../config/redis.js";

const createEvent = async (req, res) => {
  try {
    const bodyData = req.body;
    const userId = req.user._id;
    const eventId = await utility.generateEventId();
    const event = await Event.create({
      ...bodyData,
      eventId,
      organizer: userId,
      status: "DRAFT",
    });
    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    return res.status(500).json({ message: "Server Error.." });
  }
};

const updateEvent = async (req, res) => {
  try {
    const bodyData = req.body;
    const event = req.event;
    const { id } = req.params;

    if (event.status === "CANCELLED") {
      return res
        .status(400)
        .json({ message: "Cannot update a cancelled event." });
    }
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id },
      { $set: bodyData },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      message: "Event updated successfully",
      updatedEvent,
    });
  } catch (error) {
    console.error("Update Event Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const publishEvent = async (req, res) => {
  try {
    const event = req.event;
    if (event.status !== "DRAFT") {
      return res
        .status(400)
        .json({ message: "Only draft events can be published." });
    }
    event.status = "PUBLISHED";
    await event.save();
    return res.status(200).json({
      message: "Event published successfully",
      event,
    });
  } catch (error) {
    console.error("Publish Event Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const cancelEvent = async (req, res) => {
  try {
    const event = req.event;
    if (event.status === "CANCELLED") {
      return res.status(400).json({ message: "Event is already cancelled." });
    }
    event.status = "CANCELLED";
    await event.save();
    return res.status(200).json({
      message: "Event cancelled  successfully",
      event,
    });
  } catch (error) {
    console.error("Publish Event Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getMyEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    if (req.user.role !== "ORGANIZER") {
      return res
        .status(403)
        .json({ message: "Access denied. Only organizers can view this." });
    }

    const events = await Event.find({ organizer: userId });

    const eventStatus = events.map((event) => ({
      eventId: event.eventId,
      title: event.title,
      city: event.city,
      date: event.date,
      status: event.status,
      totalSeats: event.totalSeats,
      bookedSeats: event.bookedSeats,
      price: event.price,
      revenue: event.bookedSeats * event.price,
    }));

    const totalRevenue = eventStatus.reduce(
      (acc, curr) => acc + curr.revenue,
      0
    );
    const totalTicketsSold = eventStatus.reduce(
      (acc, curr) => acc + curr.bookedSeats,
      0
    );
    return res.status(200).json({
      message: "Organizer events fetched successfully",
      totalEvents: eventStatus.length,
      totalTicketsSold,
      totalRevenue,
      events: eventStatus,
    });
  } catch (error) {
    console.error("Get My Events Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getPublishedEvents = async (req, res) => {
  try {
    const {
      city,
      date,
      tags,
      sortBy,
      order = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = { status: "PUBLISHED" };

    if (city) filter.city = city;
    if (date) filter.date = { $eq: new Date(date) };
    if (tags) filter.tags = { $in: tags.split(",") };

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [events, totalEvents] = await Promise.all([
      Event.find(filter).sort(sortOptions).skip(skip).limit(parseInt(limit)),
      Event.countDocuments(filter),
    ]);
    return res.status(200).json({
      message: "Published events fetched successfully",
      totalEvents,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalEvents / parseInt(limit)),
      events,
    });
  } catch (error) {
    console.error("Get Published Events Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default {
  createEvent,
  updateEvent,
  publishEvent,
  cancelEvent,
  getMyEvents,
  getPublishedEvents,
};
