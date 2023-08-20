import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

// API
import {
  getBrands,
  getBrandById,
  createBrand,
  editBrand,
  deleteBrand,
} from "../api/brand";

// Components
import Table from "./Table";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";

// Constants
import { BRAND_TABLE_HEADERS } from "../constants/constants";

// Helpers
import {
  createBrandSchema,
  editBrandSchema,
} from "../helpers/validationSchema";

const BrandsTab = () => {
  const { modalOpen, setModalOpen } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentBrand, setCurrentBrand] = useState([]);
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState(BRAND_TABLE_HEADERS);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const data = await getBrands();

        if (!data.ok) {
          throw new Error(data.message);
        }

        setRows(data.brands);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBrandData();
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
      const data = await getBrandById(id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      setCurrentBrand(data.brand);
      setModalOpen(true);
      setIsEditing(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreate = async (values) => {
    try {
      const data = await createBrand(values);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const newRow = data.brand;

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
      const data = await editBrand(values, currentBrand.id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const updatedRow = data.brand;
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
        const data = await deleteBrand(id);

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
        Crear marca
      </Button>
      <Table
        headers={headers}
        rows={rows}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />
      {modalOpen === true && isEditing ? (
        <Modal
          title="Editar marca"
          onClose={() => {
            setModalOpen(false);
            setIsEditing(false);
          }}
        >
          <Formik
            initialValues={{
              brandName: currentBrand?.brand_name,
            }}
            validationSchema={editBrandSchema}
            onSubmit={handleEdit}
          >
            {({ isSubmitting, dirty }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col col-span-2 gap-2">
                    <label htmlFor="brandName">Nombre de la marca</label>

                    <Field name="brandName">
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

                    <ErrorMessage name="brandName">
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
          title="Crear marca"
          onClose={() => {
            setModalOpen(false);
            setIsCreating(false);
          }}
        >
          <Formik
            initialValues={{
              brandName: "",
            }}
            validationSchema={createBrandSchema}
            onSubmit={handleCreate}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col col-span-2 gap-2">
                    <label htmlFor="brandName">Nombre de la marca</label>

                    <Field name="brandName">
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

                    <ErrorMessage name="brandName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Crear marca
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
};

export default BrandsTab;
