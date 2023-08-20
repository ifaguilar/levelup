import React from "react";

// Components
import IconButton from "./IconButton";
import Icon from "./Icon";

// Constants
import { DATE_HEADERS } from "../constants/constants";

// Utils
import { formatDateTime } from "../utils/dateTime";

const Table = ({ headers, rows, onEdit = null, onDelete = null }) => {
  if (rows.length === 0) {
    return <p>No se encontraron datos.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.id}>{header.text}</th>
            ))}
            {onEdit !== null && onDelete !== null ? <th>Acciones</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {headers.map((header) => (
                <td
                  key={`${row.id}-${header.id}`}
                  title={
                    DATE_HEADERS.includes(header.id)
                      ? formatDateTime(row[header.id])
                      : row[header.id]
                  }
                >
                  {DATE_HEADERS.includes(header.id)
                    ? formatDateTime(row[header.id])
                    : row[header.id]}
                </td>
              ))}
              {onEdit !== null && onDelete !== null ? (
                <td>
                  <IconButton
                    className="hover:bg-amber-100 hover:text-amber-500"
                    onClick={() => onEdit(row.id)}
                  >
                    <Icon icon="edit" />
                  </IconButton>
                  <IconButton
                    className="hover:bg-red-100 hover:text-red-500"
                    onClick={() => onDelete(row.id)}
                  >
                    <Icon icon="delete" />
                  </IconButton>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
