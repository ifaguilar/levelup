import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

// API
import {
  getCategory,
  getCategoryById,
  createCategory,
  deleteCategory,
  editCategory,
} from "../api/category";

// Components
import Table from "./Table";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";

// Constants
import { CATEGORY_TABLE_HEADERS } from "../constants/constants";

// Helpers
import { createCategorySchema, editCategorySchema } from "../helpers/validationSchema";

const CategoryTab = () => {
  const [modalOpen, setModalOpen] = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [rows, setRows] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [headers, setHeaders] = useState(CATEGORY_TABLE_HEADERS);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await getCategory();

        if (!data.ok) {
          throw new Error(data.message);
        }

        setRows(data.category);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCategoryData();
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
      const data = await getCategoryById(id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      setCurrentCategory(data.category);
      setModalOpen(true);
      setIsEditing(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreate = async (values) => {
    try {
      const data = await createCategory(values);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const newRow = data.category;

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
      const data = await editCategory(values, currentCategory.id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const updatedRow = data.category;
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
        const data = await deleteCategory(id);

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
              CategoryName: currentCategory?.category_name,
              CategoryDescription: currentCategory?.category_description,
            }}
            validationSchema={editCategorySchema}
            onSubmit={handleEdit}
          >
            {({ isSubmitting, dirty }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="categoryName">Nombre de la categoria</label>

                    <Field name="categoryName">
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

                    <ErrorMessage name="categoryName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="categoryDescription">
                      Descripción del equipo
                    </label>

                    <Field name="categoryDescription">
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

                    <ErrorMessage name="categoryDescription">
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
              categoryName: "",
              categoryDescription: "",
            }}
            validationSchema={createCategorySchema}
            onSubmit={handleCreate}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="categoryName">Nombre de la categoria</label>

                    <Field name="categoryName">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el nombre de la categoria..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="categoryName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="categoryDescription">
                      Descripción de la categoria
                    </label>

                    <Field name="categoryDescription">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese la descripción de la categoria..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="categoryDescription">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Crear categoria
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
};

export default CategoryTab;