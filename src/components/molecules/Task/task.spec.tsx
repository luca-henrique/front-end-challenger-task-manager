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

    // Verifica se o título foi renderizado
    expect(screen.getByText("Tarefa de Teste")).toBeInTheDocument();

    // Verifica se o conteúdo foi renderizado
    expect(screen.getByText("Conteúdo da tarefa")).toBeInTheDocument();

    // Verifica se a data foi renderizada corretamente
    expect(screen.getByText("26/10/2024")).toBeInTheDocument(); // ou o formato de data esperado
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

    // Verifica se o botão Delete está presente
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();

    // Verifica se o botão Select está presente
    expect(screen.getByRole("button", { name: /select/i })).toBeInTheDocument();
  });
});