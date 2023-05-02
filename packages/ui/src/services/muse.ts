import { request } from "./api";

export interface GetMusesRequest {
  page: number;
  pageSize: number;
}
export interface Muse {
  id: string;
  content: string;
  sticky: boolean;
  status: number;
  origin: string;
  time: number;
}
export interface GetMusesResponse {
  page: number;
  totalPages: number;
  pageSize: number;
  data: Muse[];
}

export function getMuses({
  page,
  pageSize,
}: GetMusesRequest): Promise<GetMusesResponse> {
  return request("/muse", { method: "GET", data: { page, pageSize } });
}

export function postMuse({
  content,
  sticky,
  status,
  origin,
}: Pick<Muse, "content" | "sticky" | "status" | "origin">): Promise<Muse> {
  return request("/muse", {
    method: "POST",
    data: { content, sticky, status, origin },
  });
}
