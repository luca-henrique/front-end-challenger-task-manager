import axios from "axios";
import nookies from "nookies";
import { removeCookie } from "@/libs/cookies";
import axiosInstance from "./http-client";

jest.mock("nookies");
jest.mock("./cookies");

describe("Axios Instance", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve adicionar o token ao header Authorization quando existir no cookie", async () => {
    nookies.get.mockReturnValue({ token: "testToken" });

    await axiosInstance.get("/test-endpoint");

    expect(nookies.get).toHaveBeenCalled();
    expect(axiosInstance.defaults.headers.common["Authorization"]).toBe(
      "testToken"
    );
  });

  it("não deve adicionar o token se não houver um token nos cookies", async () => {
    nookies.get.mockReturnValue({});

    await axiosInstance.get("/test-endpoint");

    expect(nookies.get).toHaveBeenCalled();
    expect(
      axiosInstance.defaults.headers.common["Authorization"]
    ).toBeUndefined();
  });

  it("deve chamar removeCookie se a resposta retornar um status 401", async () => {
    // Mocka uma resposta de erro 401
    axios.get = jest.fn().mockRejectedValue({
      response: { status: 401 },
    });

    try {
      await axiosInstance.get("/test-endpoint");
    } catch (error) {
      // Confirma que removeCookie foi chamado ao receber 401
      expect(removeCookie).toHaveBeenCalledWith("token");
    }
  });
});
