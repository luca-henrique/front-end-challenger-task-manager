import { z } from "zod";
import { TaskSchema } from "./task-form.schema";
import { useTaskForm } from "./task-form.model";

export type TaskFormSchemaType = z.infer<typeof TaskSchema>;
export type FieldTypeTaskFormSchema = keyof TaskFormSchemaType;
export type TaskFormViewProps = ReturnType<typeof useTaskForm>;
