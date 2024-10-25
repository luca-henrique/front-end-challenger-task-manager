import { Task } from "@/types/task";
import { proxy, useSnapshot } from "valtio";
import nookies from "nookies";

import api from "@/libs/http-client";
import { AxiosResponse } from "axios";

interface ApiResponse {
  data: { token: string; user: User };
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

interface User {
  data: Date;
  email: string;
  id: number;
  password: string;
}

interface Store {
  user?: User;
}

type SignInCredentials = Pick<User, "email" | "password">;

const store = proxy<Store>({});

const actions = {
  signInRequest: async (credentials: SignInCredentials) => {
    try {
      const response: AxiosResponse<ApiResponse> = await api.post<ApiResponse>(
        "/sign-in",
        credentials
      );
      nookies.set(null, "token", response.data.data.token, { path: "/" });
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          error.response.data.error ||
            "Erro ao autenticar. Verifique suas credenciais."
        );
      } else if (error.request) {
        throw new Error(
          "Não foi possível conectar ao servidor. Tente novamente mais tarde."
        );
      } else {
        throw new Error("Erro desconhecido. Tente novamente.");
      }
    }
  },
  logout: () => {
    nookies.set(null, "token", "", { path: "/" });
  },
};

export function useAuth() {
  const snapshot = useSnapshot(store);
  return { snapshot, actions };
}
