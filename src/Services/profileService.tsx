import type { RequestParams } from "../Hooks/useApi";

type RequestFn = <T = any>(params: RequestParams) => Promise<T>;

const profileService = {
  getProfile: async (request: RequestFn) => {
    return request<{ data: Profile }>({
      url: "/profile",
      method: "GET",
    });
  },

  updateProfile: async (data: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);
    return result;
  },

  updateProfileImage: async (data: FormData) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/image`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);
    return result;
  },
};

export default profileService;

export type Profile = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
};
