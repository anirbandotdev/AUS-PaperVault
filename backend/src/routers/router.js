import { Router } from "express";
import fileRouter from "./fileRouter";

const router = Router();

router.use("/files", fileRouter);

export default router;
