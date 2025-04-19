import express from "express";
import dotenv from "dotenv";
import "./db/scheduler";
import router from "./routers/Router";
import { CategoryController } from "./controller/CategoryController";
import { ExpenseController } from "./controller/ExpenseController";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("", router);

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
