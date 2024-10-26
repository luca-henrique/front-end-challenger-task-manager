import { ApiResponse, BasicTask, Task } from "@/types/task";
import api from "@/libs/http-client";
import { AxiosResponse } from "axios";

export const taskService = {
  async readTasks(): Promise<Task[]> {
    const response: AxiosResponse<{ data: Task[] }> = await api.get("/task");
    return response.data.data;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/task/${id}`);
  },

  async updateTask(id: number, updatedData: BasicTask): Promise<Task> {
    const response: AxiosResponse<ApiResponse> = await api.put(
      `/task/${id}`,
      updatedData
    );
    return response.data.data;
  },

  async createTask(taskData: BasicTask): Promise<Task> {
    const response: AxiosResponse<ApiResponse> = await api.post(
      "/task",
      taskData
    );
    return response.data.data;
  },

  async selectTask(id: number): Promise<Task | undefined> {
    const response: AxiosResponse<{ data: Task[] }> = await api.get("/task");
    return response.data.data.find((task) => task.id === id);
  },
};
