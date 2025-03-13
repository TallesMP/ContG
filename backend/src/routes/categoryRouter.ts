import express from "express";
import { authenticateToken } from "../middlewares/AuthMiddleware";
import { CategoryController } from "../controller/CategoryController";
import { handleValidationErrors } from "../middlewares/ErrorMiddleware";
import {
  validationCreateOrRemoveCategory,
  validationEditCategory,
  validationGetCategory,
} from "../middlewares/ValidationsMiddleware";

const router = express.Router();

// private routes
router.get("/all", authenticateToken, CategoryController.getCategories);

router.get(
  "/",
  validationGetCategory,
  handleValidationErrors,
  authenticateToken,
  CategoryController.getCategory
);

router.post(
  "/",
  validationCreateOrRemoveCategory,
  handleValidationErrors,
  authenticateToken,
  CategoryController.createCategory
);

router.put(
  "/",
  validationEditCategory,
  handleValidationErrors,
  authenticateToken,
  CategoryController.editCategory
);

router.delete(
  "/",
  validationCreateOrRemoveCategory,
  handleValidationErrors,
  authenticateToken,
  CategoryController.removeCategory
);

export default router;
