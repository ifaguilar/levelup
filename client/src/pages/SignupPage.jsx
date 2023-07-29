import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate, Navigate, useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API
import { signup } from "../api/auth";
import { getMunicipalitiesByDepartmentId } from "../api/municipality";

// Components
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";

// Constants
import { SIGNUP_FORM_STEPS } from "../constants/constants";

// Context
import { AuthContext } from "../context/AuthProvider";

// Helpers
import { signupSchema } from "../helpers/validationSchema";

const SignupPage = () => {
  const { isAuthenticated, loginUser } = useContext(AuthContext);
  const { jobs, genders, departments } = useLoaderData();
  const [currentStep, setCurrentStep] = useState(0);
  const [municipalities, setMunicipalities] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const data = await signup(values);

      if (data.errors) {
        for (const errorMessage of data.errors) {
          throw new Error(errorMessage);
        }
      }

      if (!data.ok) {
        throw new Error(data.message);
      }

      loginUser(data.token, data.user);
      navigate("/");
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

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
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

  if (isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-white">
        <Navigate to="/" />
      </div>
    );
  }

  return (
    <>
      <div className="h-screen lg:grid lg:grid-cols-2">
        <div className="hidden h-full bg-neutral-900 lg:block"></div>
        <div className="flex flex-col items-center justify-center h-full gap-16 px-4 py-24 bg-white">
          <Logo />
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
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
              <Form className="flex flex-col w-full max-w-xs gap-8">
                <div className="flex overflow-hidden">
                  {SIGNUP_FORM_STEPS.map((step, index) => (
                    <div
                      key={index}
                      className={`flex flex-col min-w-full gap-8 basis-full transition ${
                        currentStep === 4
                          ? "-translate-x-[400%]"
                          : currentStep === 3
                          ? "-translate-x-[300%]"
                          : currentStep === 2
                          ? "-translate-x-[200%]"
                          : currentStep === 1
                          ? "-translate-x-[100%]"
                          : "-translate-x-0"
                      }`}
                    >
                      <h5>{`${index + 1}. ${step.title}`}</h5>
                      {step.fields.map((stepField, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          <label htmlFor={stepField.name}>
                            {stepField.label}
                          </label>

                          <Field name={stepField.name}>
                            {({ field, meta }) =>
                              stepField.type === "select" ? (
                                <Select
                                  touched={meta.touched ? meta.touched : false}
                                  error={meta.error ? meta.error : ""}
                                  {...field}
                                  onChange={(event) => {
                                    handleChange(event);
                                    stepField.name === "department"
                                      ? handleDepartmentChange(event)
                                      : null;
                                  }}
                                  disabled={
                                    stepField.name === "municipality" &&
                                    municipalities.length === 0
                                      ? true
                                      : false
                                  }
                                >
                                  <option value="">
                                    {stepField.placeholder}
                                  </option>
                                  {stepField.name === "job"
                                    ? jobs.map((job) => (
                                        <option key={job.id} value={job.id}>
                                          {job.job_title}
                                        </option>
                                      ))
                                    : stepField.name === "gender"
                                    ? genders.map((gender) => (
                                        <option
                                          key={gender.id}
                                          value={gender.id}
                                        >
                                          {gender.gender_name}
                                        </option>
                                      ))
                                    : stepField.name === "department"
                                    ? departments.map((departments) => (
                                        <option
                                          key={departments.id}
                                          value={departments.id}
                                        >
                                          {departments.department_name}
                                        </option>
                                      ))
                                    : stepField.name === "municipality"
                                    ? municipalities.map((municipality) => (
                                        <option
                                          key={municipality.id}
                                          value={municipality.id}
                                        >
                                          {municipality.municipality_name}
                                        </option>
                                      ))
                                    : null}
                                </Select>
                              ) : (
                                <Input
                                  touched={meta.touched ? meta.touched : false}
                                  error={meta.error ? meta.error : ""}
                                  type={stepField.type}
                                  placeholder={stepField.placeholder}
                                  {...field}
                                />
                              )
                            }
                          </Field>

                          <ErrorMessage name={stepField.name}>
                            {(message) => (
                              <span className="text-red-600">{message}</span>
                            )}
                          </ErrorMessage>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="secondary"
                    onClick={handlePrevStep}
                    className={
                      currentStep === 0
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                    }
                  >
                    Regresar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleNextStep}
                    className={
                      currentStep === SIGNUP_FORM_STEPS.length - 1
                        ? "hidden"
                        : "block"
                    }
                  >
                    Siguiente
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className={
                      currentStep === SIGNUP_FORM_STEPS.length - 1
                        ? "block"
                        : "hidden"
                    }
                  >
                    Registrarse
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="flex gap-2">
            <p>¿Ya tiene cuenta?</p>
            <Link to="/login" className="font-semibold underline">
              Inicie sesión ahora
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default SignupPage;
