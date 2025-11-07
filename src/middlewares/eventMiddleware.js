import Event from "../models/EventModel.js";
import User from "../models/UserModel.js";

const checkUserId = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid User ID." });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
export default { checkUserId };
