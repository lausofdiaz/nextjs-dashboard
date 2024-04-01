'use client';
import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


interface PropsUpdateUsers {
  isVisible: boolean;
  onClose: () => void;
  id: any; 
  firstName: string;
  lastName: string;
  phoneNumber: string;

}


export default function UpdateUsers({ isVisible, onClose, id, firstName, lastName, phoneNumber }: PropsUpdateUsers) {
  if (!isVisible) return null;


  const userIdValue = { id }
  const userId = userIdValue.id;

  const firstNameValue = { firstName }
  const firstNamee = firstNameValue.firstName;

  const lastNameValue = { lastName }
  const lastNameee = lastNameValue.lastName;

  const phoneNumberValue = { phoneNumber }
  const phoneNumbere = phoneNumberValue.phoneNumber;


  const [formData, setFormData] = useState({
    firstName: firstNamee,
    LastName: lastNameee,
    phoneNumber: phoneNumbere
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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

      const response = await axios.put(`https://localhost:7195/api/users/${userId}`, formData, config);
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Datos modificados',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        // Limpiar los campos del formulario después de la alerta
        setFormData({
          firstName: "",
          LastName: "",
          phoneNumber: ""
        });
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error('Error: No autorizado para realizar esta acción');
      } else {
        console.error('Error al enviar la solicitud PUT:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-grey-50 flex justify-center items-center">
      <div className=" flex flex-col relative max-w-sm w-full mx-auto">
        <button className="text-grey-100 text-xl absolute top-0 right-0 p-4" onClick={() => onClose()}>X</button>
        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
          <div className="mb-5 text-xl text-center font-bold ">Modificar Usuario</div>
          <form className=" max-w-2xl w-full" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 ">
              <div className="w-full px-3  md:mb-0">
                <label className="block  tracking-wide text-gray-700 text-mb  mb-2">
                  Nombre:
                </label>
                <input name="firstName" value={formData.firstName}
                  onChange={handleChange} 
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                  type="text" 
                  placeholder="Modifique el nombre" 
                  required/>
              </div>
              <div className="w-full px-3">
                <label className="block tracking-wide text-gray-700 text-mb  mb-2" >
                  Apellido:
                </label>
                <input name="LastName" value={formData.LastName}
                  onChange={handleChange} 
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                  type="text" 
                  placeholder="Modifique el apellido"
                  required/>
              </div>
              <div className="w-full px-3">
                <label className="block tracking-wide text-gray-700 text-mb  mb-2" >
                  Celular:
                </label>
                <input name="phoneNumber" value={formData.phoneNumber}
                  onChange={handleChange} 
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                  type="text" 
                  placeholder="Modifique el celular" 
                  required/>
              </div>
            </div>
            <div className="mb-4">
              <button type="submit" 
                className="w-full text-white bg-purple-100 p-2 border rounded-2xl hover:bg-white hover:text-purple-100 hover:border hover:border-purple-100">
                Modificar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
