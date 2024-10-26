import { z } from "zod";

const PASSWORD_MIN_LENGTH = 4;
const PASSWORD_MAX_LENGTH = 16;

export const SignInScreenSchema = z
  .object({
    email: z.string({ required_error: "Email é obrigatório." }),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `A senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`
      )
      .max(
        PASSWORD_MAX_LENGTH,
        `A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres.`
      ),
  })
  .required();
