'use client';
import Image from "next/image";
import './page.css';
import { ChangeEvent, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  const handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await axios.post('https://localhost:7195/api/users/forgot-password',  email ,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    Swal.fire({
      icon: "success",
      title: "Correo electrónico enviado con exito",
      showConfirmButton: false,
      timer: 1500
    });
      setEmail("");
    } catch (error) {
      alert('Error al enviar el correo electrónico');
    console.log(error);
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
        <div className="mb-2 text-xl text-center font-bold">Cambiar contraseña</div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 text-lg">Correo electrónico</div>
          <div className="mb-4">
            <input
              type="text"
              value={email}
              onChange={handleEmailInputChange}
              required
              placeholder="Ingrese su correo electrónico"
              className="w-full p-2 border border-gray-300 rounded-md border-black"
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full text-white p-2 rounded-2xl">
              Enviar
            </button>
          </div>
        </form>        
      </div>
    </div>
  );
}
