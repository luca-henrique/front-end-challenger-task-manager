import { render, screen, fireEvent } from "@testing-library/react";
import { SignInFormView } from "./sign-in-form.view";


// Mock de funções de manipulação para passar como props
const mockHandleSubmit = jest.fn();
const mockHandleChangeInputValue = jest.fn();
const mockErrors = { email: { message: "" }, password: { message: "" } };

describe("SignInFormView", () => {
  beforeEach(() => {
    render(
      <SignInFormView
        handleSubmit={mockHandleSubmit}
        errors={mockErrors}
        handleChangeInputValue={mockHandleChangeInputValue}
      />
    );
  });

  it("deve renderizar os elementos corretamente", () => {
    expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  it("deve chamar handleChangeInputValue ao digitar nos campos de entrada", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Senha");

    fireEvent.change(emailInput, { target: { value: "email@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(mockHandleChangeInputValue).toHaveBeenCalledWith("email", "email@test.com");
    expect(mockHandleChangeInputValue).toHaveBeenCalledWith("password", "password123");
  });

  it("deve chamar handleSubmit ao enviar o formulário", () => {
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("deve exibir mensagens de erro quando fornecidas", () => {
    render(
      <SignInFormView
        handleSubmit={mockHandleSubmit}
        errors={{ email: { message: "Email é obrigatório" }, password: { message: "Senha é obrigatória" } }}
        handleChangeInputValue={mockHandleChangeInputValue}
      />
    );

    expect(screen.getByText("Email é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Senha é obrigatória")).toBeInTheDocument();
  });
});