import { request } from "./api";

export function getMuses() {
  return request("/muse");
}
