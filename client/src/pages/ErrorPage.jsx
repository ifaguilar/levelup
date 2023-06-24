import React from "react";
import { useRouteError, Link } from "react-router-dom";

// Components
import Button from "../components/Button";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-12">
      <div className="flex flex-col items-center gap-6">
        <h1>Oops!</h1>
        <p>Lo sentimos, un error inesperado ha ocurrido.</p>
        <p className="flex gap-2">
          <span>
            Error {error.status}: {error.statusText}
          </span>
        </p>
      </div>
      <Link to="/">
        <Button variant="primary">Ir a la página principal</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
