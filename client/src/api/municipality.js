export const getMunicipalities = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/municipality/`
  );
  const data = await response.json();

  return data;
};

export const getMunicipalitiesByDepartmentId = async (departmentId) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_API_BASE_URL
    }api/municipality/department/${departmentId}`
  );
  const data = await response.json();

  return data;
};
