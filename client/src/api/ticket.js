export const getTickets = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/ticket`
  );
  const data = await response.json();

  return data;
};

export const getTicketById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/ticket/${id}`
  );
  const data = await response.json();

  return data;
};

export const createTicket = async (values) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/ticket`,
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

export const editTicket = async (values, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/ticket/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();

  return data;
};

export const deleteTicket = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/ticket/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  return data;
};

export const countTickets = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}api/ticket/count`
  );
  const data = await response.json();

  return data;
};
