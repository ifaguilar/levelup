import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

// API
import {
  employees,
  deleteEmployee,
  createEmployee,
  editEmployee,
  getEmployeeById,
} from "../api/person";
import { getJobs } from "../api/job";
import { getGenders } from "../api/gender";
import { getDepartments } from "../api/department";
import { getMunicipalitiesByDepartmentId } from "../api/municipality";

// Components
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "./Modal";
import Input from "./Input";
import Select from "./Select";

// Constants
import { EMPLOYEE_TABLE_HEADERS } from "../constants/constants";

// Helpers
import {
  editEmployeeSchema,
  createEmployeeSchema,
} from "../helpers/validationSchema";

const EmployeesTab = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [modalOpen, setModalOpen] = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [rows, setRows] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [genders, setGenders] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [headers, setHeaders] = useState(EMPLOYEE_TABLE_HEADERS);

  useEffect(() => {
    const fetchEmployeeData = async () => {
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

    const fetchJobData = async () => {
      try {
        const jobData = await getJobs();

        if (!jobData.ok) {
          throw new Error(jobData.message);
        }

        setJobs(jobData.jobs);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchGenderData = async () => {
      try {
        const genderData = await getGenders();

        if (!genderData.ok) {
          throw new Error(genderData.message);
        }

        setGenders(genderData.genders);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchDeparmentData = async () => {
      try {
        const departmentData = await getDepartments();

        if (!departmentData.ok) {
          throw new Error(departmentData.message);
        }

        setDepartments(departmentData.departments);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEmployeeData();
    fetchJobData();
    fetchGenderData();
    fetchDeparmentData();
  }, []);

  useEffect(() => {
    if (modalOpen === false) {
      setMunicipalities([]);
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
      const employeeData = await getEmployeeById(id);

      if (!employeeData.ok) {
        throw new Error(employeeData.message);
      }

      const municipalityData = await getMunicipalitiesByDepartmentId(
        employeeData.employee.department_id
      );

      setMunicipalities(municipalityData.municipalities);
      setCurrentEmployee(employeeData.employee);
      setModalOpen(true);
      setIsEditing(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreate = async (values) => {
    try {
      const data = await createEmployee(values);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const newRow = data.employee;

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
      const data = await editEmployee(values, currentEmployee.id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const updatedRow = data.employee;
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
    if (id === user.id) {
      alert(
        "No es posible eliminar un usuario mientras tenga una sesión activa."
      );
    } else {
      if (confirm("¿Está seguro?") == true) {
        try {
          const data = await deleteEmployee(id);

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
    }
  };

  const handleDepartmentChange = async (event) => {
    if (event.target.value !== "") {
      const municipalityData = await getMunicipalitiesByDepartmentId(
        event.target.value
      );
      setMunicipalities(municipalityData.municipalities);
    } else {
      setMunicipalities([]);
    }
  };

  return (
    <>
      <Button variant="primary" className="self-end" onClick={openCreateForm}>
        Crear empleado
      </Button>
      <Table
        headers={headers}
        rows={rows}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />
      {modalOpen === true && isEditing ? (
        <Modal
          title="Editar empleado"
          onClose={() => {
            setModalOpen(false);
            setIsEditing(false);
          }}
        >
          <Formik
            initialValues={{
              firstName: currentEmployee?.first_name,
              lastName: currentEmployee?.last_name,
              job: currentEmployee?.job_id,
              phone: currentEmployee?.phone,
              birthdate: new Date(currentEmployee?.birthdate)
                .toISOString()
                .slice(0, 10),
              gender: currentEmployee?.gender_id,
              department: currentEmployee?.department_id,
              municipality: currentEmployee?.municipality_id,
              address: currentEmployee?.address_description,
              email: currentEmployee?.email,
            }}
            validationSchema={editEmployeeSchema}
            onSubmit={handleEdit}
          >
            {({ isSubmitting, handleChange, dirty }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName">Nombre</label>

                    <Field name="firstName">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el nombre..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="firstName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName">Apellido</label>

                    <Field name="lastName">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el apellido..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="lastName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="job">Trabajo</label>

                    <Field name="job">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione el trabajo...</option>
                          {jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                              {job.job_title}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="job">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone">Teléfono</label>

                    <Field name="phone">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el teléfono..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="phone">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="birthdate">Fecha de nacimiento</label>

                    <Field name="birthdate">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="date"
                          placeholder="Ingrese la fecha de nacimiento..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="birthdate">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="gender">Género</label>

                    <Field name="gender">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione el género...</option>
                          {genders.map((gender) => (
                            <option key={gender.id} value={gender.id}>
                              {gender.gender_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="gender">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="department">Departamento</label>

                    <Field name="department">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                          onChange={(event) => {
                            handleChange(event);
                            handleDepartmentChange(event);
                          }}
                        >
                          <option value="">
                            Seleccione el departamento...
                          </option>
                          {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.department_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="department">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="municipality">Municipio</label>

                    <Field name="municipality">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione el municipio...</option>
                          {municipalities.map((municipality) => (
                            <option
                              key={municipality.id}
                              value={municipality.id}
                            >
                              {municipality.municipality_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="municipality">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="address">Dirección</label>

                    <Field name="address">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese la dirección..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="address">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Correo electrónico</label>

                    <Field name="email">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el correo electrónico..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="email">
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
          title="Crear empleado"
          onClose={() => {
            setModalOpen(false);
            setIsCreating(false);
          }}
        >
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              job: "",
              phone: "",
              birthdate: "",
              gender: "",
              department: "",
              municipality: "",
              address: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={createEmployeeSchema}
            onSubmit={handleCreate}
          >
            {({ isSubmitting, handleChange }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName">Nombre</label>

                    <Field name="firstName">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el nombre..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="firstName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName">Apellido</label>

                    <Field name="lastName">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el apellido..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="lastName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="job">Trabajo</label>

                    <Field name="job">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione el trabajo...</option>
                          {jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                              {job.job_title}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="job">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone">Teléfono</label>

                    <Field name="phone">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el teléfono..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="phone">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="birthdate">Fecha de nacimiento</label>

                    <Field name="birthdate">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="date"
                          placeholder="Ingrese la fecha de nacimiento..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="birthdate">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="gender">Género</label>

                    <Field name="gender">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione el género...</option>
                          {genders.map((gender) => (
                            <option key={gender.id} value={gender.id}>
                              {gender.gender_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="gender">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="department">Departamento</label>

                    <Field name="department">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                          onChange={(event) => {
                            handleChange(event);
                            handleDepartmentChange(event);
                          }}
                        >
                          <option value="">
                            Seleccione el departamento...
                          </option>
                          {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                              {department.department_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="department">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="municipality">Municipio</label>

                    <Field name="municipality">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione el municipio...</option>
                          {municipalities.map((municipality) => (
                            <option
                              key={municipality.id}
                              value={municipality.id}
                            >
                              {municipality.municipality_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="municipality">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="address">Dirección</label>

                    <Field name="address">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese la dirección..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="address">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Correo electrónico</label>

                    <Field name="email">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el correo electrónico..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="email">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password">Contraseña</label>

                    <Field name="password">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="password"
                          placeholder="Ingrese la contraseña..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="password">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword">
                      Confirmar contraseña
                    </label>

                    <Field name="confirmPassword">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="password"
                          placeholder="Confirme la contraseña..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="confirmPassword">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Crear empleado
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
};

export default EmployeesTab;
