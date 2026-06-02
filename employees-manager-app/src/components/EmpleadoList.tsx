import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import "./EmpleadoList.css";

type Props = {
  actualizar: boolean;
};

export default function EmpleadoList({ actualizar }: Props) {
  const [empleados, setEmpleados] = useState<any[]>([]);

  useEffect(() => {
    obtenerEmpleados();
  }, [actualizar]);

  async function obtenerEmpleados() {
    const { data, error } = await supabase
      .from("empleados")
      .select(`
        *,
        departamentos(nombre)
      `);

    if (error) {
      console.error("Error obteniendo empleados:", error);
      return;
    }

    setEmpleados(data || []);
  }

  async function eliminarEmpleado(id: string) {
    const confirmar = window.confirm("¿Eliminar empleado?");

    if (!confirmar) return;

    const { error } = await supabase
      .from("empleados")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error eliminando:", error);
      alert(error.message);
      return;
    }

    obtenerEmpleados();
  }

  async function editarEmpleado(emp: any) {

  const nuevoNombre = prompt(
    "Nuevo nombre",
    emp.nombre
  );

  if (nuevoNombre === null) return;

  const nuevoPuesto = prompt(
    "Nuevo puesto",
    emp.puesto
  );

  if (nuevoPuesto === null) return;

  const { error } = await supabase
    .from("empleados")
    .update({
      nombre: nuevoNombre,
      puesto: nuevoPuesto
    })
    .eq("id", emp.id);

  if (error) {

    console.error(error);
    alert("Error al actualizar empleado");

  } else {

    alert("Empleado actualizado correctamente");
    obtenerEmpleados();

  }
}

  return (
    <div className="empleados-container">
      <h2 className="empleados-title">
        Gestión de Empleados
      </h2>

      <div className="empleados-grid">
        {empleados.map((emp) => (
          <div
            key={emp.id}
            className="empleado-card"
          >
            <h3>{emp.nombre}</h3>

            <p>
              Puesto: {emp.puesto}
            </p>

            <p>
              Departamento:{" "}
              {emp.departamentos?.nombre}
            </p>

            <p>
              Salario: $
              {Number(emp.salario)
                .toLocaleString()}
            </p>

            <div className="card-buttons">
              <button
                className="edit-btn"
                onClick={() =>
                  editarEmpleado(emp)
                }
              >
                Editar
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  eliminarEmpleado(emp.id)
                }
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}