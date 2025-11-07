import express from "express";
import controller from "../controllers/userController.js";
import middleware from "../middlewares/userMiddleware.js";
const router = express.Router();

router.post("/register", middleware.checkEmailExist, controller.registerUser);

router.post("/login", middleware.checkValidEmail, controller.loginUser);

export default router;
