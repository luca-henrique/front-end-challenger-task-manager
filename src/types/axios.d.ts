export interface User {
  data: Date;
  email: string;
  id: number;
  password: string;
}

interface ApiResponse {
  user: User;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
