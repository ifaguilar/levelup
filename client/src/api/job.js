export const getJobs = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/job`);
  const data = await response.json();

  return data;
};

export const getJobById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/job/${id}`
  );
  const data = await response.json();

  return data;
};

export const createJob = async (values) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data = await response.json();

  return data;
};

export const editJob = async (values, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/job/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const deleteJob = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/job/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return data;
};
