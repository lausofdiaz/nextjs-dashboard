'use client'
import React, { Fragment, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { PencilIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Company } from '@/components/forms/types/Company';
import UpdateCompany from '@/components/forms/UpdateCompany';
import { BussinessSector } from '@/components/forms/types/BussinesSector';

export default function ListCompany(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [companys, setCompany] = useState<Company[]>([]);
  const [bussinessSector, setBussinesssector] = useState<BussinessSector[]>([]);
  
  const { search } = props;
  const [selectedCompanyId, setSelectedCompanyId] = useState<any | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>("");
  const [selectedPersonContactName, setSelectedPersonContactName] = useState<string>("");
  const [selectedPersonContactPhoneNumber, setSelectedPersonContactPhoneNumber] = useState<string>("");
  const [selectedPersonContactEmail, setSelectedPersonContactEmail] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");

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
        const response = await axios.get('https://localhost:7195/api/company', config);
        const responses = await axios.get('https://localhost:7195/api/bussinesssector', config);
        console.log('Data from API:', response.data);
        setCompany(response.data);
        setBussinesssector(responses.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsersWithToken();
  }, []);

  const handleEditClick = (userCompany: any,
    companyName: string,
    personContactName: string,
    personContactPhoneNumber: string,
    personContactEmail: string,
    address: string) => {
    setSelectedCompanyId(userCompany);
    setSelectedCompanyName(companyName);
    setSelectedPersonContactName(personContactName);
    setSelectedPersonContactPhoneNumber(personContactPhoneNumber);
    setSelectedPersonContactEmail(personContactEmail);
    setSelectedAddress(address);
  };
  return (
    <Fragment>
      <table className="w-full text-sm text-left text-black">
        <thead className="text-black bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Compañía
            </th>
            <th scope="col" className="px-6 py-3">
              Sector de negocios
            </th>
            <th scope="col" className="px-6 py-3">
              Contacto
            </th>
            <th scope="col" className="px-6 py-3">
              Celular
            </th>
            <th scope="col" className="px-6 py-3">
              Correo
            </th>
            <th scope="col" className="px-6 py-3">
              Dirección
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="max-h-60 overflow-y-auto">
          {companys.filter((company) =>
             (search
              ? company.companyName.toLowerCase().includes(search.toLowerCase())
              : true) ||
            (search
              ? bussinessSector.some(sector => sector.id === company.bussinessSectorId && sector.name.toLowerCase().includes(search.toLowerCase()))
              : true)
          ).map(company => (
            <tr key={company.id} className="hover:bg-grey-100">
              <td scope="col" className="px-6 py-3">{company.companyName}</td>
              <td scope="col" className="px-6 py-3">{bussinessSector.find(sector => sector.id === company.bussinessSectorId)?.name || 'No está asociado a ningún sector'}</td>
              <td scope="col" className="px-6 py-3">{company.personContactName}</td>
              <td scope="col" className="px-6 py-3">{company.personContactPhoneNumber}</td>
              <td scope="col" className="px-6 py-3">{company.personContactEmail}</td>
              <td scope="col" className="px-6 py-3">{company.address}</td>
              <td scope="col" className="px-6 py-3">
                <div className="flex justify-center space-x-4">
                  <button className="bg-blue-100 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setShowModal(true);
                      handleEditClick(company.id,
                        company.companyName,
                        company.personContactName,
                        company.personContactPhoneNumber,
                        company.personContactEmail,
                        company.address)
                    }}>
                    <PencilIcon className="h-6 w-5" />
                  </button>
                  <button className="bg-red-100 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    <LockClosedIcon className="h-6 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateCompany isVisible={showModal} onClose={() => setShowModal(false)}
        id={selectedCompanyId}
        companyName={selectedCompanyName}
        personContactName={selectedPersonContactName}
        personContactPhoneNumber={selectedPersonContactPhoneNumber}
        personContactEmail={selectedPersonContactEmail}
        address={selectedAddress}>
      </UpdateCompany>
    </Fragment>
  );
}