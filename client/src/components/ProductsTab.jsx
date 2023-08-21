import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

// API
import {
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
} from "../api/product";
import { getCategories } from "../api/category";
import { getBrands } from "../api/brand";
import { getSuppliers } from "../api/supplier";

// Components
import Table from "./Table";
import Button from "./Button";
import Modal from "./Modal";
import Input from "./Input";
import Select from "./Select";

// Constants
import { PRODUCT_TABLE_HEADERS } from "../constants/constants";

// Helpers
import {
  editProductSchema,
  createProductSchema,
} from "../helpers/validationSchema";

const ProductsTab = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { modalOpen, setModalOpen } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [rows, setRows] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [headers, setHeaders] = useState(PRODUCT_TABLE_HEADERS);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await getProducts();

        if (!data.ok) {
          throw new Error(data.message);
        }

        setRows(data.products);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchBrandData = async () => {
      try {
        const data = await getBrands();

        if (!data.ok) {
          throw new Error(data.message);
        }

        setBrands(data.brands);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const data = await getCategories();

        if (!data.ok) {
          throw new Error(data.message);
        }

        setCategories(data.categories);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchSupplierData = async () => {
      try {
        const data = await getSuppliers();

        if (!data.ok) {
          throw new Error(data.message);
        }

        setSuppliers(data.suppliers);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProductData();
    fetchBrandData();
    fetchCategoryData();
    fetchSupplierData();
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
      const productData = await getProductById(id);

      if (!productData.ok) {
        throw new Error(productData.message);
      }

      setCurrentProduct(productData.product);
      setModalOpen(true);
      setIsEditing(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreate = async (values) => {
    try {
      const data = await createProduct(values);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const newRow = data.product;

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
      const data = await editProduct(values, currentProduct.id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      const updatedRow = data.product;
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
        const data = await deleteProduct(id);

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
        Crear producto
      </Button>
      <Table
        headers={headers}
        rows={rows}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />
      {modalOpen === true && isEditing ? (
        <Modal
          title="Editar producto"
          onClose={() => {
            setModalOpen(false);
            setIsEditing(false);
          }}
        >
          <Formik
            initialValues={{
              productName: currentProduct?.product_name,
              productDescription: currentProduct?.product_description,
              price: currentProduct?.price,
              brandId: currentProduct?.brand_id,
              categoryId: currentProduct?.category_id,
              supplierId: currentProduct?.supplier_id,
            }}
            validationSchema={editProductSchema}
            onSubmit={handleEdit}
          >
            {({ isSubmitting, dirty }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="productName">Nombre del producto</label>

                    <Field name="productName">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el nombre del producto..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="productName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="productDescription">
                      Descripción del producto
                    </label>

                    <Field name="productDescription">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese la descripción del producto..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="productDescription">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="price">Precio</label>

                    <Field name="price">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el precio..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="price">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="brandId">Marca</label>

                    <Field name="brandId">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione la marca...</option>
                          {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {brand.brand_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="brandId">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="categoryId">Categoría</label>

                    <Field name="categoryId">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione la categoría...</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.category_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="categoryId">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="supplierId">Proveedor</label>

                    <Field name="supplierId">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione el proveedor...</option>
                          {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                              {supplier.supplier_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="supplierId">
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
          title="Crear producto"
          onClose={() => {
            setModalOpen(false);
            setIsCreating(false);
          }}
        >
          <Formik
            initialValues={{
              productName: "",
              productDescription: "",
              price: "",
              brandId: "",
              categoryId: "",
              supplierId: "",
            }}
            validationSchema={createProductSchema}
            onSubmit={handleCreate}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col w-full gap-8 pr-4 overflow-y-auto max-h-96">
                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="productName">Nombre del producto</label>

                    <Field name="productName">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el nombre del producto..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="productName">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="productDescription">
                      Descripción del producto
                    </label>

                    <Field name="productDescription">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese la descripción del producto..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="productDescription">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="price">Precio</label>

                    <Field name="price">
                      {({ field, meta }) => (
                        <Input
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          type="text"
                          placeholder="Ingrese el precio..."
                          {...field}
                        />
                      )}
                    </Field>

                    <ErrorMessage name="price">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="brandId">Marca</label>

                    <Field name="brandId">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione la marca...</option>
                          {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {brand.brand_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="brandId">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className="grid grid-rows-2 gap-12 md:grid-rows-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="categoryId">Categoría</label>

                    <Field name="categoryId">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione la categoría...</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.category_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="categoryId">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="supplierId">Proveedor</label>

                    <Field name="supplierId">
                      {({ field, meta }) => (
                        <Select
                          touched={meta.touched ? meta.touched : false}
                          error={meta.error ? meta.error : ""}
                          {...field}
                        >
                          <option value="">Seleccione el proveedor...</option>
                          {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                              {supplier.supplier_name}
                            </option>
                          ))}
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="supplierId">
                      {(message) => (
                        <span className="text-red-600">{message}</span>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Crear producto
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      ) : null}
    </>
  );
};

export default ProductsTab;
