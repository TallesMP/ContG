import express, { Request, Response } from "express";
import { UserService } from "./services/UserService";
import dotenv from "dotenv"
import { authenticateToken } from "./middlewares/AuthMiddleware"
dotenv.config();

const app = express();
app.use(express.json());

// Public routes
app.post("/login", UserService.loginUser);

app.post("/user", UserService.createUser);

// Private routes
app.put("/user", async (req: Request, res: Response) => { });
app.delete("/user", authenticateToken, UserService.removeUser);

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
