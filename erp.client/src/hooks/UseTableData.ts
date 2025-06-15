import { useState, useEffect } from "react";
import axios from "axios";
import { BaseTable, EditableRow } from "../types"; 

type DropdownItemDTO = {
  id: number;
  label: string;
};

type ApiResponse<T> = {
  data: T[];
  lookups?: {
    [key: string]: DropdownItemDTO[];
  };
  dateFields?: string[];
};

const useTableData = <T extends EditableRow>(endpoint: string, emptyTemplate: T) => {
  const API_URL = `https://localhost:44378/api/${endpoint}`;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lookups, setLookups] = useState<{ [key: string]: DropdownItemDTO[] }>({});
  const [dateFields, setDateFields] = useState<string[]>();


  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<ApiResponse<T>>(API_URL);
      const receivedData = response.data.data;
      setData(receivedData && receivedData.length > 0 ? receivedData : [{...emptyTemplate, isEditing: true}]);
      setLookups(response.data.lookups || {});
      setDateFields(response.data.dateFields || null);
    } catch (err: any) {
      setError(err.response.data || "Fetch row error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      setData([]);
      setLoading(false);
      setError(null);
    };
  }, []);

  const addRow = async (newRow: T) => {
    try {
      await axios.post(API_URL, newRow, {
        headers: { "Content-Type": "application/json" },
      });
      await fetchData();
    } catch (err: any) {
      const errors = err.response.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstKey]?.[0];
        setError(firstErrorMessage || "Add row error");
      }
    } finally {
      setLoading(false);
    }
  };

  const editRow = async (id: number, updatedRow: T) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedRow, {
        headers: { "Content-Type": "application/json" },
      });
      await fetchData();
    } catch (err: any) {
      const errors = err.response.data?.errors;
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        const firstErrorMessage = errors[firstKey]?.[0];
        setError(firstErrorMessage || "Edit row error");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteRow = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchData();
    } catch (err: any) {
        setError(err.response.data || "Delete row error");
    } finally {
      setLoading(false);
    }
  };

  return { data, addRow, editRow, deleteRow, loading, error, lookups, dateFields };
};

export default useTableData;
