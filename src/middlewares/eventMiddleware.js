import Event from "../models/EventModel.js";
import User from "../models/UserModel.js";

const checkUserId = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid User ID." });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const checkOrganizer = async (req, res, next) => {
  try {
    if (req.user.role !== "ORGANIZER") {
      return res
        .status(403)
        .json({ message: "Access denied. Only organizers can create events." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const checkEventOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id, organizer: req.user._id });
    if (!event) {
      return res.status(404).json({ message: "Event not found or not yours" });
    }
    req.event = event;
    next();
  } catch (error) {
    console.error("Check Event Owner Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default { checkUserId, checkOrganizer, checkEventOwner };
