'use client'

import { useTaskForm } from "./task-form.model";
import { TaskFormView } from "./task-form.view";

export const EditTaskForm = () => {
  const props = useTaskForm()

  return (
    <TaskFormView  {...props} />
  );
};