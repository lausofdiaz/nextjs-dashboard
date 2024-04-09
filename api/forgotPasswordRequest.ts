import Cookies from 'js-cookie';
import { LoginSuccess } from '@/components/types/LoginSuccess';
import { api } from '@/api/axiosBaseConfig';

export async function forgotPasswordRequest(
    email: string,
  ): Promise<LoginSuccess> {
    try {
      const response = await api.post<LoginSuccess>(
        '/users/forgot-password',email,
      );
  
      console.log(response);
      console.log("Link form reset-password");
  
      return response.data;
    } catch (error) {
      console.error('forgot password request failed:', error);
      throw error;
    }
  }