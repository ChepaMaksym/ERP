import React, {useState, useEffect  } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";
import { BaseTable, EditableRow } from "../types";
import useTableData from "../hooks/useTableData";

const EditableCell = ({
  value,
  isEditing,
  onChange,
  column,
  rowId,
}: {
  value: any;
  isEditing: boolean;
  onChange: (rowId: number, field: string, value: any) => void;
  column: string;
  rowId: number;
}) => {
  return (
    <TableCell key={`${rowId}-${column}`}>
      {isEditing ? (
        <TextField
          value={value ?? ""}
          onChange={(e) => onChange(rowId, column, e.target.value)}
          fullWidth
        />
      ) : (
        <span>{value !== undefined ? String(value) : ""}</span>
      )}
    </TableCell>
  );
};

const ActionButtons = ({
  row,
  primaryKey,
  isEditing,
  onEditClick,
  onDeleteClick,
  onSaveClick,
  onCancelClick,
}: {
  row: EditableRow;
  primaryKey: string;
  isEditing: boolean;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
  onSaveClick: (id: number) => void;
  onCancelClick: (id: number) => void;
}) => (
  <TableCell>
    {isEditing  ? (
      <>
        <Button onClick={() => onSaveClick(row[primaryKey])}>Save</Button>
        <Button onClick={() => onCancelClick(row[primaryKey])}>Cancel</Button>
      </>
    ) : (
      <>
        <Button onClick={() => onEditClick(row[primaryKey])}>Edit</Button>
        <Button onClick={() => onDeleteClick(row[primaryKey])}>Delete</Button>
      </>
    )}
  </TableCell>
);

function Grid<T extends BaseTable>({
  tableData,
  primaryKey,
}: {
  tableData: ReturnType<typeof useTableData<T>>;
  primaryKey: keyof T;
}) {
  const { data, loading, editRow, deleteRow, error } = tableData;
  const [rows, setRows] = useState<EditableRow[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setRows(data.map((row) => ({ ...row, isEditing: false })));
    }
  }, [data]);

  const getColumns = (row: EditableRow) => {
    return row ? Object.keys(row).filter((key) => key !== "isEditing") : [];
  };

  const handleEditChange = (rowId: number, field: string, value: any) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row[primaryKey] === rowId ? { ...row, [field]: value } : row
      )
    );
  };  

  const handleEdit = (rowId: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row[primaryKey] === rowId ? { ...row, isEditing: true } : row
      )
    );
  };

  const handleSave = async (rowId: number) => {
    const rowToSave = rows.find((row) => row[primaryKey] === rowId);
    if (rowToSave) {
      await editRow(rowId, rowToSave);
    }
  };

  const handleCancel = (rowId: number) => {
    setRows((prevRows) => 
      prevRows.map((row) => 
        row[primaryKey] === rowId 
          ? { ...data.find(d => d[primaryKey] === rowId)!, isEditing: false } 
          : row
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if(data.length == 0)
    return <div>No data</div>; 
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            {rows[0] &&
              getColumns(rows[0]).map((column) => (
                <TableCell key={column}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </TableCell>
              ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const rowKey = row[primaryKey];
            return (
            <TableRow key={String(rowKey)}>
              <TableCell>{index + 1}</TableCell>
              {getColumns(row).map((column) => (
                <EditableCell
                  key={`$${String(rowKey)}-${column}`}
                  value={row[column as keyof EditableRow]}
                  isEditing={row.isEditing}
                  onChange={handleEditChange}
                  column={column}
                  rowId={rowKey as number}
                />
              ))}
              <ActionButtons
                row={row}
                primaryKey={primaryKey}
                isEditing={row.isEditing}
                onEditClick={handleEdit}
                onDeleteClick={deleteRow}
                onSaveClick={handleSave}
                onCancelClick={handleCancel}
              />
            </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Grid;
