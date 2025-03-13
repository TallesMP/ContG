import express from "express";
import { authenticateToken } from "../middlewares/AuthMiddleware";
import { UserController } from "../controller/UserController";
import { handleValidationErrors } from "../middlewares/HandleValidationErros";
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

router.post(
  "/login",
  validationLoginUser,
  handleValidationErrors,
  UserController.loginUser
);

router.delete("/", authenticateToken, UserController.removeUser);

router.post(
  "/password",
  validationRequestPasswordReset,
  handleValidationErrors,
  UserController.requestPasswordReset
);

router.put(
  "/password",
  validationPasswordReset,
  handleValidationErrors,
  authenticateToken,
  UserController.resetPassword
);

export default router;
