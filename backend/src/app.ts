import express from "express";
import { UserController } from "./controller/UserController";
import dotenv from "dotenv";
import { authenticateToken } from "./middlewares/AuthMiddleware";
import { EmailController } from "./controller/EmailController";
dotenv.config();

const app = express();
app.use(express.json());

// Public routes
app.post("/login", UserController.loginUser);
app.post("/user", UserController.createUser);
app.post("/email", EmailController.verifyEmail)

// Private routes
app.put("/user", authenticateToken, UserController.editUser);
app.delete("/user", authenticateToken, UserController.removeUser);

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
