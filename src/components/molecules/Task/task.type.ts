import { Task } from "@/types/task";

export type TaskProps = Omit<Task, "user_id">;

export interface CardTaskProps extends TaskProps {
  deleteTask: (id: number) => void;
  selectTask: (id: number) => void;
}
