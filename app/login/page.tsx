'use client';
import Image from "next/image";
import './page.css';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [changeIcon, setChangeIcon] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log(token)
    if (token) {
      router.push('/visualitecrm');
    }else{
      router.push('/login');
    }
  }, []);


  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: { target: any; preventDefault: () => void; }) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const login = await loginService(data);
      console.log(login.status);

      if (login.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: "Verifique los datos ingresados",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        console.log("Inicio de sesión exitoso");
        const { token, refreshToken } = login.data;
        console.log(token);
        console.log(refreshToken);
        Cookies.set('token', token, { expires: 900 }); // Expires in 1 hour
        Cookies.set('refreshToken', refreshToken, { expires: 2592000 }); // Expires in 1 day
        router.push('/visualitecrm');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loginService = async (data: { email: string; password: string; }) => {
    try {
      const response = await axios.post('https://localhost:7195/api/authentication/login', data);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return { status: 500, data: {} };
    }
  }
  return (
    <>
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
        <div className="mb-4 text-center">
          <Image src="/customers/vsualitteLogo.png" alt="Logo" width={190} height={100} className="mx-auto" priority={true} />
        </div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 text-lg">Correo electrónico</div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={handleEmailInputChange}
              placeholder="Ingrese su correo electrónico"
              className="w-full p-2 border border-gray-300 rounded-md border-black"
              required
            />
          </div>
          <div className="mb-2 text-lg">Contraseña</div>
          <div className="mb-4 relative">
            <input
              type={changeIcon ? "text" : "password"}
              value={password}
              onChange={handlePasswordInputChange}
              placeholder="Ingrese su contraseña"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-500 border-black"
              required
            />
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setChangeIcon(!changeIcon)}>
              {changeIcon ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" className="mr-2 border-gray-300 bg-gray-300 rounded-sm" checked/>
            <span className="text-gray-500 opacity-50">Recordar mis datos</span>
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full text-white p-2 rounded-2xl hover:text-purple-100 hover:bg-white hover:border-2 hover:border-purple-100">
              Ingresar
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link href="/forgot-password">
            <span className="text-blue-500">¿Olvidó su contraseña?</span>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
