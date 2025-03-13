import express from "express";
import userRouter from "./UserRouter";
import emailRouter from "./EmailRouter";
import categoryRouter from "./CategoryRouter";
import expenseRouter from "./ExpenseRouter";
const router = express.Router();

router.use("/user", userRouter);
router.use("/email", emailRouter);
router.use("/category", categoryRouter);
router.use("/expense", expenseRouter);

export default router;
