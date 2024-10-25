export interface SignInCredentials {
  email: string;
  password: string;
}

export interface ApiResponse {
  data: { token: string };
}

export interface User {
  data: Date;
  email: string;
  id: number;
  password: string;
}

export interface Store {
  user?: User;
}

export type SignInCredentials = Pick<User, "email" | "password">;
