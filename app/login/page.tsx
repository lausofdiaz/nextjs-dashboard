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
   
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
        
          {/*imagen del logo Visualitté */}
          <div className="mb-4 text-center">
            <Image src="/customers/vsualitteLogo.png" alt="Logo" width={190} height={100} className="mx-auto" priority={true}/>
          </div>
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
          {/*div que contiene label e input de la contraseña*/}
          <div className="mb-2 text-lg">Contraseña</div>
          <div className="mb-4 relative">
            {/*validación dentro del input que permite cambiar el tipo de datos del input
            Esto funciona en conjunto con el cambio de ícono de mostrar y ocultar contraseña*/}
            <input
              type={changeIcon ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-500 border-black"
            />
            {/*validación que permite realizar el cambio de ícono*/}
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
          {/*div que contiene el checkbox*/}
          <div className="mb-4 flex items-center">
            <input type="checkbox" className="mr-2 border-gray-300 bg-gray-300 rounded-sm" />
            <span className="text-gray-500 opacity-50">Recordar mis datos</span>
          </div>
          {/*div que contiene el botón para ingresar */}
          <div className="mb-4">
          <Link href="/visualitecrm">
          <button className="w-full text-white p-2 rounded-2xl">
              Ingresar
            </button>
          </Link>
          </div>
          {/*div que contiene la redirección al layout de olvidó su contraseña*/}
          <div className="text-center">
            <Link href="/changePassword">
              <span className="text-blue-500">¿Olvidó su contraseña?</span>
            </Link>
          </div>
        </div>
      </div>
  
  );
}
