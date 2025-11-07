import User from "../models/UserModel.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
import dotenv from "dotenv";
dotenv.config();

const authentication = async (req, res, next) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    const tokens = req.headers.authorization;

    const token = tokens.split(" ");
    if (!token[0] || token[0] !== "Bearer") {
      return res.status(401).json({ message: "Unauthorized access" });
    } else {
      if (!token[1]) {
        return res.status(401).json({ message: "Token missing." });
      } else {
        const decoded = verify(token[1], jwtSecret);
        if (!decoded) {
          return res.status(401).json({ message: "Invalid Token." });
        } else {
          const user = await User.findById(decoded.userId);
          if (!user) {
            return res.status(401).json({ message: "User not found." });
          } else {
            req.user = user;
            next();
          }
        }
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access..." });
  }
};
export default authentication;
