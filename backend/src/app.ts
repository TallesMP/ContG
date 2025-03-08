import express from "express";
import { UserController } from "./controller/UserController";
import dotenv from "dotenv";
import { authenticateToken } from "./middlewares/AuthMiddleware";
import { EmailController } from "./controller/EmailController";
import "./db/scheduler";
import { CategoryController } from "./controller/CategoryController";

dotenv.config();

const app = express();
app.use(express.json());

// Public routes
app.post("/login", UserController.loginUser);
app.post("/user", UserController.createUser);
app.post("/email", EmailController.verifyEmail);
app.post("/password", UserController.requestPasswordReset);

// Private routes
app.delete("/user", authenticateToken, UserController.removeUser);
app.put("/password", authenticateToken, UserController.resetPassword);
app.get("/categories", authenticateToken, CategoryController.getCategories);
app.get("/category", authenticateToken, CategoryController.getCategory);
app.post("/category", authenticateToken, CategoryController.createCategory);
app.delete("/category", authenticateToken, CategoryController.removeCategory);
app.put("/category", authenticateToken, CategoryController.editCategory);

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
