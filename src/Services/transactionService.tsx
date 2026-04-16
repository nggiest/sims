import type { RequestParams } from "../Hooks/useApi";

type RequestFn = <T = any>(params: RequestParams) => Promise<T>;

export type Balance = {
  balance: number;
};

const transactionService = {
  getBalance: async (request: RequestFn) => {
    return request<{ data: Balance }>({
      url: "/balance",
      method: "GET",
    });
  },

  postTopUp: async (request: RequestFn, data: { top_up_amount: string }) => {
    return request({
      url: "/topup",
      method: "POST",
      body: data,
    });
  },

  postTransaction: async (
    request: RequestFn,
    data: { service_code: string },
  ) => {
    return request({
      url: "/transaction",
      method: "POST",
      body: data,
    });
  },

  getTransactions: async (
    request: RequestFn,
    params: { offset: number; limit: number },
  ) => {
    return request({
      url: `/transactions?offset=${params.offset}&limit=${params.limit}`,
    });
  },
};

export default transactionService;
