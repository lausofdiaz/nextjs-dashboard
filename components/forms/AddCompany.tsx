'use client';
import { useEffect, useState } from 'react';
import { User } from '../types/User';
import Cookies from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import { BussinessSector } from '../types/BussinesSector';
import Swal from 'sweetalert2';
import { addCompany, getUsersAndBussinessSectors } from '@/api/addCompany';

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
        const fetchData = async () => {
            const { users, bussinessSectors } = await getUsersAndBussinessSectors();
            setUsers(users);
            setBussinessSector(bussinessSectors);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const success = await addCompany(formData);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Empresa registrada',
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
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
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar la empresa',
                showConfirmButton: false,
                timer: 3000,
            });
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
                                    type="email" placeholder="Ingrese el correo" required />
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
