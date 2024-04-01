import { api } from '@/api/axiosBaseConfig';

export async function confirmEmail(
    userId: string,
    token: string
): Promise<any> {
  try {
    const response = await api.patch<any>(
      `/users/confirm-email?userId=${userId}&token=${token}`,
    );

    console.log(response);

    return response.data;
  } catch (error) {
    throw error;
  }
}