import db from "../database/db.js";

export const getSystemLogs = async (req, res) => {
  try {
    const query = await db.query(`
      SELECT
        id,
        event_type,
        event_time,
        table_name,
        record_id
      FROM system_log
      ORDER BY id DESC, event_time DESC
      LIMIT 10
      `);

    const systemLogs = query.rows;

    if (systemLogs.length === 0) {
      throw new Error("No se encontraron eventos de sistema.");
    }

    return res.status(200).json({
      ok: true,
      message: "Información de eventos de sistema obtenida correctamente.",
      systemLogs: systemLogs,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "No se encontraron eventos de sistema.") {
      return res.status(400).json({
        ok: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      ok: false,
      message: "Algo ha ido mal. Vuelva a intentarlo más tarde.",
    });
  }
};
