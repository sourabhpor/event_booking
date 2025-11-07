import User from "../models/UserModel.js";
import utility from "../utils/utility.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hasPassword = await utility.hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hasPassword,
      role,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = req.user;
    const token = await utility.generateToken(user);
    return res.status(200).json({
      message: "Login successful",
      token: token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
export default { registerUser, loginUser };
