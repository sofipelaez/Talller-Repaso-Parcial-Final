import { useState } from "react";

import DepartamentosPage from "./pages/DepartamentoPage";
import EmpleadosPage from "./pages/EmpleadosPage";

import "./App.css";

function App() {

  const [vista, setVista] =
    useState("departamentos");

  return (

    <div className="app">

      <header className="navbar">

        <h2>
          Gestión Empresarial
        </h2>

        <nav>

          <button
            onClick={() =>
              setVista("departamentos")
            }
          >
            Departamentos
          </button>

          <button
            onClick={() =>
              setVista("empleados")
            }
          >
            Empleados
          </button>

        </nav>

      </header>

      <main>

        {vista === "departamentos" && (
          <DepartamentosPage />
        )}

        {vista === "empleados" && (
          <EmpleadosPage />
        )}

      </main>

    </div>

  );
}

export default App;