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
    try {
      const response = await axios.get(API_URL);
      const dataWithIds = response.data.map((item: any, index: number) => ({
        ...item,
        rowId: index + 1,
      }));
      setData(dataWithIds);
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
      const response = await axios.post(API_URL, newRow, {
        headers: { "Content-Type": "application/json" },
      });
      setData((prevData) => [...prevData, response.data]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const editRow = async (id: number, updatedRow: T) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedRow, {
        headers: { "Content-Type": "application/json" },
      });
      setData((prevData) =>
        prevData.map((row) => (row.rowId === id ? { ...row, ...updatedRow } : row))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteRow = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setData((prevData) => prevData.filter((row) => row.rowId !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { data, addRow, editRow, deleteRow, loading, error };
};

export default useTableData;
