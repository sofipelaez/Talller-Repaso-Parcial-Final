import { useState } from "react";

import EmpleadoForm from "../components/EmpleadoForm";
import EmpleadoList from "../components/EmpleadoList";

export default function EmpleadosPage() {

  const [actualizar, setActualizar] =
    useState(false);

  function refrescarLista() {

    setActualizar(prev => !prev);
  }

  return (

    <>
      <EmpleadoForm
        onEmpleadoCreado={refrescarLista}
      />

      <EmpleadoList
        actualizar={actualizar}
      />
    </>
  );
}