import express from "express";
import { authenticateToken } from "../middlewares/AuthMiddleware";
import { ExpenseController } from "../controller/ExpenseController";
import { handleValidationErrors } from "../middlewares/HandleValidationErros";
import {
  validationCreateExpense,
  validationEditExpense,
  validationRemoveExpense,
} from "../middlewares/ValidationsMiddleware";

const router = express.Router();

router.post(
  "/",
  validationCreateExpense,
  handleValidationErrors,
  authenticateToken,
  ExpenseController.createExpense
);

router.delete(
  "/",
  validationRemoveExpense,
  handleValidationErrors,
  authenticateToken,
  ExpenseController.removeExpense
);

router.put(
  "/",
  validationEditExpense,
  handleValidationErrors,
  authenticateToken,
  ExpenseController.editExpense
);

export default router;
