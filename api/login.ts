'use client';
import axios from 'axios';

export async function loginService(data: { email: string; password: string; }) {
  try {
    const response = await axios.post('https://localhost:7195/api/authentication/login', data);
    return response;
  } catch (error) {
    console.error('Error:', error);
    return { status: 500, data: {} };
  }
}