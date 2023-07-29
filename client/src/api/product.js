export const countProducts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/product/count`
  );
  const data = await response.json();

  return data;
};
