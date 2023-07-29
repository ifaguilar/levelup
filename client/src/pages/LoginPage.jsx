import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API
import { login } from "../api/auth";

// Components
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";

// Context
import { AuthContext } from "../context/AuthProvider";

// Helpers
import { loginSchema } from "../helpers/validationSchema";

const LoginPage = () => {
  const { isAuthenticated, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const data = await login(values);

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

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
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
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-full max-w-xs gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Correo electrónico</label>

                  <Field name="email">
                    {({ field, meta }) => (
                      <Input
                        touched={meta.touched ? meta.touched : false}
                        error={meta.error ? meta.error : ""}
                        type="email"
                        placeholder="Ingrese su correo electrónico..."
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

                <div className="flex flex-col gap-2">
                  <label htmlFor="password">Contraseña</label>

                  <Field name="password">
                    {({ field, meta }) => (
                      <Input
                        touched={meta.touched ? meta.touched : false}
                        error={meta.error ? meta.error : ""}
                        type="password"
                        placeholder="Ingrese su contraseña..."
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

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Iniciar sesión
                </Button>
              </Form>
            )}
          </Formik>
          <div className="flex gap-2">
            <p>¿No tiene cuenta?</p>
            <Link to="/signup" className="font-semibold underline">
              Regístrese ahora
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default LoginPage;
