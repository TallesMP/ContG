import express from "express";
import dotenv from "dotenv";
import router from "./routers/Router";
import "./db/scheduler";

dotenv.config();

const app = express();
app.use(express.json());
app.use("", router);

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
