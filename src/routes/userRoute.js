import { Router } from "express";
import controller from "../controllers/index.js";
import middleware from "../middlewares/index.js";
import validations from "../validation/index.js";
const router = Router();
const { userValidation } = validations;
const { userController } = controller;
const { validate, userMiddleware } = middleware;

router.post(
  "/register",
  validate(userValidation.registerValidation),
  userMiddleware.checkEmailExist,
  userController.registerUser
);

router.post(
  "/login",
  validate(userValidation.loginValidation),
  userMiddleware.checkValidEmail,
  userController.loginUser
);

export default router;
