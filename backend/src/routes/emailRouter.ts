import express from "express";
import { EmailController } from "../controller/EmailController";
import { validationVerifyEmail } from "../middlewares/ValidationsMiddleware";
import { handleValidationErrors } from "../middlewares/ErrorMiddleware";

const router = express.Router();

router.post(
  "/",
  validationVerifyEmail,
  handleValidationErrors,
  EmailController.verifyEmail
);

export default router;
