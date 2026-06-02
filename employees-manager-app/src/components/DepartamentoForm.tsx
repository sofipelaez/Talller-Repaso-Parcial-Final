import { useState } from "react";
import { supabase } from "../supabase";

import "./DepartamentoForm.css";

export default function DepartamentoForm() {

  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const guardarDepartamento = async () => {

    if (!nombre) {
      alert("El nombre es obligatorio");
      return;
    }

    const { error } = await supabase
      .from("departamentos")
      .insert([
        {
          nombre,
          ubicacion
        }
      ]);

    if (error) {
      console.error(error);
      alert("Error al guardar");
    } else {

      alert("Departamento creado");

      setNombre("");
      setUbicacion("");

      window.location.reload();
    }
  };

  return (

    <div className="departamento-form">

      <h2>Añadir Nuevo Departamento</h2>

      <div className="form-row">

        <input
          type="text"
          placeholder="Nombre del Departamento"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Ubicación (Ej: Piso 3)"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />

      </div>

      <button
        className="form-btn"
        onClick={guardarDepartamento}
      >
        Añadir Departamento
      </button>

    </div>
  );
}