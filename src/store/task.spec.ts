import { renderHook, act } from "@testing-library/react-hooks";
import { useTask } from "./task";
import { taskService } from "@/services/task";

jest.mock("../services/task", () => ({
  taskService: {
    createTask: jest.fn(),
    readTasks: jest.fn(),
    deleteTask: jest.fn(),
    updateTask: jest.fn(),
  },
}));

describe("useTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar uma nova tarefa", async () => {
    const newTask = {
      id: 1,
      user_id: 1,
      title: "Nova Tarefa",
      content: "Conteúdo da nova tarefa",
      date: new Date(),
    };

    (taskService.createTask as jest.Mock).mockResolvedValueOnce(newTask);

    const { result } = renderHook(() => useTask());

    await act(async () => {
      await result.current.actions.createTask(newTask);
    });

    expect(result.current.snapshot.tasks).toContainEqual(newTask);
    expect(taskService.createTask).toHaveBeenCalledWith(newTask);
  });

  it("deve ler as tarefas existentes", async () => {
    const tasks = [
      {
        id: 1,
        user_id: 1,
        title: "Tarefa 1",
        content: "Conteúdo 1",
        date: new Date(),
      },
      {
        id: 2,
        user_id: 1,
        title: "Tarefa 2",
        content: "Conteúdo 2",
        date: new Date(),
      },
    ];

    (taskService.readTasks as jest.Mock).mockResolvedValueOnce(tasks);

    const { result } = renderHook(() => useTask());

    await act(async () => {
      await result.current.actions.readTasks();
    });

    expect(result.current.snapshot.tasks).toEqual(tasks);
    expect(taskService.readTasks).toHaveBeenCalled();
  });

  it("deve excluir uma tarefa", async () => {
    const taskToDelete = {
      id: 1,
      user_id: 1,
      title: "Tarefa 1",
      content: "Conteúdo 1",
      date: new Date(),
    };

    const { result } = renderHook(() => useTask());
    await act(async () => {
      await result.current.actions.createTask(taskToDelete);
    });

    (taskService.deleteTask as jest.Mock).mockResolvedValueOnce({});

    await act(async () => {
      await result.current.actions.deleteTask(taskToDelete.id);
    });

    expect(result.current.snapshot.tasks).not.toContainEqual(taskToDelete);
    expect(taskService.deleteTask).toHaveBeenCalledWith(taskToDelete.id);
  });

  it("deve atualizar uma tarefa", async () => {
    const existingTask = {
      id: 1,
      user_id: 1,
      title: "Tarefa 1",
      content: "Conteúdo 1",
      date: new Date(),
    };
    const updatedTaskData = {
      title: "Tarefa Atualizada",
      content: "Conteúdo Atualizado",
    };

    // Adiciona a tarefa ao estado antes da atualização
    const { result } = renderHook(() => useTask());
    await act(async () => {
      await result.current.actions.createTask(existingTask);
    });

    (taskService.updateTask as jest.Mock).mockResolvedValueOnce({
      ...existingTask,
      ...updatedTaskData,
    });

    await act(async () => {
      await result.current.actions.updateTask(updatedTaskData);
    });

    expect(result.current.snapshot.tasks[0]).toEqual({
      ...existingTask,
      ...updatedTaskData,
    });
    expect(taskService.updateTask).toHaveBeenCalledWith(
      existingTask.id,
      updatedTaskData
    );
  });

  it("deve selecionar uma tarefa", async () => {
    const taskToSelect = {
      id: 1,
      user_id: 1,
      title: "Tarefa 1",
      content: "Conteúdo 1",
      date: new Date(),
    };

    const { result } = renderHook(() => useTask());
    await act(async () => {
      await result.current.actions.createTask(taskToSelect);
    });

    await act(async () => {
      await result.current.actions.selectTask(taskToSelect.id);
    });

    expect(result.current.snapshot.selecteTask).toEqual(taskToSelect);
  });
});
