import { axiosInstance } from './axios.config';
import { API_ENDPOINTS } from './endpoints';

export const ordersApi = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.orders.all);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(API_ENDPOINTS.orders.byId(id));
    return response.data;
  },

  create: async (data: unknown) => {
    const response = await axiosInstance.post(API_ENDPOINTS.orders.create, data);
    return response.data;
  },
};
