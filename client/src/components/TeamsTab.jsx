import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

// API
import {
  getTeams,
  getTeamById,
  createTeam,
  editTeam,
  deleteTeam,
} from "../api/team";

// Components
import Table from "./Table";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";

// Constants
import { TEAM_TABLE_HEADERS } from "../constants/constants";

// Helpers
import { createTeamSchema, editTeamSchema } from "../helpers/validationSchema";

const TeamsTab = () => {
  const { modalOpen, setModalOpen } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [rows, setRows] = useState([]);
  const [currentTeam, setCurrentTeam] = useState([]);
  const [headers, setHeaders] = useState(TEAM_TABLE_HEADERS);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await getTeams();

        if (!data.ok) {
          throw new Error(data.message);
        }

        setRows(data.teams);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTeamData();
  }, []);

  useEffect(() => {
    if (modalOpen === false) {
      setIsEditing(false);
      setIsCreating(false);
    }
  }, [modalOpen]);

  const openCreateForm = () => {
    setModalOpen(true);
    setIsCreating(true);
  };

  const openEditForm = async (id) => {
    try {
      const data = await getTeamById(id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      setCurrentTeam(data.team);
      setModalOpen(true);
      setIsEditing(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreate = async (values) => {
    try {
      const data = await createTeam(values);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const newRow = data.team;

      setRows((prevRows) => [...prevRows, newRow]);
      setModalOpen(false);
      toast.success(data.message);
    } catch (error) {
      if (error.message) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error("Algo ha ido mal. Vuelva a intentarlo más tarde.");
        toast.error("Algo ha ido mal. Vuelva a intentarlo más tarde.");
      }
    }
  };

  const handleEdit = async (values) => {
    try {
      const data = await editTeam(values, currentTeam.id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const updatedRow = data.team;
      const updatedRows = rows.map((row) =>
        row.id === updatedRow.id ? updatedRow : row
      );

      setRows(updatedRows);
      setModalOpen(false);
      toast.success(data.message);
    } catch (error) {
      if (error.message) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error("Algo ha ido mal. Vuelva a intentarlo más tarde.");
        toast.error("Algo ha ido mal. Vuelva a intentarlo más tarde.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Está seguro?") === true) {
      try {
        const data = await deleteTeam(id);

        if (!data.ok) {
          throw new Error(data.message);
        }

        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        toast.success(data.message);
      } catch (error) {
        if (error.message) {
          console.error(error.message);
          toast.error(error.message);
        } else {
          console.error("Algo ha ido mal. Vuelva a intentarlo más tarde.");
          toast.error("Algo ha ido mal. Vuelva a intentarlo más tarde.");
        }
      }
    }
  };

  return (
    <>
      <Button variant="primary" className="self-end" onClick={openCreateForm}>
        Crear equipo
      </Button>
      <Table
        headers={headers}
        rows={rows}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />
      {modalOpen === true && isEditing ? (
        <Modal
          title="Editar equipo"
          onClose={() => {
            setModalOpen(false);
            setIsEditing(false);
          }}
        >
          <Formik
            initialValues={{
              teamName: currentTeam?.team_name,
              teamDescription: currentTeam?.team_description,
            }}
            validationSchema={editTeamSchema}
            onSubmit={handleEdit}
          >
            {({ isSubmitting, dirty }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="teamName">Nombre del equipo</label>

                    <Field name="teamName">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el nombre del equipo..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="teamName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="teamDescription">
                      Descripción del equipo
                    </label>

                    <Field name="teamDescription">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el nombre de la marca..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="teamDescription">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting || !dirty}
                >
                  Guardar cambios
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : null}

      {modalOpen === true && isCreating ? (
        <Modal
          title="Crear equipo"
          onClose={() => {
            setModalOpen(false);
            setIsCreating(false);
          }}
        >
          <Formik
            initialValues={{
              teamName: "",
              teamDescription: "",
            }}
            validationSchema={createTeamSchema}
            onSubmit={handleCreate}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="teamName">Nombre del equipo</label>

                    <Field name="teamName">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el nombre del equipo..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="teamName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="teamDescription">
                      Descripción del equipo
                    </label>

                    <Field name="teamDescription">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese la descripción del equipo..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="teamDescription">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Crear equipo
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
};

export default TeamsTab;
