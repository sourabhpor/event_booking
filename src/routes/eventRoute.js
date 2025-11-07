import express from "express";
import controller from "../controllers/eventController.js";
import middleware from "../middlewares/eventMiddleware.js";
import authentication from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post(
  "/events",
  authentication,
  middleware.checkUserId,
  controller.createEvent
);

export default router;
