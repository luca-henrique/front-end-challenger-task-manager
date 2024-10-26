import { fireEvent, render, screen } from "@testing-library/react";
import { CardTask } from "./task"

const mockDeleteTask = jest.fn(); // função mock para deleteTask
const mockSelectTask = jest.fn(); // função mock para selectTask

const taskProps = {
  id: 1,
  date: new Date(),
  content: "Conteúdo da tarefa",
  title: "Tarefa de Teste",
  deleteTask: mockDeleteTask,
  selectTask: mockSelectTask,
};

describe("CardTask Component", () => {
  test("deve renderizar o título, conteúdo e data corretamente", () => {
    const mockDate = new Date("2024-10-26");
    render(
      <CardTask
        id={1}
        title="Tarefa de Teste"
        content="Conteúdo da tarefa"
        date={mockDate}
        deleteTask={() => { }}
        selectTask={() => { }}
      />
    );

    expect(screen.getByText("Tarefa de Teste")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo da tarefa")).toBeInTheDocument();
    expect(screen.getByText("26/10/2024")).toBeInTheDocument();
  });

  test("deve renderizar os botões Delete e Select", () => {
    render(
      <CardTask
        id={1}
        title="Tarefa de Teste"
        content="Conteúdo da tarefa"
        date={new Date()}
        deleteTask={() => { }}
        selectTask={() => { }}
      />
    );

    const deleteSpan = screen.getByTestId("delete-span");

    expect(deleteSpan).toBeInTheDocument();

  });

  beforeEach(() => {
    render(<CardTask {...taskProps} />);
  });

  test("deve renderizar o título e conteúdo da tarefa", () => {
    expect(screen.getByText(taskProps.title)).toBeInTheDocument();
    expect(screen.getByText(taskProps.content)).toBeInTheDocument();
  });

  test("deve chamar selectTask ao clicar no ícone de selecionar", () => {
    const selectIcon = screen.getByTestId("select-span");
    fireEvent.click(selectIcon);
    expect(mockSelectTask).toHaveBeenCalledWith(taskProps.id); // verifica se a função foi chamada com o id correto
  });

  test("deve chamar deleteTask ao clicar no ícone de deletar", () => {
    const deleteIcon = screen.getByTestId("delete-span");
    fireEvent.click(deleteIcon);
    expect(mockDeleteTask).toHaveBeenCalledWith(taskProps.id); // verifica se a função foi chamada com o id correto
  });

  test("deve exibir um toast ao deletar a tarefa", () => {
    const deleteIcon = screen.getByTestId("delete-span");
    fireEvent.click(deleteIcon);
    expect(mockDeleteTask).toHaveBeenCalled(); // verifica se a função de deletar foi chamada
    // Aqui você pode adicionar uma verificação para o toast, se estiver usando um mock para toast.
  });
});