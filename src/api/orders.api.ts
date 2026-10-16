import { axiosInstance } from './axios.config';
import { API_ENDPOINTS } from './endpoints';
import { mockRequest } from './mock';
import { Order } from '@/types/order.types';

export const ordersApi = {
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.orders.all);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(API_ENDPOINTS.orders.byId(id));
    return response.data;
  },

  place: (order: Order): Promise<Order> => mockRequest('checkout', 800, () => order),

  create: async (data: unknown) => {
    const response = await axiosInstance.post(API_ENDPOINTS.orders.create, data);
    return response.data;
  },
};
