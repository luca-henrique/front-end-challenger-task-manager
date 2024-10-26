import { render } from "@testing-library/react"
import { Input } from "./input"

describe('it render', () => {
  render(<Input label={""} />)

  test("deve exibir uma mensagem de erro quando 'error' é passado", () => {
    const { getByText, debug } = render(<Input label="Nome" error="Campo obrigatório" />);

    debug()

    expect(getByText(/Campo obrigatório/)).toBeInTheDocument();
    expect(getByText(/Campo obrigatório/)).toHaveStyle("color: red");
  });

})