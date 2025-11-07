import pkg from "jsonwebtoken";
const { sign } = pkg;
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const generateToken = async (user) => {
  const payload = { userId: user._id, email: user.email };
  const secretKey = process.env.JWT_SECRET;
  // const option = { expireIn: process.env.EXPIRE_TIME };
  try {
    return sign(payload, secretKey);
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

export default { generateToken, hashPassword, comparePassword };
