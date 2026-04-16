import { useNavigate } from "react-router-dom";
type RequestParams<T = any> = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: T;
};

const useApi = () => {
  const navigate = useNavigate();
  const request = async ({ url, method = "GET", body }: RequestParams) => {
    const token = localStorage.getItem("token");
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_exp");
      navigate("/login");
      return;
    }

    return res.json();
  };

  return { request };
};

export default useApi;
