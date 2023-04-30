import { request } from "./api";

export function getUserInfo() {
  return request("/token");
}

export interface LoginParams {
  email: string;
  password: string;
}
export function login({ email, password }: LoginParams) {
  return request("/token", { method: "POST", data: { email, password } });
}

export async function logout() {
  window.TOKEN = null;
  sessionStorage.removeItem("TOKEN");
  localStorage.removeItem("TOKEN");
}
