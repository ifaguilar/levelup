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
