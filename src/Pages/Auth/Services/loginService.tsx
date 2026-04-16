const loginService = async (
  request: any,
  data: {
    email: string;
    password: string;
  },
) => {
  const baseUrl = import.meta.env.VITE_API_URL;

  return request(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export default loginService;
