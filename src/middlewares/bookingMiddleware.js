import Event from "../models/EventModel.js";

const checkSeatsAvailability = async (req, res, next) => {
  try {
    const { eventId, qty } = req.body;

    const event = await Event.findOne({ eventId });
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const availableSeats = event.totalSeats - event.bookedSeats;
    if (qty > availableSeats) {
      return res.status(400).json({
        message: `Only ${availableSeats} seats are available`,
      });
    }

    req.event = event;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export default { checkSeatsAvailability };
