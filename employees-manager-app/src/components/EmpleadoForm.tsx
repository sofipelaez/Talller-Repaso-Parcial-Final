import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import "./EmpleadoForm.css";

type Props = {
  onEmpleadoCreado: () => void;
};

export default function EmpleadoForm({
  onEmpleadoCreado
}: Props) {

  const [nombre, setNombre] = useState("");
  const [puesto, setPuesto] = useState("");
  const [salario, setSalario] = useState("");
  const [departamentoId, setDepartamentoId] =
    useState("");

  const [departamentos, setDepartamentos] =
    useState<any[]>([]);

  useEffect(() => {
    cargarDepartamentos();
  }, []);

  async function cargarDepartamentos() {

    const { data, error } = await supabase
      .from("departamentos")
      .select("*");

    if (error) {

      console.log(error);

    } else {

      setDepartamentos(data || []);
    }
  }

  async function guardarEmpleado() {

    if (
      !nombre ||
      !puesto ||
      !salario ||
      !departamentoId
    ) {
      alert("Completa todos los campos");
      return;
    }

    const { error } = await supabase
      .from("empleados")
      .insert([
        {
          nombre,
          puesto,
          salario: Number(salario),
          departamento_id: departamentoId
        }
      ]);

    if (error) {

      console.log(error);
      alert("Error al guardar");

    } else {

      alert("Empleado creado");

      setNombre("");
      setPuesto("");
      setSalario("");
      setDepartamentoId("");

      onEmpleadoCreado();
    }
  }

  return (

    <div className="form-card">

      <h2>
         Añadir Nuevo Empleado
      </h2>

      <div className="form-row">

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Puesto"
          value={puesto}
          onChange={(e) =>
            setPuesto(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Salario"
          value={salario}
          onChange={(e) =>
            setSalario(e.target.value)
          }
        />

        <select
          value={departamentoId}
          onChange={(e) =>
            setDepartamentoId(
              e.target.value
            )
          }
        >

          <option value="">
            Seleccionar Departamento
          </option>

          {departamentos.map((dep) => (

            <option
              key={dep.id}
              value={dep.id}
            >
              {dep.nombre}
            </option>

          ))}

        </select>

      </div>

      <button
        type="button"
        onClick={guardarEmpleado}
      >
        Añadir Empleado
      </button>

    </div>

  );
}