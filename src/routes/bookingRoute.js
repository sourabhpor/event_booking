import { Router } from "express";
import controller from "../controllers/index.js";
import middleware from "../middlewares/index.js";
import validations from "../validation/index.js";
const router = Router();
const { bookingMiddleware, authentication, validate } = middleware;
const { bookingController } = controller;
const { bookingValidation } = validations;

router.post(
  "/bookings/me",
  authentication,
  validate(bookingValidation.bookingValidation),
  bookingMiddleware.checkSeatsAvailability,
  bookingController.createBooking
);

router.get("/bookings/me", authentication, bookingController.getMyBookings);

router.get(
  "/analytics/me",
  authentication,
  bookingController.getOrganizerAnalytics
);

export default router;
