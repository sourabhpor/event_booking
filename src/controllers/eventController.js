import Event from "../models/EventModel.js";

const createEvent = async (req, res) => {
  try {
    const bodyData = req.body;
    const event = await Event.create(bodyData);
    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export default { createEvent };
