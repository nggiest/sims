const registrationService = async (
  request: any,
  data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  },
) => {
  const baseUrl = import.meta.env.VITE_API_URL;

  return request(`${baseUrl}/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export default registrationService;
