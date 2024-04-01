'use client';
import { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  HomeIcon,
  UserIcon,
  BuildingOffice2Icon,
  PhoneIcon,
  PowerIcon
} from '@heroicons/react/24/outline';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function MenuDashboard() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log(token)
    if (!token) {
      router.push('/login');
    }
  }, []);

  const links = [
    { name: 'Inicio', href: '/visualitecrm/dashboard', icon: HomeIcon },
    { name: 'Usuarios', href: '/visualitecrm/usuarios', icon: UserIcon },
    { name: 'Empresas', href: '/visualitecrm/empresas', icon: BuildingOffice2Icon },
    { name: 'Medios de contacto', href: '/visualitecrm/canalesDeContacto', icon: PhoneIcon },
  ];

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    router.push('/login');
  };

  return (
    <div className="">
      <div className={`bg-white h-screen  pt-8 ${open ? "w-60" : "w-40"} duration-500 relative`} >
        <div className="flex items-center justify-center bg-purple-100 rounded-full cursor-pointer w-8 h-8 absolute -right-4 top-9">
          <ChevronLeftIcon
            className={`text-white cursor-pointer w-5 ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex items-center justify-center mb-4">
          {open ? (
            <Image src="/customers/vsualitteLogo.png" alt="Logo" width={190} height={130} className="mx-auto" priority={true} />
          ) : (
            <Image src="/customers/vsualitteMano.png" alt="Logo" width={50} height={50} className="mx-auto" priority={true} />
          )}
        </div>
        <div className="">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <div key={link.name} >
                {open ? (
                  <Link href={link.href}>
                    <div key={link.name} className="flex h-14 items-center hover:bg-purple-50 hover:text-white rounded-md ">
                      <div className="flex items-center gap-6 p-2 ml-12 ">
                        <LinkIcon className="w-5" />
                        <p className="text-base">{link.name}</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link href={link.href}>
                    <div className="flex justify-center items-center gap-6 p-2 text-center h-14 hover:bg-purple-50 hover:text-white rounded-md">
                      <LinkIcon className="w-5" />
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-0 w-full cursor-pointer" style={{ transform: 'translateX(-50%)', left: '50%' }}>
          <div key="logout">
            {open ? (
              <div className="flex h-14 items-center justify-center hover:bg-purple-50 hover:text-white rounded-md gap-6 p-2 relative" onClick={handleLogout}>
                <PowerIcon className="w-5" />
                <p className="text-base">Cerrar sesión</p>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-6 p-2 text-center h-14 hover:bg-purple-50 hover:text-white rounded-md" onClick={handleLogout}>
                <PowerIcon className="w-5" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}