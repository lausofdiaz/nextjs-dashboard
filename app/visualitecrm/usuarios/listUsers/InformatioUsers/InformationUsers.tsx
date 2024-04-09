'use client';
import {
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import { Company } from '@/components/types/Company';
import { User } from '@/components/types/User';
import { Checkbox } from "@nextui-org/react";
import Swal from 'sweetalert2';

export default function InformationUsers({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
  if (!isVisible) return null;
  const [changeIcon, setChangeIcon] = useState(false);
  const [estadoActivo, setEstadoActivo] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [companys, setCompany] = useState<Company[]>([]);


  const [formData, setFormData] = useState({
    firstName: "",
    LastName: "",
    companyId: "",
    Email: "",
    phoneNumber: "",
    roles: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const newValue = checkbox.checked ? [...formData.roles, value] : formData.roles.filter(role => role !== value);
      setFormData(prevData => ({
        ...prevData,
        [name]: newValue,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  useEffect(() => {
    const getUsersWithToken = async () => {
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
        setCompany(responses.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsersWithToken();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

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
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        // Limpiar los campos del formulario después de la alerta
        setFormData({
          firstName: "",
          LastName: "",      
          companyId: "",
          Email: "",
          phoneNumber: "",
          roles: [] as string[],
        });
    });
} 
    catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error('Error: No autorizado para realizar esta acción');
        // Puedes mostrar un mensaje al usuario informándoles del error de autorización
      } else {
        console.error('Error al enviar la solicitud POST:', error);
        // Puedes manejar otros errores aquí, por ejemplo, mostrar un mensaje de error general
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-grey-50 flex justify-center items-center">
      <div className=" flex flex-col relative max-w-2xl w-full">
        <button className="text-grey-100 text-xl absolute top-0 right-0 p-4" onClick={() => onClose()}>X</button>
        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
          <div className="mb-5 text-xl text-center font-bold ">Agregar Usuario</div>
          <form className=" max-w-2xl w-full" onSubmit={handleSubmit} >
            <div className="flex flex-wrap -mx-3 ">

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block  tracking-wide text-gray-700 text-mb  mb-2">
                  Nombre:
                </label>
                <input name="firstName" value={formData.firstName}
                  onChange={handleChange} className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Ingrese el nombre" required/>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-700 text-mb  mb-2" >
                  Apellido:
                </label>
                <input name="LastName" value={formData.LastName}
                  onChange={handleChange} className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Ingrese el apellido" required />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 ">
              <div className="w-full px-3">
                <label className="block tracking-wide text-gray-700 text-mb  mb-2" >
                  Empresa
                </label>
                <select name="companyId" value={formData.companyId} onChange={handleChange} className="appearance-none block w-full  xt-tegray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white bg-grey-100">
                  <option></option>
                  {companys.map(company => (
                    <option value={company.id}>{company.companyName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 ">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-mb  mb-2" >
                  Correo electrónico:
                </label>
                <input name="Email" value={formData.Email}
                  onChange={handleChange} className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Ingrese el correo" required />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-700 text-mb  mb-2" >
                  Celular:
                </label>
                <input name="phoneNumber" value={formData.phoneNumber}
                  onChange={handleChange} className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Ingrese el celular" required />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 ">
              <div className="w-full flex md:w-1/2 px-3 mb-6 md:mb-0 gap-3">
                <label className="block tracking-wide text-gray-700 text-mb  mb-2" >
                  Rol:
                </label>
                <div className="flex items-center mb-3 gap-3">
                  <input
                    type="checkbox"
                    name="roles"
                    value="Superadministrator"
                    checked={formData.roles.includes('Superadministrator')}
                    onChange={handleChange}
                  ></input>
                  <label>Superadministrador</label>
                 
                </div>
                <div className="flex items-center mb-3 gap-3">
                <input
                    type="checkbox"
                    name="roles"
                    value="Commercial"
                    checked={formData.roles.includes('Commercial')}
                    onChange={handleChange}
                  ></input>
                  <label>Comercial</label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <button type="submit" className="w-full text-white bg-purple-100 p-2 border rounded-2xl hover:bg-white hover:text-purple-100 hover:border hover:border-purple-100">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
