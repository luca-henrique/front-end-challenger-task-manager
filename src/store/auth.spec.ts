import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "./auth";
import { signInRequestService, signOut } from "@/services/auth";

jest.mock("../services/auth", () => ({
  signInRequestService: jest.fn(),
  signOut: jest.fn(),
}));

describe("useAuth", () => {
  it("deve autenticar o usuário com sucesso", async () => {
    const credenciais = { email: "test@example.com", password: "password123" };

    (signInRequestService as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.actions.signInRequest(credenciais);
    });

    expect(signInRequestService).toHaveBeenCalledWith(credenciais);
  });

  it("deve lançar um erro quando a autenticação falhar", async () => {
    const credenciais = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    (signInRequestService as jest.Mock).mockRejectedValueOnce({
      response: {
        data: {
          error: "Credenciais inválidas.",
        },
      },
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await expect(
        result.current.actions.signInRequest(credenciais)
      ).rejects.toThrow("Credenciais inválidas.");
    });

    expect(signInRequestService).toHaveBeenCalledWith(credenciais);
  });

  it("deve chamar signOut ao fazer logout", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.actions.logout();
    });

    expect(signOut).toHaveBeenCalled();
  });
});
