import { axiosInstance } from './axios.config';
import { API_ENDPOINTS } from './endpoints';

export const userApi = {
  getProfile: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.user.profile);
    return response.data;
  },

  updateProfile: async (data: unknown) => {
    const response = await axiosInstance.put(API_ENDPOINTS.user.update, data);
    return response.data;
  },

  getAddresses: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.user.addresses);
    return response.data;
  },
};
