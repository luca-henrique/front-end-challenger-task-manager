import z from "zod";

const CONTENT_MIN_LENGTH = 4;
export const CONTENT_MAX_LENGTH = 100;

const TITLE_MIN_LENGTH = 4;
const TITLE_MAX_LENGTH = 16;

export const TaskSchema = z
  .object({
    title: z
      .string({ required_error: "CPF/CNPJ é obrigatório." })
      .min(
        TITLE_MIN_LENGTH,
        `A senha deve ter no mínimo ${TITLE_MIN_LENGTH} caracteres.`
      )
      .max(
        TITLE_MAX_LENGTH,
        `A senha deve ter no máximo ${TITLE_MAX_LENGTH} caracteres.`
      ),
    content: z
      .string()
      .min(
        CONTENT_MIN_LENGTH,
        `A senha deve ter no mínimo ${CONTENT_MIN_LENGTH} caracteres.`
      )
      .max(
        CONTENT_MAX_LENGTH,
        `A senha deve ter no máximo ${CONTENT_MAX_LENGTH} caracteres.`
      ),
  })
  .required();

export type TaskSchemaType = z.infer<typeof TaskSchema>;
