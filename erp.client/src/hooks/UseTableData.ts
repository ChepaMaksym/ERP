import { useState, useEffect } from "react";
import axios from "axios";
import { BaseTable, EditableRow } from "../types"; 

const useTableData = <T extends EditableRow>(endpoint: string) => {
  const API_URL = `https://localhost:44378/api/${endpoint}`;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
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
      setError(err.message || "Add row error");
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
      setError(err.message || "Edit row error");
    } finally {
      setLoading(false);
    }
  };

  const deleteRow = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchData();
    } catch (err: any) {
      setError(err.message || "Delete row error");
    } finally {
      setLoading(false);
    }
  };

  return { data, addRow, editRow, deleteRow, loading, error };
};

export default useTableData;
