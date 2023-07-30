export const getTeams = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/team`);
  const data = await response.json();

  return data;
};

export const getTeamById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/team/${id}`
  );
  const data = await response.json();

  return data;
};

export const createTeam = async (values) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/team`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data = await response.json();

  return data;
};

export const editTeam = async (values, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/team/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const deleteTeam = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/team/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return data;
};
