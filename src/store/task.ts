import { BasicTask, Store } from "@/types/task";
import { proxy, useSnapshot } from "valtio";
import { taskService } from "@/services/task";

const store = proxy<Store>({
  tasks: [],
  selecteTask: {
    id: 0,
    user_id: 0,
    title: "",
    content: "",
    date: new Date(),
  },
  loading: false,
});

const actions = {
  createTask: async (task: BasicTask) => {
    const data = await taskService.createTask(task);
    store.tasks = [...store.tasks, data];
  },
  readTasks: async () => {
    const data = await taskService.readTasks();
    store.tasks = data;
  },
  deleteTask: async (id: number) => {
    await taskService.deleteTask(id);
    const updatedTasks = store.tasks.filter((task) => task.id !== id);
    store.tasks = updatedTasks;
  },
  updateTask: async (selectedTask: BasicTask) => {
    const { id } = store.selecteTask;
    await taskService.updateTask(id, selectedTask);
    const updatedTasks = store.tasks.map((task) =>
      task.id === id ? { ...task, ...selectedTask } : task
    );
    store.tasks = updatedTasks;
  },

  selectTask: async (id: number) => {
    store.selecteTask = store.tasks.filter((task) => task.id === id)[0];
  },
};

export function useTask() {
  const snapshot = useSnapshot(store);
  return { snapshot, actions };
}
