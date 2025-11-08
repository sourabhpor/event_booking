import authentication from "./authMiddleware.js";
import userMiddleware from "./userMiddleware.js";
import eventMiddleware from "./eventMiddleware.js";
import validate from "./validateMiddleware.js";
import bookingMiddleware from "./bookingMiddleware.js";

export default {
  authentication,
  userMiddleware,
  validate,
  eventMiddleware,
  bookingMiddleware,
};
