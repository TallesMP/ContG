import express, { Request, Response } from "express";
import { UserController } from "./controller/userController";
import { UserService } from "./services/UserService";
import dotenv from "dotenv";
import { authenticateToken } from "./middlewares/AuthMiddleware";
dotenv.config();

const app = express();
app.use(express.json());

// Public routes
app.post("/login", UserController.loginUser);
app.post("/user", UserController.createUser);

// Private routes
app.put("/user", authenticateToken, UserController.editUser);
app.delete("/user", authenticateToken, UserController.removerUser);

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
