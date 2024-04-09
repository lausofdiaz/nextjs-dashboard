'use client';
import React, { Fragment, useState } from "react";
import AddUsers from "@/components/forms/AddUsers";
import ListUsers from "./listUsers/page";
import Search from "@/components/forms/Search";
import Add from "@/components/forms/Add";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const name = "Usuario";
  return (
    <Fragment>
      <div>
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold">Usuarios</h1>
          <div className="flex space-x-4">
            <Search setSearch={setSearch} />
            <Add onClick={() => setShowModal(true)} name={name}></Add>
          </div>
        </div>
        <div className="flex overflow-x-auto">
          <ListUsers search={search}></ListUsers>
        </div>
      </div>
      <AddUsers isVisible={showModal} onClose={() => setShowModal(false)} />
    </Fragment>
  );
}
