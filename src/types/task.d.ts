export interface Task {
  id: number;
  user_id: number;
  title: string;
  content: string;
  date: Date;
}

export type BasicTask = Pick<Task, "title" | "content">;

export interface ApiResponse {
  data: Task;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface Store {
  tasks: Task[];
  selecteTask: Task;
  loading: boolean;
}
