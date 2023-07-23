import React, { useState, useEffect } from "react";

// API
import { employees, deleteEmployee } from "../api/person";

// Components
import Table from "../components/Table";
import Button from "../components/Button";

const EmployeesTab = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([
    { id: "id", text: "ID" },
    { id: "full_name", text: "Nombre completo" },
    { id: "email", text: "Correo electrónico" },
    { id: "job_title", text: "Trabajo" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeData = await employees();

        if (!employeeData.ok) {
          throw new Error(employeeData.message);
        }

        setRows(employeeData.employees);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    const newRow = {
      id: Date.now(),
      property1: "New Value 1",
      property2: "New Value 2",
    };

    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleEdit = async (id) => {
    alert(`Edit object with ID ${id}`);
  };

  const handleDelete = async (id) => {
    if (id === user.id) {
      alert(
        "No es posible eliminar un usuario mientras tenga una sesión activa."
      );
    } else {
      try {
        console.log(id);
        const employeeData = await deleteEmployee(id);

        if (!employeeData.ok) {
          throw new Error(employeeData.message);
        }

        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <Button variant="primary" className="self-end">
        Crear empleado
      </Button>
      <Table
        headers={headers}
        rows={rows}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default EmployeesTab;
