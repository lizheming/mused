import { request } from "./api";

export interface User {
  email: string;
  display_name: string;
  type: "adminstrator" | "guest";
  url: string;
  id: string;
  open_id?: string;
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

export interface UpdateUserInfoParams {
  type?: "open_id";
}

export async function updateUserInfo({
  type,
  ...data
}: UpdateUserInfoParams & Partial<RegisterUserParams>): Promise<Partial<User>> {
  let url = "/user";
  if (type) {
    url += `?type=${type}`;
  }

  return request(url, { method: "PUT", data });
}

export type RegisterUserParams = Pick<
  User,
  "email" | "display_name" | "url"
> & { password: string };

export async function registerUser(data: RegisterUserParams): Promise<void> {
  return request("/user", { method: "POST", data });
}
