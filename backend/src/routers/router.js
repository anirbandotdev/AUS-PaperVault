import { Router } from "express";
import fileRouter from "./fileRouter.js";
import adminRouter from "./adminRouter.js";
import userRouter from "./userRouter.js";
import healthRouter from "./healthRouter.js";
import feedbackRouter from "./feedbackRouter.js";

const router = Router();

router.use("/files", fileRouter);
router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/health", healthRouter);
router.use("/feedback" , feedbackRouter)

export default router;
