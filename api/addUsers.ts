import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const getUsersWithToken = async () => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No hay token de sesión');
    }
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responses = await axios.get('https://localhost:7195/api/company', config);
    console.log('Data from API:', responses.data); // Imprimir en la consola
    return responses.data; // Devolver los datos obtenidos
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Relanzar el error para manejarlo en el componente principal
  }
};

export const registerUser = async (formData: any) => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No hay token de sesión');
    }
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('https://localhost:7195/api/authentication/register', formData, config);
    console.log(response.data);
    return response.data; // Devolver la respuesta del registro
  } catch (error) {
    console.error('Error al enviar la solicitud POST:', error);
    throw error; // Relanzar el error para manejarlo en el componente principal
  }
};
