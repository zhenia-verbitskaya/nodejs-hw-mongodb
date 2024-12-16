import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestResetPasswordController,
  resetPasswordController,
} from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  registerSchema,
  loginSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
} from "../validation/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, validateBody(registerSchema), ctrlWrapper(registerController));

router.post("/login", jsonParser, validateBody(loginSchema), ctrlWrapper(loginController));

router.post("/logout", ctrlWrapper(logoutController));

router.post("/refresh", ctrlWrapper(refreshController));

router.post(
  "/send-reset-email",
  jsonParser,
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(requestResetPasswordController),
);

router.post(
  "/reset-pwd",
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
