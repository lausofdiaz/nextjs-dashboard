'use client';
/*para poder usar el hook useState para realizar la modificación del ícono de mostrar y coultar contraseña
se utilizó use client, ya que este hook solo funciona de este lado */
import Image from "next/image";
/*Permite optimizar mejor la utilización de imagenes ya que esta es una opción que brinda next */
import './page.css';
import Link from 'next/link';
/*redirección a otros componentes */
import { useState } from "react";
/*hook useState que solo funciona del lado del cliente*/
import {
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
/*Importación de los íconos que fueron utilizados*/

export default function LoginPage() {

  //constante para poder realizar el cambio del ícono de mostrar y ocultar contraseña
  const [changeIcon, setChangeIcon] = useState(false);

  return (
    <body className="">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
          <br></br>
          {/*imagen del logo Visualitté */}
          <div className="mb-4 text-center">
            <Image src="/customers/vsualitteLogo.png" alt="Logo" width={190} height={100} className="mx-auto" priority={true} />
          </div>
          <br></br>
            <div className="mb-2 text-xl text-center font-bold">Cambiar contraseña</div>
          <br></br>
           {/*div que contiene label e input del correo electrónico*/}
          <div className="mb-2 text-lg">Correo electrónico</div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Ingrese su correo electrónico"
              className="w-full p-2 border border-gray-300 rounded-md border-black"
            />
          </div>
          {/*div que contiene el botón para ingresar */}
          <div className="mb-4">
            <button className="w-full text-white p-2 rounded-2xl">
              Ingresar
            </button>
          </div>
            {/*div que contiene la redirección al layout de iniciar*/}
            <div className="text-center">
            <Link href="/login">
              <span className="text-blue-500">Iniciar sesión</span>
            </Link>
          </div>
        </div>
      </div>
    </body>
  );
}
