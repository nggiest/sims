import type { RequestParams } from "../Hooks/useApi";

type RequestFn = <T = any>(params: RequestParams) => Promise<T>;

export type Service = {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
};

export type Banner = {
  banner_name: string;
  banner_image: string;
  description: string;
};

const informationService = {
  getService: async (request: RequestFn) => {
    return request({
      url: "/services",
      method: "GET",
    });
  },

  getBanner: async (request: RequestFn) => {
    return request({
      url: "/banner",
      method: "GET",
    });
  },
};

export default informationService;
