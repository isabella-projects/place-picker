import { Router } from "express";
import * as ErrorController from "../controllers/error.js";

const router = Router();

router.use(ErrorController.getErrorPage);

export default router;
