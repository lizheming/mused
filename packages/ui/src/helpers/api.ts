import axios from "axios";

type ResponseObject<T> = {
  data: T;
  errno?: string;
  message?: string;
};

export function getUser() {
  return axios.get<ResponseObject<User>>("/api/token");
}

export function signin(email: string, password: string) {
  return axios.post<ResponseObject<User>>("/api/token", {
    email,
    password,
  });
}

export function signout() {
  return axios.delete("/api/token");
}

export function signup(email: string, password: string) {
  return axios.post<ResponseObject<User>>("/api/user", {
    email,
    password,
    name: email,
  });
}
