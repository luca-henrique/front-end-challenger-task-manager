import nookies from "nookies";
import { addCookie, removeCookie } from "./cookies";

jest.mock("nookies");

describe("Cookie Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("addCookie deve chamar nookies.set com os parâmetros corretos", () => {
    addCookie("testeField", "testeValue");

    expect(nookies.set).toHaveBeenCalledWith(null, "testeField", "testeValue", {
      path: "/",
    });
  });

  test("removeCookie deve chamar nookies.destroy com os parâmetros corretos", () => {
    removeCookie("testeField");

    expect(nookies.destroy).toHaveBeenCalledWith(null, "testeField", {
      path: "/",
    });
  });
});
