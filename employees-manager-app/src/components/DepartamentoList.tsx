import { useEffect, useState } from "react";
import { supabase } from "../supabase";

import "./DepartamentoList.css";

export default function DepartamentoList() {

  const [departamentos, setDepartamentos] =
    useState<any[]>([]);

  useEffect(() => {
    obtenerDepartamentos();
  }, []);

  async function obtenerDepartamentos() {

    const { data, error } = await supabase
      .from("departamentos")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setDepartamentos(data);
    }
  }

  async function eliminarDepartamento(id: string) {

    const confirmar = window.confirm(
      "¿Deseas eliminar este departamento?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("departamentos")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      obtenerDepartamentos();
    }
  }

  async function editarDepartamento(dep: any) {

  const nuevoNombre = prompt(
    "Nuevo nombre",
    dep.nombre
  );

  if (!nuevoNombre) return;

  const nuevaUbicacion = prompt(
    "Nueva ubicación",
    dep.ubicacion
  );

  const { error } = await supabase
    .from("departamentos")
    .update({
      nombre: nuevoNombre,
      ubicacion: nuevaUbicacion
    })
    .eq("id", dep.id);

  if (error) {

    console.log(error);

  } else {

    obtenerDepartamentos();

  }

}

  return (

    <div className="departamentos-container">

      <h2 className="departamentos-title">
        Gestión de Departamentos
      </h2>

      <table className="departamentos-table">

  <thead>
    <tr>
      <th>Nombre</th>
      <th>Ubicación</th>
      <th>Acciones</th>
    </tr>
  </thead>

  <tbody>

    {departamentos.map((dep) => (

      <tr key={dep.id}>

        <td>{dep.nombre}</td>

        <td>
          {dep.ubicacion || "Sin ubicación"}
        </td>

        <td>

        <button
        className="edit-btn"
        onClick={() => editarDepartamento(dep)}
        >
        Editar
        </button>

          <button
            className="delete-btn"
            onClick={() =>
              eliminarDepartamento(dep.id)
            }
          >
            Eliminar
          </button>

        </td>

      </tr>

    ))}

  </tbody>

      </table>

    </div>
  );
}