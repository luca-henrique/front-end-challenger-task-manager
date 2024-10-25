import { useTaskForm } from "./task-form.model";
import { TaskFormView } from "./task-form.view";

export const TaskForm = () => {
  const props = useTaskForm()

  return (
    <TaskFormView  {...props} />
  );
};