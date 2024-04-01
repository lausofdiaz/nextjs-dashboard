'use client';
import { Fragment, useState } from "react";
import AddCompany from "@/components/forms/AddCompany";
import ListCompany from "./listCompany/page";

import Search from "@/components/forms/Search";
import Add from "@/components/forms/Add";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const name = "Empresa";

  return (
    <Fragment>
      <div>
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold">Empresas</h1>
          <div className="flex space-x-4">
            <Search setSearch={setSearch} />
            <Add onClick={() => setShowModal(true)} name={name}></Add>
          </div>
        </div>
        <div className="relative overflow-x-auto  ">
          <ListCompany search={search}></ListCompany>
        </div>
      </div>
      <AddCompany isVisible={showModal} onClose={() => setShowModal(false)} />
    </Fragment>
  );
}
