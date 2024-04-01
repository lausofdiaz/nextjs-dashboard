'use client';
import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


interface PropsUpdateCompany {
  isVisible: boolean;
  onClose: () => void;
  id: any;
  companyName: string;
  personContactName: string;
  personContactPhoneNumber: string;
  personContactEmail: string;
  address: string;
}


export default function UpdateCompany({ isVisible, onClose, id, companyName, personContactName, personContactPhoneNumber, personContactEmail, address }: PropsUpdateCompany) {
  if (!isVisible) return null;

  const companyIdValue = { id }
  const CompanyIdUp = companyIdValue.id;

  const companyNameValue = { companyName }
  const companyNameUp = companyNameValue.companyName;

  const personContactNameValue = { personContactName }
  const personContactNameUp = personContactNameValue.personContactName;

  const personContactPhoneNumberValue = { personContactPhoneNumber }
  const personContactPhoneNumberUp = personContactPhoneNumberValue.personContactPhoneNumber;

  const personContactEmailValue = { personContactEmail }
  const personContactEmailUp = personContactEmailValue.personContactEmail;

  const addressValue = { address }
  const addressUp = addressValue.address;

  const [formData, setFormData] = useState({
    companyName: companyNameUp,
    personContactName: personContactNameUp,
    personContactPhoneNumber: personContactPhoneNumberUp,
    personContactEmail: personContactEmailUp,
    address: addressUp

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

      const response = await axios.put(`https://localhost:7195/api/company/${CompanyIdUp}`, formData, config);
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Datos modificados',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        // Limpiar los campos del formulario después de la alerta
        setFormData({
          companyName: "",
          personContactName: "",
          personContactPhoneNumber: "",
          personContactEmail: "",
          address: ""
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
      <div className=" flex flex-col relative max-w-2xl w-full">
        <button className="text-grey-100 text-xl absolute top-0 right-0 p-4" onClick={() => onClose()}>X</button>
        <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
          <div className="mb-5 text-xl text-center font-bold ">Modificar Empresa</div>
          <form className=" max-w-2xl w-full" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 ">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block  tracking-wide text-gray-700 text-mb mb-2">
                  Nombre de la compañía:
                </label>
                <input name="companyName" value={formData.companyName}
                  onChange={handleChange}
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Modifique el nombre de la compañía"
                  required />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 ">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block  tracking-wide text-gray-700 text-mb mb-2">
                  Nombre de contacto:
                </label>
                <input name="personContactName" value={formData.personContactName}
                  onChange={handleChange}
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Modifique la persona de contacto"
                  required />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-700 text-mb mb-2">
                  Celular de contacto:
                </label>
                <input name="personContactPhoneNumber" value={formData.personContactPhoneNumber}
                  onChange={handleChange}
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Modifique el celular de contacto"
                  required />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 ">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-mb  mb-2" >
                  Email de contacto:
                </label>
                <input name="personContactEmail" value={formData.personContactEmail}
                  onChange={handleChange}
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Modifique el email de contacto" />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-700 text-mb  mb-2" >
                  Dirección:
                </label>
                <input name="address" value={formData.address}
                  onChange={handleChange}
                  className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Modifique la dirección de la empresa"
                  required />
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
    </div >
  );
}
