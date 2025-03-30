import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";
import { fetchGardens, createGarden, updateGarden, deleteGarden, Garden } from "../../services/gardenService";

// Компонент таблиці
const GardenTable: React.FC = () => {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [newGarden, setNewGarden] = useState<Omit<Garden, "gardenId">>({ size: 0 });

  // Завантаження даних при завантаженні компоненту
  useEffect(() => {
    const loadGardens = async () => {
      const data = await fetchGardens();
      setGardens(data);
    };

    loadGardens();
  }, []);

  // Додавання нового саду
  const handleAddGarden = async () => {
    const createdGarden = await createGarden(newGarden);
    setGardens([...gardens, createdGarden]);
    setNewGarden({ size: 0 }); // Очищення полів форми
  };

  // Оновлення саду
  const handleUpdateGarden = async (id: number, updatedGarden: Garden) => {
    const updated = await updateGarden(id, updatedGarden);
    setGardens((prev) =>
      prev.map((garden) =>
        garden.gardenId === id ? { ...garden, size: updated.size } : garden
      )
    );
  };

  // Видалення саду
  const handleDeleteGarden = async (id: number) => {
    await deleteGarden(id);
    setGardens(gardens.filter((garden) => garden.gardenId !== id));
  };

  return (
    <div>
      <h1>Garden Management</h1>

      {/* Форма для додавання нового саду */}
      <TextField
        label="Garden Size"
        type="number"
        value={newGarden.size}
        onChange={(e) => setNewGarden({ ...newGarden, size: parseFloat(e.target.value) })}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddGarden}>
        Add Garden
      </Button>

      {/* Таблиця для відображення садів */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Garden ID</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gardens.map((garden) => (
              <TableRow key={garden.gardenId}>
                <TableCell>{garden.gardenId}</TableCell>
                <TableCell>
                  <TextField
                    value={garden.size}
                    onChange={(e) =>
                      handleUpdateGarden(garden.gardenId, {
                        ...garden,
                        size: parseFloat(e.target.value),
                      })
                    }
                    type="number"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteGarden(garden.gardenId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GardenTable;
