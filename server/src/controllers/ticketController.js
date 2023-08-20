import db from "../database/db.js";

export const getTickets = async (req, res) => {};

export const getTicketById = async (req, res) => {};

export const createTicket = async (req, res) => {};

export const editTicket = async (req, res) => {};

export const deleteTicket = async (req, res) => {};

export const countTickets = async (req, res) => {
  try {
    const query = await db.query(
      `
      SELECT COUNT(*)
      FROM ticket
      JOIN ticket_status ON ticket.ticket_status_id = ticket_status.id
      WHERE ticket_status.status_name = 'Open'
      `
    );

    const ticketCount = parseInt(query.rows[0].count);

    return res.status(200).json({
      ok: true,
      message: "Cantidad de tickets obtenida correctamente.",
      ticketCount: ticketCount,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
