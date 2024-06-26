'use client';
import {
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import { Company } from '../types/Company';
import { User } from '../types/User';
import { Checkbox } from "@nextui-org/react";
import Swal from 'sweetalert2';
import { getUsersWithToken, registerUser } from '@/api/addUsers';

export default function AddUsers({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
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
    const fetchData = async () => {
      try {
        const data = await getUsersWithToken();
        setCompany(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Manejar errores de manera adecuada
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await registerUser(formData);
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        setFormData({
          firstName: "",
          LastName: "",      
          companyId: "",
          Email: "",
          phoneNumber: "",
          roles: [] as string[],
        });
      });
    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error);
      // Manejar errores de manera adecuada
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
                    <option key={company.id} value={company.id}>{company.companyName}</option>
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
