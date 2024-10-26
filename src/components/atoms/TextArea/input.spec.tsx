import { render } from "@testing-library/react"
import { TextAreaInput } from "./text-area"

describe('it render', () => {
  render(<TextAreaInput label={""} />)

  test("deve exibir uma mensagem de erro quando 'error' é passado", () => {
    const { getByText, debug } = render(<TextAreaInput label="Nome" error="Campo obrigatório" />);

    debug()

    expect(getByText(/Campo obrigatório/)).toBeInTheDocument();
    expect(getByText(/Campo obrigatório/)).toHaveStyle("color: red");
  });

})