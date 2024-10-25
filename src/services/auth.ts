import { addCookie, removeCookie } from "@/libs/cookies";
import api from "@/libs/http-client";
import { ApiResponse, SignInCredentials } from "@/types/auth";

export const signInRequestService = async (
  credentials: SignInCredentials
): Promise<string> => {
  const response = await api.post<ApiResponse>("/sign-in", credentials);
  const token = response.data.data.token;
  addCookie("token", token);
  return token;
};

export const signOut = () => {
  removeCookie("token");
};
