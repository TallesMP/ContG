import express from "express";
import { UserController } from "../controller/UserController";
import { authenticateToken } from "../middlewares/AuthMiddleware";
import { handleValidationErrors } from "../middlewares/ErrorMiddleware";
import {
  validationCreateUser,
  validationLoginUser,
  validationPasswordReset,
  validationRequestPasswordReset,
} from "../middlewares/ValidationsMiddleware";

const router = express.Router();

router.post(
  "/",
  validationCreateUser,
  handleValidationErrors,
  UserController.createUser
);

router.post("/login", validationLoginUser, UserController.loginUser);

router.post(
  "/password",
  validationRequestPasswordReset,
  handleValidationErrors,
  UserController.requestPasswordReset
);

router.delete("/", authenticateToken, UserController.removeUser);

router.put(
  "/password",
  validationPasswordReset,
  handleValidationErrors,
  authenticateToken,
  UserController.resetPassword
);

export default router;
