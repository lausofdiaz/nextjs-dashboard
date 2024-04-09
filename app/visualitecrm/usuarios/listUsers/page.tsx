'use client'
import React, { Fragment, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { PencilIcon, CheckIcon, NoSymbolIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import UpdateUsers from '@/components/forms/UpdateUser';
import { User } from '@/components/types/User';
import Swal from 'sweetalert2';
import InformationUsers from './InformatioUsers/InformationUsers';
import { useRouter } from 'next/navigation';

export default function ListUsers(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [showModalInform, setShowModalInform] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [enable, setEnable] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<any | null>(null);
  const [selectedFirstName, setSelectedFirstName] = useState<string>("");
  const [selectedLastName, setSelectedLastName] = useState<string>("");
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string>("");
  const { search } = props;
  const router = useRouter();

  //obtener usuarios para listarr
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

  //activar-desactivar usuario
  const handleDisabledClick = async (userId: any) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        throw new Error('No hay token de sesión');
      }
      const userToUpdate = users.find((user) => user.id === userId);
      if (!userToUpdate) {
        throw new Error('Usuario no encontrado');
      }
      const updatedUsers = users.map((user) => {
        if (user.id === userId) {
          return { ...user, isActive: !user.isActive };
        }
        return user;
      });
      setUsers(updatedUsers);
      const response = await axios.patch(
        `https://localhost:7195/api/users/${userId}/state`,
        { status: !userToUpdate.isActive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const successMessage = !userToUpdate.isActive
        ? 'El usuario ha sido activado.'
        : 'El usuario ha sido desactivado.';
      Swal.fire({
        title: '¡Hecho!',
        text: successMessage,
        icon: 'success'
      });
    } catch (error) {
      console.error('Error al actualizar el estado del usuario:', error);
    }
  };
  const handleInformationClick = () => {

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
          {users.filter((user) =>
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
                <td scope="col" className="px-6 py-3 ">
                  <div className="flex justify-left space-x-4">
                    <button className="bg-acuamarin-100 hover:bg-acuamarin-50 text-white font-bold py-2 px-4 rounded" title="Información" onClick={() => { handleInformationClick() }}>
                      <InformationCircleIcon className="h-6 w-5" />
                    </button>
                    <button className="bg-purplee-100 hover:bg-purplee-50 text-white font-bold py-2 px-4 rounded" title="Modificar usuario" onClick={() => { setShowModal(true); handleEditClick(user.id, user.firstName, user.lastName, user.phoneNumber) }}>
                      <PencilIcon className="h-6 w-5" />
                    </button>
                    {user.isActive ? (
                      <button className="bg-blue-30 hover:bg-blue-10 text-white font-bold py-2 px-4 rounded" title="Inactivar usuario" onClick={() => { handleDisabledClick(user.id) }}>
                        <CheckIcon className="h-6 w-5" />
                      </button>
                    ) : (
                      <button className="bg-grey-30  text-white font-bold py-2 px-4 rounded" title="Activar usuario" onClick={() => { handleDisabledClick(user.id) }}>
                        <NoSymbolIcon className="h-6 w-5" />
                      </button>
                    )}
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
