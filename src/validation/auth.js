import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).required(),
  password: Joi.string().min(3).max(20).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().min(3).required(),
  password: Joi.string().min(3).max(20).required(),
});

export const requestResetPasswordSchema = Joi.object({
  email: Joi.string().email().min(3).required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(3).max(20).required(),
  token: Joi.string().required(),
});
