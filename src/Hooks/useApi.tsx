import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export type RequestParams<T = any> = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: T;
};

const BASE_URL = import.meta.env.VITE_API_URL;

const useApi = () => {
  const navigate = useNavigate();

  const request = useCallback(
    async <T = any,>({
      url,
      method = "GET",
      body,
    }: RequestParams): Promise<T> => {
      const token = localStorage.getItem("token");
      const isFormData = body instanceof FormData;
      const res = await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_exp");
        navigate("/login");
        throw new Error("Unauthorized");
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      return res.json();
    },
    [navigate],
  );

  return { request };
};

export default useApi;
