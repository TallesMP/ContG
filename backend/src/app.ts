import express from "express";
import { UserController } from "./controller/UserController";
import dotenv from "dotenv";
import { authenticateToken } from "./middlewares/AuthMiddleware";
import { EmailController } from "./controller/EmailController";
import "./db/scheduler";
import { CategoryController } from "./controller/CategoryController";
import { ExpenseController } from "./controller/ExpenseController";

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
app.post("/category", authenticateToken, CategoryController.createCategory);
app.delete("/category", authenticateToken, CategoryController.removeCategory);

app.post("/expenses", authenticateToken, ExpenseController.createExpense);
app.delete("/expenses", authenticateToken, ExpenseController.removeExpense)

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
