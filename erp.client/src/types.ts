export interface BaseTable {
    rowId: number;
  }
  
export interface GardenGrid extends BaseTable {
  GardenId: number;
  Size: number;
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
