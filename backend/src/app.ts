import express from "express";
import userRouter from "./routes/userRouter";
import emailRouter from "./routes/emailRouter";
import categoryRouter from "./routes/categoryRouter";
import expenseRouter from "./routes/expenseRouter";

import dotenv from "dotenv";
import "./db/scheduler";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/email", emailRouter);
app.use("/category", categoryRouter);
app.use("/expense", expenseRouter);

const PORT = process.env.PORT || 48003;
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
