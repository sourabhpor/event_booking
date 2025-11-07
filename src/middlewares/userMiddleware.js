import User from "../models/UserModel.js";

const checkEmailExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists." });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const checkValidEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email." });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
export default { checkEmailExist, checkValidEmail };
