import type { RequestParams } from "../Hooks/useApi";

type RequestFn = <T = any>(params: RequestParams) => Promise<T>;

const profileService = {
  getProfile: async (request: RequestFn) => {
    return request<{ data: Profile }>({
      url: "/profile",
      method: "GET",
    });
  },

  updateProfile: async (request: RequestFn, data: Partial<Profile>) => {
    return request({
      url: "/profile/update",
      method: "PUT",
      body: data,
    });
  },

  updateProfileImage: async (request: RequestFn, file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    return request({
      url: "/profile/image",
      method: "PUT",
      body: formData,
    });
  },
};

export default profileService;

export type Profile = {
  email: string;
  first_name: string;
  last_name: string;
  profil_image: string;
};
