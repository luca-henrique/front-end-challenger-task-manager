import api from "@/libs/http-client"; // Mock do Axios
import { Task } from "@/types/task";

import { taskService } from "./task";

// Mock para o módulo api (axios)
jest.mock("../libs/http-client");

describe("taskService", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa mocks entre os testes
  });

  test("readTasks deve retornar uma lista de tarefas", async () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: "Tarefa 1",
        content: "Conteúdo 1",
        user_id: 0,
        date: new Date(),
      },
    ];
    (api.get as jest.Mock).mockResolvedValue({ data: { data: mockTasks } });

    const tasks = await taskService.readTasks();
    expect(tasks).toEqual(mockTasks);
    expect(api.get).toHaveBeenCalledWith("/task");
  });

  test("deleteTask deve chamar a API com o ID correto", async () => {
    (api.delete as jest.Mock).mockResolvedValue({});

    await taskService.deleteTask(1);
    expect(api.delete).toHaveBeenCalledWith("/task/1");
  });

  test("updateTask deve retornar a tarefa atualizada", async () => {
    const updatedTask: Task = {
      id: 1,
      title: "Tarefa Atualizada",
      content: "Conteúdo Atualizado",
      user_id: 0,
      date: new Date(),
    };
    (api.put as jest.Mock).mockResolvedValue({ data: { data: updatedTask } });

    const result = await taskService.updateTask(1, {
      title: "Tarefa Atualizada",
      content: "Conteúdo Atualizado",
    });
    expect(result).toEqual(updatedTask);
    expect(api.put).toHaveBeenCalledWith("/task/1", {
      title: "Tarefa Atualizada",
      content: "Conteúdo Atualizado",
    });
  });

  test("createTask deve retornar a nova tarefa criada", async () => {
    const newTask: Task = {
      id: 2,
      title: "Nova Tarefa",
      content: "Novo Conteúdo",
      user_id: 0,
      date: new Date(),
    };
    (api.post as jest.Mock).mockResolvedValue({ data: { data: newTask } });

    const result = await taskService.createTask({
      title: "Nova Tarefa",
      content: "Novo Conteúdo",
    });
    expect(result).toEqual(newTask);
    expect(api.post).toHaveBeenCalledWith("/task", {
      title: "Nova Tarefa",
      content: "Novo Conteúdo",
    });
  });

  test("selectTask deve retornar a tarefa pelo ID", async () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: "Tarefa 1",
        content: "Conteúdo 1",
        date: new Date(),
        user_id: 1,
      },
      {
        id: 2,
        title: "Tarefa 2",
        content: "Conteúdo 2",
        date: new Date(),
        user_id: 1,
      },
    ];
    (api.get as jest.Mock).mockResolvedValue({ data: { data: tasks } });

    const task = await taskService.selectTask(2);
    expect(task).toEqual(tasks[1]);
    expect(api.get).toHaveBeenCalledWith("/task");
  });
});
