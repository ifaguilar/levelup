export const getSalesOrders = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/sales_order`
  );
  const data = await response.json();

  return data;
};

export const getSalesOrderById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/sales_order/${id}`
  );
  const data = await response.json();

  return data;
};

export const createSalesOrder = async (values) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/sales_order`,
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

export const editSalesOrder = async (values, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/sales_order/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const deleteSalesOrder = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/sales_order/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return data;
};

export const getLatestSalesOrders = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/sales_order/latest`
  );
  const data = await response.json();

  return data;
};

export const countSalesOrders = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/sales_order/count`
  );
  const data = await response.json();

  return data;
};
