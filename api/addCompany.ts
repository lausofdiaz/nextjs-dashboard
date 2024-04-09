import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { BussinessSector } from '@/components/types/BussinesSector';
import { User } from '@/components/types/User';
export async function getUsersAndBussinessSectors() {
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
    const responses = await axios.get('https://localhost:7195/api/users/all', config);
    const responsesB = await axios.get('https://localhost:7195/api/bussinesssector', config);
    return { users: responses.data, bussinessSectors: responsesB.data };
  } catch (error) {
    console.error('Error fetching users and bussiness sectors:', error);
    return { users: [], bussinessSectors: [] };
  }
}

export async function addCompany(formData: any) {
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
    const response = await axios.post('https://localhost:7195/api/company', formData, config);
    console.log(response.data);
    return true;
  } catch (error) {
    console.error('Error al enviar la solicitud POST:', error);
    return false;
  }
}
