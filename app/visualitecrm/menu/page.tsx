'use client';
import { useState } from "react";
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

export default function MenuDashboard() {
  const [open, setOpen] = useState(true);
  const links = [
    { name: 'Inicio', href: '/visualitecrm/dashboard', icon: HomeIcon },
    { name: 'Usuarios', href: '/visualitecrm//usuarios', icon: UserIcon },
    { name: 'Empresas', href: '/visualitecrm//empresas', icon: BuildingOffice2Icon },
    { name: 'Medios de contacto', href: '/visualitecrm//canalesDeContacto', icon: PhoneIcon },
  ];
  const out = [
    { name: 'Cerrar sesión', href: '/login', icon: PowerIcon }

  ];

  return (
    <div className="">
      {/* div que contiene el ícono de la flecha */}
      <div className={`bg-white h-screen  pt-8 ${open ? "w-60" : "w-40"} duration-500 relative`}>
        <div className="flex items-center justify-center bg-purple-100 rounded-full cursor-pointer w-8 h-8 absolute -right-4 top-9">
          <ChevronLeftIcon
            className={`text-white cursor-pointer w-5 ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
        {/* div que contiene el logo de la empres */}
        <div className="flex items-center justify-center mb-4">
          {open ? (
            <Image src="/customers/vsualitteLogo.png" alt="Logo" width={190} height={130} className="mx-auto" priority={true}/>
          ) : (
            <Image src="/customers/vsualitteMano.png" alt="Logo" width={50} height={50} className="mx-auto" priority={true} />
          )}
        </div><br></br><br></br>
        {/* div que contiene los menús */}
        <div className="">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <div>
                {open ? (
                  <Link href={link.href}>
                    <div key={link.name} className="flex h-14 items-center hover:bg-purple-50 hover:text-white rounded-md ">
                      <div className="flex items-center gap-6 p-2 ml-12 ">
                        <LinkIcon className="w-5" />
                        <p className="text-base">{link.name}</p>
                      </div>
                    </div>
                  </Link>
                ) : (<Link href={link.href}>
                  <div className="flex justify-center items-center gap-6 p-2 text-center h-14 hover:bg-purple-50 hover:text-white rounded-md">
                    <LinkIcon className="w-5" />
                  </div>
                </Link>
                )}
              </div>
            );
          })}
        </div>
        {/* div que contiene cerrar sesión */}
        <div className="absolute bottom-0 w-full" style={{ transform: 'translateX(-50%)', left: '50%' }}>
          {out.map((outs) => {
            const LinkIcon = outs.icon;
            return (
              <div key={outs.name}>
                {open ? (
                  <Link href={outs.href}>
                    <div className="flex h-14 items-center justify-center hover:bg-purple-50 hover:text-white rounded-md gap-6 p-2 relative">
                      <LinkIcon className="w-5" />
                      <p className="text-base">{outs.name}</p>
                    </div>
                  </Link>
                ) : (
                  <Link href={outs.href}>
                    <div className="flex justify-center items-center gap-6 p-2 text-center h-14 hover:bg-purple-50 hover:text-white rounded-md">
                      <LinkIcon className="w-5" />
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
}
