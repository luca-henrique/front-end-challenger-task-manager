import {
  CONTENT_MAX_LENGTH,
  CONTENT_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
} from "@/common/validations";
import z from "zod";

export const TaskSchema = z
  .object({
    title: z
      .string({ required_error: "CPF/CNPJ é obrigatório." })
      .min(
        TITLE_MIN_LENGTH,
        `O titulo deve ter no mínimo ${TITLE_MIN_LENGTH} caracteres.`
      )
      .max(
        TITLE_MAX_LENGTH,
        `A titulo deve ter no máximo ${TITLE_MAX_LENGTH} caracteres.`
      ),
    content: z
      .string()
      .min(
        CONTENT_MIN_LENGTH,
        `A conteudo deve ter no mínimo ${CONTENT_MIN_LENGTH} caracteres.`
      )
      .max(
        CONTENT_MAX_LENGTH,
        `A conteudo deve ter no máximo ${CONTENT_MAX_LENGTH} caracteres.`
      ),
  })
  .required();

export type TaskSchemaType = z.infer<typeof TaskSchema>;
