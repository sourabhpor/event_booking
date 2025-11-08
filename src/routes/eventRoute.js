import { Router } from "express";
import controller from "../controllers/index.js";
import middleware from "../middlewares/index.js";
import validations from "../validation/index.js";
const router = Router();
const { eventMiddleware, authentication, validate } = middleware;
const { eventController } = controller;
const { eventValidation } = validations;

router.post(
  "/events",
  authentication,
  eventMiddleware.checkOrganizer,
  validate(eventValidation.createEventValidation),
  eventController.createEvent
);

router.patch(
  "/events/:id",
  authentication,
  eventMiddleware.checkEventOwner,
  validate(eventValidation.updateEventValidation),
  eventController.updateEvent
);

router.post(
  "/events/:id/publish",
  authentication,
  eventMiddleware.checkEventOwner,
  eventController.publishEvent
);

router.post(
  "/events/:id/cancel",
  authentication,
  eventMiddleware.checkEventOwner,
  eventController.cancelEvent
);

router.get("/events/me", authentication, eventController.getMyEvents);

router.get("/events", eventController.getPublishedEvents);

export default router;
