import pkg from "jsonwebtoken";
const { sign } = pkg;
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import Event from "../models/EventModel.js";

const generateToken = async (user) => {
  const payload = { userId: user._id, email: user.email };
  const secretKey = process.env.JWT_SECRET;
  const option = { expiresIn: process.env.EXPIRE_TIME };
  try {
    return sign(payload, secretKey, option);
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateEventId = async () => {
  const count = await Event.countDocuments();
  return `EVT-${String(count + 1).padStart(4, "0")}`;
};

const generateBookingId = async () => {
  const count = await Event.countDocuments();
  return `BK-${String(count + 1).padStart(4, "0")}`;
};

export default {
  generateToken,
  hashPassword,
  comparePassword,
  generateEventId,
  generateBookingId,
};
