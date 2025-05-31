export interface BaseTable {

}
export interface EditableRow extends BaseTable {
  isEditing: boolean;
}


export interface UseTableData<T extends BaseTable> {
  data: T[];
  addRow: (newRow: T) => void;
  editRow: (id: number, updatedRow: T) => void;
  deleteRow: (id: number) => void;
  loading: boolean;
  error: string | null;
}
