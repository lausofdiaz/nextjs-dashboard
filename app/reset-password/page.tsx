'use client';
import Image from "next/image";
import './page.css';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import router from "next/router";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from 'next/navigation';


export default function changePassword() {
  const router = useRouter();

  const [changeIcon, setChangeIcon] = useState(false);
  const [changeIconConfirm, setChangeIconConfirm] = useState(false);
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();

   const ResetPasswordRequest = {
    password,
    confirmPassword
  }

  const handlePasswordInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value)
  }

  useEffect(() => {
      const userIdParam = searchParams.get("userId");
      const tokenParam = encodeURIComponent(searchParams.get("token") || "");
      if (userIdParam && tokenParam) {
        setUserId(userIdParam);
        setToken(tokenParam);
      }
    }, [searchParams]);
  
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      console.log("user Id",userId)
      console.log("token",token)
      try {
        const response = await axios.patch<any>(`https://localhost:7195/api/users/reset-password?userId=${userId}&token=${token}`,
      {
        password,
        confirmPassword
      }
    );
        console.log("Respuesta del servidor: ok", response.data);
        
        router.push('/login');
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    };

  return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
          <br></br>
         <div className="mb-4 text-center">
            <Image src="/customers/vsualitteLogo.png" alt="Logo" width={190} height={100} className="mx-auto" priority={true}/>
           <br></br>
            <div className="mb-2 text-xl text-center font-bold">Cambiar contraseña</div>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
          <div className="mb-2 text-lg">Contraseña nueva</div>
          <div className="mb-4 relative">
            <input
              type={changeIcon ? "text" : "password"}
              placeholder="Contraseña nueva"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-500 border-black"
              value={password}
              onChange={handlePasswordInputChange}
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
          <div className="mb-2 text-lg">Confirmar contraseña</div>
          <div className="mb-4 relative">
            <input
              type={changeIconConfirm ? "text" : "password"}
              placeholder="Confirme la nueva contraseña"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-500 border-black"
              value={confirmPassword}
              onChange={handleConfirmPasswordInputChange}
            />
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setChangeIconConfirm(!changeIconConfirm)}>
              {changeIconConfirm ? (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full text-white p-2 rounded-2xl">
              Ingresar
            </button>
          </div>
          </form>
        </div>
      </div>   
  );
}
