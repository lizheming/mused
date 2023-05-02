import { request } from "./api";

export interface User {
  email: string;
  display_name: string;
  type: "adminstrator" | "guest";
  url: string;
  id: string;
}

export function getUserInfo(): Promise<User> {
  return request("/token");
}

export interface LoginParams {
  email: string;
  password: string;
}
export function login({
  email,
  password,
}: LoginParams): Promise<User & { token: string }> {
  return request("/token", { method: "POST", data: { email, password } });
}

export async function logout() {
  window.TOKEN = undefined;
  sessionStorage.removeItem("TOKEN");
  localStorage.removeItem("TOKEN");
}
