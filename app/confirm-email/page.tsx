'use client';
import Image from "next/image";
import './page.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmEmail() {
  const router = useRouter()
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();

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
    console.log(userId)
    console.log(token)
    try {
      const response = await axios.patch<any>(`https://localhost:7195/api/users/confirm-email?userId=${userId}&token=${token}`);
      console.log("Respuesta del servidor: ok", response.data);
      alert("confirmado")
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
          <Image
            src="/customers/vsualitteLogo.png"
            alt="Logo"
            width={190}
            height={100}
            className="mx-auto"
            priority={true}
          />
        </div>
        <br></br>
        <div className="mb-2 text-xl text-center font-bold">Confirmar correo electrónico</div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <button type="submit" className="w-full text-white p-2 rounded-2xl">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
