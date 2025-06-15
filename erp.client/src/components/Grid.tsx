import React, {useState, useEffect  } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { BaseTable, EditableRow } from "../types";
import useTableData from "../hooks/useTableData";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const EditableCell = ({
  value,
  isEditing,
  onChange,
  column,
  rowId,
  lookups,
  dateFields,
}: {
  value: any;
  isEditing: boolean;
  onChange: (rowId: number, field: string, value: any) => void;
  column: string;
  rowId: number;
  lookups?: Record<string, { id: number | string; label: string }[]>;
  dateFields?: string[];
}) => {
  const isDateField = dateFields?.some(
    (f) => f.toLowerCase() === column.toLowerCase()
  );

  const lookupOptions = Object.entries(lookups || {}).find(
    ([key]) => key.toLowerCase() === column.toLowerCase()
  )?.[1];
  const formattedDate =
    isDateField && value ? dayjs(value).format("YYYY-MM-DD") : value ?? "";
  const dateValue: Dayjs | null = isDateField && value ? dayjs(value) : null;
  return (
    <TableCell key={`${rowId}-${column}`}>
      {isEditing ? (
        lookupOptions ? (
          <Select
            value={value ?? ""}
            fullWidth
            onChange={(e: SelectChangeEvent) =>
              onChange(rowId, column, e.target.value)
            }
          >
            {lookupOptions.map((option) => (
              <MenuItem key={option.id} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        ) : isDateField ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dateValue}
              onChange={(newValue) => {
                onChange(rowId, column, newValue ? newValue.toISOString() : null);
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        ) : (
          <TextField
            value={formattedDate}
            onChange={(e) => onChange(rowId, column, e.target.value)}
            fullWidth
            type="text"
          />
        )
      ) : (
        <span>{formattedDate}</span>
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
  isReadOnly = false,
}: {
  tableData: ReturnType<typeof useTableData<T>>;
  primaryKey?: keyof T;
  isReadOnly?: boolean;
}) {
  const { data, loading, editRow, deleteRow, error, lookups, dateFields } = tableData;
  const [rows, setRows] = useState<EditableRow[]>([]);
  const [open, setOpen] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorText(error || "Помилка збереження");
      setOpen(true);
    }
    else 
      setOpen(false);
  }, [error]);

  const handleClose = () => {
    setOpen(false);
    setErrorText(null);
  };

 useEffect(() => {
    if (data && data.length > 0) {
      const newData = data.map((item) => {
        const newItem = { ...item };

        Object.entries(lookups).forEach(([lookupKey, lookupArray]) => {
          if (Array.isArray(lookupArray)) {
            const lookupMap = new Map<number | string, string>();
            lookupArray.forEach(({ id, label }: { id: number | string; label: string }) => {
              lookupMap.set(id, label);
            });

            const matchingKey = Object.keys(newItem).find(
              (key) => key.toLowerCase() === lookupKey.toLowerCase()
            );

            if (matchingKey) {
              const originalValue = newItem[matchingKey];
              newItem[matchingKey] = lookupMap.get(originalValue) ?? originalValue;
            }
          }
        });

        dateFields?.forEach((dateField) => {
          const key = Object.keys(newItem).find(
            (k) => k.toLowerCase() === dateField.toLowerCase()
          );
          if (key && newItem[key]) {
            newItem[key] = dayjs(newItem[key]).format("YYYY-MM-DD");
          }
        });

        return newItem;
      });
      if(newData.length === 1)
        setRows(newData.map((row) => ({ ...row, isEditing: newData[0].isEditing })));
      else
        setRows(newData.map((row) => ({ ...row, isEditing: false })));
    }
  }, [data]);

  const getColumns = (row: EditableRow) => {
    return row ? Object.keys(row).filter((key) => key !== "isEditing" &&  key !== primaryKey) : [];
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
    if (!rowToSave) return;
    const transformedRow: EditableRow = { ...rowToSave };
    Object.entries(lookups).forEach(([lookupKey, lookupArray]) => {
      const matchingKey = Object.keys(rowToSave).find(
        (key) => key.toLowerCase() === lookupKey.toLowerCase()
      );

      if (matchingKey && Array.isArray(lookupArray)) {
        const option = lookupArray.find((item) => item.label === rowToSave[matchingKey]);
        if (option) {
          transformedRow[matchingKey] = option.id;
        }
      }
    });
    if (rowId < 0) {
      await tableData.addRow(transformedRow);
    } else {
      await editRow(rowId, transformedRow);
    }
  };

  const handleCancel = (rowId: number) => {
    if (rowId < 0) {
      setRows((prevRows) => prevRows.filter((row) => row[primaryKey] !== rowId));
    } else {
      setRows((prevRows) => 
        prevRows.map((row) => 
          row[primaryKey] === rowId 
            ? { ...data.find(d => d[primaryKey] === rowId)!, isEditing: false } 
            : row
        )
      );
    }
  };

  const handleAddNewRow = () => {
    let columns: string[] = [];
    if (rows.length > 0) {
      columns = getColumns(rows[0]);
    } else if (data && data.length > 0) {
      columns = Object.keys(data[0]).filter(
        (k) => k !== "isEditing" && k !== primaryKey
      );
    } else if (lookups && Object.keys(lookups).length > 0) {
      columns = Object.keys(lookups);
    } else {
      columns = [];
    }

    const emptyRow: EditableRow = getColumns(rows[0]).reduce((acc, key) => {
      acc[key] = lookups?.[0]?.label ?? "";
      return acc;
    }, {} as EditableRow);

    emptyRow.isEditing = true;
    emptyRow[primaryKey] = -Date.now() as any;

    setRows((prev) => [emptyRow, ...prev]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if(!data)
    return <div>No data</div>; 
  return (
  <>
    {!isReadOnly && (
      <Button onClick={handleAddNewRow} variant="contained" style={{ marginBottom: 10 }}>
       Add
      </Button>
    )}
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
              {!isReadOnly && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const rowKey = primaryKey ? row[primaryKey] : index;
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
                    lookups={lookups}
                    dateFields={dateFields}
                  />
                ))}
                {!isReadOnly && (
                  <ActionButtons
                    row={row}
                    primaryKey={primaryKey}
                    isEditing={row.isEditing}
                    onEditClick={handleEdit}
                    onDeleteClick={deleteRow}
                    onSaveClick={handleSave}
                    onCancelClick={handleCancel}
                  />
                )}
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Помилка</DialogTitle>
        <DialogContent>{errorText}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Закрити
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Grid;
