'use client';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import { BussinessSector } from './types/BussinesSector';
import Swal from 'sweetalert2';

export default function AddCompany({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
    if (!isVisible) return null;
    const [users, setUsers] = useState<User[]>([]);
    const [bussinessSectors, setBussinessSector] = useState<BussinessSector[]>([]);
    const [formData, setFormData] = useState({
        companyName: "",
        nit: "",
        personContactName: null,
        personContactPhoneNumber: null,
        personContactEmail: null,
        address: "",
        bussinessSectorId: "",
        contactUserId: null
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                const responses = await axios.get('https://localhost:7195/api/users/all', config);
                const responsesB = await axios.get('https://localhost:7195/api/bussinesssector', config);
                setUsers(responses.data);
                setBussinessSector(responsesB.data);
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
            const response = await axios.post('https://localhost:7195/api/company', formData, config);
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Empresa registrada',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                // Limpiar los campos del formulario después de la alerta
                setFormData({
                    companyName: "",
                    nit: "",
                    personContactName: null,
                    personContactPhoneNumber: null,
                    personContactEmail: null,
                    address: "",
                    bussinessSectorId: "",
                    contactUserId: null
                });
            });
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                console.error('Error: No autorizado para realizar esta acción');
            } else {
                console.log(formData)
                console.error('Error al enviar la solicitud POST:', error);
            }
        }
    };
    return (
        <div className="fixed inset-0 bg-grey-50 flex justify-center items-center">
            <div className=" flex flex-col relative max-w-2xl w-full">
                <button className="text-grey-100 text-xl absolute top-0 right-0 p-4" onClick={() => onClose()}>X</button>
                <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">
                    <div className="mb-5 text-xl text-center font-bold ">Agregar Empresa</div>
                    <form className=" max-w-2xl w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-mb  mb-2" >
                                    Nombre de la compañía:
                                </label>
                                <input name="companyName" value={formData.companyName}
                                    onChange={handleChange}
                                    className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text" placeholder="Ingrese nombre de la compañía" required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-mb mb-2" >
                                    Nombre de contacto:
                                </label>
                                <input name="personContactName" value={formData.personContactName || ''}
                                    onChange={handleChange}
                                    className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text" placeholder="Ingrese la persona de contacto" required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text-gray-700 text-mb mb-2" htmlFor="grid-last-name">
                                    Celular de contacto:
                                </label>
                                <input name="personContactPhoneNumber" value={formData.personContactPhoneNumber || ''}
                                    onChange={handleChange}
                                    className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text" placeholder="Ingrese el celular" required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block  tracking-wide text-gray-700 text-mb mb-2" >
                                    Correo de contacto:
                                </label>
                                <input name="personContactEmail" value={formData.personContactEmail || ''}
                                    onChange={handleChange}
                                    className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text" placeholder="Ingrese el correo" required />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide text-gray-700 text-mb  mb-2">
                                    Dirección:
                                </label>
                                <input name="address" value={formData.address}
                                    onChange={handleChange} className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text" placeholder="Ingrese la dirección" required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text-gray-700 text-mb  mb-2" >
                                    Nit:
                                </label>
                                <input name="nit" value={formData.nit}
                                    onChange={handleChange} className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text" placeholder="Ingrese el nit" required />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block  tracking-wide text-gray-700 text-mb  mb-2" >
                                    Sector económico
                                </label>
                                <select name="bussinessSectorId" value={formData.bussinessSectorId}
                                    onChange={handleChange}
                                    className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white bg-grey-100">
                                    <option></option>
                                    {bussinessSectors.map(bussinessSector => (
                                        <option value={bussinessSector.id}>{bussinessSector.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-1 py-3">
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
