import { proxy, useSnapshot } from "valtio";

import { signInRequestService, signOut } from "@/services/auth";
import { SignInCredentials, Store } from "@/types/auth";

const store = proxy<Store>({});

const actions = {
  signInRequest: async (credentials: SignInCredentials) => {
    try {
      await signInRequestService(credentials);
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
    signOut();
  },
};

export function useAuth() {
  const snapshot = useSnapshot(store);
  return { snapshot, actions };
}
