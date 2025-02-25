import express from "express";
import { UserController } from "./controller/UserController";
import dotenv from "dotenv";
import { authenticateToken } from "./middlewares/AuthMiddleware";
import { EmailController } from "./controller/EmailController";
import "./db/scheduler";
import { CategoryController } from "./controller/CategoryController";
import { PasswordController } from "./controller/PasswordController";

dotenv.config();

const app = express();
app.use(express.json());

// Public routes
app.post("/login", UserController.loginUser);
app.post("/user", UserController.createUser);
app.post("/email", EmailController.verifyEmail);
app.post("/forgot_password", PasswordController.sendEmailForgotPassword);

// Private routes
app.put("/user", authenticateToken, UserController.editUser);
app.delete("/user", authenticateToken, UserController.removeUser);
app.put(
  "/forgot_password",
  authenticateToken,
  PasswordController.resetPassword
);
app.post("/category", authenticateToken, CategoryController.createCategory);
app.delete("/category", authenticateToken, CategoryController.removeCategory);

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
