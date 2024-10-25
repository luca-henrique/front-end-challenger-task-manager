import { Task } from "@/types/task";
import { AxiosResponse } from "axios";
import { proxy, useSnapshot } from "valtio";

import api from "@/libs/http-client";

type TaskTitleContent = Pick<Task, "title" | "content">;

interface ApiResponse {
  data: Task;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

interface Store {
  tasks: Task[];
  selecteTask: Task;
}

const store = proxy<Store>({
  tasks: [],
  selecteTask: {
    id: 0,
    user_id: 0,
    title: "",
    content: "",
    date: new Date(),
  },
});

const actions = {
  readTasks: async () => {
    const { data } = await api.get<Task[]>("/task");
    store.tasks = data.data;
  },
  deleteTask: async (id: number) => {
    await api.delete(`/task/${id}`);
    const updatedTasks = store.tasks.filter((task) => task.id !== id);
    store.tasks = updatedTasks;
  },
  updateTask: async (selectedTask: TaskTitleContent) => {
    const { id } = store.selecteTask;
    await api.put(`/task/${id}`, selectedTask);
    const updatedTasks = store.tasks.map((task) =>
      task.id === id ? { ...task, ...selectedTask } : task
    );
    store.tasks = updatedTasks;
  },
  createTask: async (task: TaskTitleContent) => {
    const response: AxiosResponse<ApiResponse> = await api.post<ApiResponse>(
      "/task",
      {
        ...task,
        userId: 2,
      }
    );
    const newTask: Task = response.data.data;
    store.tasks = [...store.tasks, newTask];
  },

  selectTask: async (id: number) => {
    store.selecteTask = store.tasks.filter((task) => task.id === id)[0];
  },
};

export function useTask() {
  const snapshot = useSnapshot(store);
  return { snapshot, actions };
}
