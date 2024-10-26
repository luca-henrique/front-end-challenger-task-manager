import { render, screen } from "@testing-library/react";
import { CardTask } from "./task"

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

    const span = screen.getByRole("span");

    expect(span).toBeInTheDocument();

    // Verifica se o botão Delete está presente
    expect(span).toHaveAttribute("id", "select");

    // Verifica se o botão Select está presente
    expect(span).toHaveAttribute("id", "delete");
  });
});