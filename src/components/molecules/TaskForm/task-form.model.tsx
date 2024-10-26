import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { FieldTypeTaskFormSchema, TaskFormSchemaType } from "./task-form.type";
import { TaskSchema, TaskSchemaType } from "./task-form.schema";
import { useTask } from "@/store/task";

export const useTaskForm = () => {
  const {
    actions: { createTask },
  } = useTask();

  const {
    setValue,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<TaskFormSchemaType>({
    resolver: zodResolver(TaskSchema),
    mode: "all",
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const handleChangeInputValue = (
    fieldName: FieldTypeTaskFormSchema,
    value: string
  ) => {
    setValue(fieldName, value);
    clearErrors(fieldName);
  };



  function handleEvent(value: TaskSchemaType) {
    createTask(value);
  }

  return {
    handleSubmit: handleSubmit(handleEvent),
    handleChangeInputValue,
    watch,
    errors,
  };
};
