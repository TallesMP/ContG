import { NextFunction } from "express";
import { body } from "express-validator";

const nameValidation = (field = "name") => [
  body(field)
    .trim()
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isLength({ min: 3, max: 100 })
    .withMessage("O nome deve ter entre 3 e 100 caracteres")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("O nome deve conter apenas letras"),
];

const emailValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email é obrigatório")
    .isEmail()
    .withMessage("Formato de email inválido"),
];

const passwordValidation = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("A senha é obrigatória")
    .isLength({ min: 8 })
    .withMessage("A senha deve ter no mínimo 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[a-z]/)
    .withMessage("A senha deve conter pelo menos uma letra minúscula")
    .matches(/[0-9]/)
    .withMessage("A senha deve conter pelo menos um número")
    .matches(/[\W]/)
    .withMessage("A senha deve conter pelo menos um caractere especial"),
];

const integersValidation = (field: string) => [
  body(field)
    .trim()
    .notEmpty()
    .withMessage("Apenas números são permitidos")
    .toInt(),
];

const floatingValidation = (field: string) => [
  body(field)
    .trim()
    .notEmpty()
    .withMessage("Apenas números são permitidos")
    .toFloat(),
];

export const validationCreateUser = [
  ...nameValidation(),
  ...emailValidation,
  ...passwordValidation,
];

export const validationLoginUser = [...emailValidation, ...passwordValidation];

export const validationRequestPasswordReset = [...emailValidation];

export const validationPasswordReset = [...passwordValidation];

export const validationVerifyEmail = [...emailValidation];

export const validationGetCategory = [...integersValidation("category_id")];

export const validationCreateOrRemoveCategory = [...nameValidation()];

export const validationEditCategory = [
  ...nameValidation(),
  ...nameValidation("newName"),
];

export const validationCreateExpense = [
  ...integersValidation("category_id"),
  ...nameValidation(),
  ...floatingValidation("amount"),
];

export const validationRemoveExpense = [
  ...integersValidation("category_id"),
  ...nameValidation(),
];

export const validationEditExpense = [
  ...nameValidation(),
  ...nameValidation("newName"),
  ...floatingValidation("amount"),
  ...integersValidation("category_id"),
];
