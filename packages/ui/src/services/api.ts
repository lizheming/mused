interface RequestParams {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;

  body?: string;
}

export async function request(url: string, options: RequestParams = {}) {
  url = "/api" + url;
  options.method = options.method || "GET";

  if (options.method === "GET") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const query = new URLSearchParams(options.data).toString();
    url += url.indexOf("?") != -1 ? "&" : "?";
    url += query;
  }

  if (!options.headers) {
    options.headers = {};
  }
  if (
    options.method !== "GET" &&
    options.data &&
    !(options.data instanceof FormData)
  ) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(options.data);
  }

  let token = window.TOKEN || sessionStorage.getItem("TOKEN");

  if (!token) {
    token = localStorage.getItem("TOKEN");
  }
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const resp = await fetch(url, options).then((resp) => resp.json());

  if (resp.errno) {
    throw new Error(resp.errmsg);
  }

  return resp.data;
}
