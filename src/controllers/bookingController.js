import Booking from "../models/BookingModel.js";
import Event from "../models/EventModel.js";
import utility from "../utils/utility.js";

const createBooking = async (req, res) => {
  try {
    const { qty } = req.body;
    const event = req.event;
    const user = req.user;

    const updateEvent = await Event.findOneAndUpdate(
      { _id: event._id, totalSeats: { $gte: event.bookedSeats + qty } },
      { $inc: { bookedSeats: qty } },
      { new: true }
    );

    if (!updateEvent) {
      return res.status(400).json({ message: "Not enough seats available." });
    }

    const bookingId = await utility.generateBookingId();

    const booking = await Booking.create({
      bookingId,
      event: event._id,
      user: user._id,
      qty,
      totalPrice: qty * event.price,
    });

    return res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate("event", "title date city price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Your bookings fetched successfully",
      totalBookings: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getOrganizerAnalytics = async (req, res) => {
  try {
    const organizerId = req.user._id;

    const events = await Event.find({ organizer: organizerId });

    const totalEvents = events.length;

    let totalTickets = 0;
    let totalRevenue = 0;
    let topEvent = null;
    let maxTickets = 0;

    for (const evt of events) {
      totalTickets += evt.bookedSeats;
      const revenue = evt.bookedSeats * evt.price;
      totalRevenue += revenue;
      if (evt.bookedSeats > maxTickets) {
        maxTickets = evt.bookedSeats;
        topEvent = evt;
      }
    }

    return res.status(200).json({
      message: "Organizer analytics fetched successfully",
      totalEvents,
      totalTickets,
      totalRevenue,
      topEvent: topEvent
        ? {
            id: topEvent._id,
            title: topEvent.title,
            ticketsSold: maxTickets,
          }
        : null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export default { createBooking, getMyBookings, getOrganizerAnalytics };
