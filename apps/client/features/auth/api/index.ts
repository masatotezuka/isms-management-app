import { axios } from '../../../libs';
import { Login } from '../types';

export const login = async (
  data: Login
): Promise<{ accessToken: string; userId: number }> => {
  const response = await axios.post(`auth/login`, data);
  return response.data;
};