import { renderHook, act } from "@testing-library/react-hooks";
import { useSignInModel } from "./sign-in-form.model"; // Caminho do seu hook
import { useAuth } from "@/store/auth"; // Importar o contexto do Auth
import { toast } from "react-hot-toast";

jest.mock("../../../store/auth", () => ({
  useAuth: () => ({
    actions: {
      signInRequest: jest.fn(), // Mock da função de signIn
    },
  }),
}));

jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("useSignInModel", () => {
  it("deve chamar signInRequest e redirecionar para o dashboard", async () => {
    const { result } = renderHook(() => useSignInModel());

    const values = {
      email: "test@example.com",
      password: "password123",
    };

    act(() => {
      result.current.handleChangeInputValue("email", values.email);
      result.current.handleChangeInputValue("password", values.password);
    });

    expect(result.current.errors).toEqual({}); // Deve estar sem erros

    const signInRequestMock = jest.fn().mockResolvedValueOnce({});
    (useAuth().actions.signInRequest as jest.Mock) = signInRequestMock;

    await act(async () => {
      await result.current.handleSubmit(values);
    });

    expect(signInRequestMock).toHaveBeenCalledWith(values);
    expect(toast.success).toHaveBeenCalledWith("You did it!");
  });

  it("deve chamar toast.error quando ocorrer um erro de autenticação", async () => {
    const { result } = renderHook(() => useSignInModel());

    const errorMessage = "Erro ao tentar autenticar.";
    const signInRequestMock = jest
      .fn()
      .mockRejectedValueOnce(new Error(errorMessage));
    (useAuth().actions.signInRequest as jest.Mock) = signInRequestMock;

    const values = {
      email: "test@example.com",
      password: "password123",
    };

    await act(async () => {
      await result.current.handleSubmit(values);
    });

    // Verificar se toast.error foi chamado
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
