import React from "react";

// Components
import IconButton from "./IconButton";
import Icon from "./Icon";

const Table = ({ headers, rows, onEdit, onDelete }) => {
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {headers.map((header) => (
                <td key={`${row.id}-${header.id}`}>{row[header.id]}</td>
              ))}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
