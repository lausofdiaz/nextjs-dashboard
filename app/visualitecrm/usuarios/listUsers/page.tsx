'use client'
import React, { Fragment, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { PencilIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import UpdateUsers from '@/components/forms/UpdateUser';
import { User } from '@/components/forms/types/User';
import Swal from 'sweetalert2';

export default function ListUsers(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<any | null>(null);
  const [selectedFirstName, setSelectedFirstName] = useState<string>("");
  const [selectedLastName, setSelectedLastName] = useState<string>("");
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string>("");
  const { search } = props;
  const [formData, setFormData] = useState({
    status: true
  });

  //obtener usuarios para listar
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
        const response = await axios.get('https://localhost:7195/api/users/all', config);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsersWithToken();
  }, []);

  //obtener datos para modificar
  const handleEditClick = (userId: any, firstName: string, lastName: string, phoneNumber: string) => {
    setSelectedUserId(userId);
    setSelectedFirstName(firstName);
    setSelectedLastName(lastName);
    setSelectedPhoneNumber(phoneNumber);
  };

  const handleDisabledClick = async (userId: any) => {
    setSelectedUserId(userId);
    console.log("el id para deshabilitar", userId);
    const nuevoEstado = !formData.status;
    setFormData(prevState => ({
      ...prevState,
      status: nuevoEstado
    }));
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
      const response = await axios.patch(`https://localhost:7195/api/users/${userId}/stae`, { status: nuevoEstado }, config);
      setUsers(response.data);
      console.log("deshabilitadoooooooo", response.data);
    } catch (error) {
      console.error('Error patch:', error);
    }
  };

  return (
    <Fragment>
     
      <table className="w-full text-sm text-left text-black ">
        <thead className="text-white bg-purple-100 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre completo
            </th>
            <th scope="col" className="px-6 py-3">
              Empresa
            </th>
            <th scope="col" className="px-6 py-3">
              Correo
            </th>
            <th scope="col" className="px-6 py-3">
              Celular
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="max-h-60 ">
          {users
            .filter((user) =>
              search
                ? user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.company.companyName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase())
                : true
            )
            .map((user) => (
              <tr key={user.id} className="hover:bg-grey-50">
                <td scope="col" className="px-6 py-3">{user.firstName} {user.lastName}</td>               
                <td scope="col" className="px-6 py-3">{user.company.companyName}</td>
                <td scope="col" className="px-6 py-3">{user.email}</td>
                <td scope="col" className="px-6 py-3">{user.phoneNumber}</td>
                <td scope="col" className="px-6 py-3">
                  {user.isActive ? (
                    <label>Activo</label>
                  ) : (
                    <label>Inactivo</label>
                  )
                  }
                  {user.isActive}</td>
                <td scope="col" className="px-6 py-3">
                  <div className="flex justify-center space-x-4">
                    <button className="bg-blue-100 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {setShowModal(true); handleEditClick(user.id, user.firstName, user.lastName, user.phoneNumber) }}>
                      <PencilIcon className="h-6 w-5" />
                    </button>
                    <button className="bg-red-100 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {handleDisabledClick(user.id)}}>
                      <LockClosedIcon className="h-6 w-5" />
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>      
      <UpdateUsers isVisible={showModal} onClose={() => setShowModal(false)} id={selectedUserId} firstName={selectedFirstName} lastName={selectedLastName} phoneNumber={selectedPhoneNumber} />
    </Fragment>
  );
}
