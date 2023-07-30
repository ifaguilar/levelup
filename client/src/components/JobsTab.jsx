import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

// API
import { getJobs, getJobById, createJob, editJob, deleteJob } from "../api/job";
import { getTeams } from "../api/team";

// Components
import Table from "./Table";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import Select from "./Select";

// Constants
import { JOB_TABLE_HEADERS } from "../constants/constants";

// Helpers
import { createJobSchema, editJobSchema } from "../helpers/validationSchema";

const JobsTab = () => {
  const [modalOpen, setModalOpen] = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [rows, setRows] = useState([]);
  const [teams, setTeams] = useState([]);
  const [currentJob, setCurrentJob] = useState([]);
  const [headers, setHeaders] = useState(JOB_TABLE_HEADERS);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const data = await getJobs();

        if (!data.ok) {
          throw new Error(data.message);
        }

        setRows(data.jobs);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchTeamData = async () => {
      try {
        const team = await getTeams();

        if (!team.ok) {
          throw new Error(team.message);
        }

        setTeams(team.teams);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchJobData();
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
      const data = await getJobById(id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      setCurrentJob(data.job);
      setModalOpen(true);
      setIsEditing(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreate = async (values) => {
    try {
      const data = await createJob(values);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const newRow = data.job;

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
      const data = await editJob(values, currentJob.id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const updatedRow = data.job;
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
        const data = await deleteJob(id);

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
        Crear trabajo
      </Button>
      <Table
        headers={headers}
        rows={rows}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />
      {modalOpen === true && isEditing ? (
        <Modal
          title="Editar trabajo"
          onClose={() => {
            setModalOpen(false);
            setIsEditing(false);
          }}
        >
          <Formik
            initialValues={{
              jobTitle: currentJob?.job_title,
              jobDescription: currentJob?.job_description,
              teamId: currentJob?.team_id,
            }}
            validationSchema={editJobSchema}
            onSubmit={handleEdit}
          >
            {({ isSubmitting, dirty }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="jobTitle">Nombre del trabajo</label>

                    <Field name="jobTitle">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el nombre del trabajo..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="jobTitle">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="teamId">Equipo</label>

                    <Field name="teamId">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione el equipo...</option>
                          {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                              {team.team_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="teamId">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col col-span-2 gap-2">
                    <label htmlFor="jobDescription">
                      Descripción del trabajo
                    </label>

                    <Field name="jobDescription">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese la descripción del trabajo..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="jobDescription">
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
          title="Crear trabajo"
          onClose={() => {
            setModalOpen(false);
            setIsCreating(false);
          }}
        >
          <Formik
            initialValues={{
              jobTitle: "",
              jobDescription: "",
              teamId: "",
            }}
            validationSchema={createJobSchema}
            onSubmit={handleCreate}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="jobTitle">Nombre del trabajo</label>

                    <Field name="jobTitle">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el nombre del trabajo..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="jobTitle">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="teamId">Equipo</label>

                    <Field name="teamId">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione el equipo...</option>
                          {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                              {team.team_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="teamId">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col col-span-2 gap-2">
                    <label htmlFor="jobDescription">
                      Descripción del trabajo
                    </label>

                    <Field name="jobDescription">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese la descripción del trabajo..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="jobDescription">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Crear trabajo
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
};

export default JobsTab;
