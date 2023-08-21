export const getProducts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/product`
  );
  const data = await response.json();

  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/product/${id}`
  );
  const data = await response.json();

  return data;
};

export const createProduct = async (values) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/product`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const editProduct = async (values, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/product/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const deleteProduct = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/product/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return data;
};

export const countProducts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/product/count`
  );
  const data = await response.json();

  return data;
};

export const countProductsByCategory = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/product/count/category`
  );
  const data = await response.json();

  return data;
};

export const countProductsByBrand = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/product/count/brand`
  );
  const data = await response.json();

  return data;
};
