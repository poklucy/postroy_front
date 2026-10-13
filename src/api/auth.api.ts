import { axiosInstance } from './axios.config';
import { API_ENDPOINTS } from './endpoints';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post(API_ENDPOINTS.auth.login, { email, password });
    return response.data;
  },

  register: async (data: unknown) => {
    const response = await axiosInstance.post(API_ENDPOINTS.auth.register, data);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post(API_ENDPOINTS.auth.logout);
    return response.data;
  },

  getMe: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.auth.me);
    return response.data;
  },
};
