import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";
import { fetchHarvests, createHarvest, updateHarvest, deleteHarvest, Harvest, AddHarvestDTO, UpdateHarvestDTO } from "../../services/harvestService";

const HarvestTable: React.FC = () => {
    const [harvests, setHarvests] = useState<Harvest[]>([]);
    const [newHarvest, setNewHarvest] = useState<AddHarvestDTO>({
      plantId: 0,
      date: "",
      quantityKg: 0,
      averageWeightPerItem: 0,
      numberItems: 0,
    });
  
    useEffect(() => {
      const loadHarvests = async () => {
        const data = await fetchHarvests();
        setHarvests(data);
      };
  
      loadHarvests();
    }, []);
  
    const handleAddHarvest = async () => {
      const createdHarvest = await createHarvest(newHarvest);
      setHarvests([...harvests, createdHarvest]);
      setNewHarvest({
        plantId: 0,
        date: "",
        quantityKg: 0,
        averageWeightPerItem: 0,
        numberItems: 0,
      });
    };
  
    const handleDeleteHarvest = async (id: number) => {
      await deleteHarvest(id);
      setHarvests(harvests.filter((harvest) => harvest.harvestId !== id));
    };
  
    return (
      <div>
        <h1>Harvest Management</h1>
  
        <TextField
          label="Plant ID"
          type="number"
          value={newHarvest.plantId}
          onChange={(e) =>
            setNewHarvest({ ...newHarvest, plantId: parseInt(e.target.value) })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          value={newHarvest.date}
          onChange={(e) => setNewHarvest({ ...newHarvest, date: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity (kg)"
          type="number"
          value={newHarvest.quantityKg}
          onChange={(e) =>
            setNewHarvest({
              ...newHarvest,
              quantityKg: parseFloat(e.target.value),
            })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Average Weight Per Item"
          type="number"
          value={newHarvest.averageWeightPerItem}
          onChange={(e) =>
            setNewHarvest({
              ...newHarvest,
              averageWeightPerItem: parseFloat(e.target.value),
            })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Number of Items"
          type="number"
          value={newHarvest.numberItems}
          onChange={(e) =>
            setNewHarvest({
              ...newHarvest,
              numberItems: parseInt(e.target.value),
            })
          }
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddHarvest}>
          Add Harvest
        </Button>
  
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Plant ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Quantity (kg)</TableCell>
                <TableCell>Avg. Weight Per Item</TableCell>
                <TableCell>Number of Items</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {harvests.map((harvest) => (
                <TableRow key={harvest.harvestId}>
                  <TableCell>{harvest.harvestId}</TableCell>
                  <TableCell>{harvest.plantId}</TableCell>
                  <TableCell>{harvest.date}</TableCell>
                  <TableCell>{harvest.quantityKg}</TableCell>
                  <TableCell>{harvest.averageWeightPerItem}</TableCell>
                  <TableCell>{harvest.numberItems}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteHarvest(harvest.harvestId)}
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
  
  export default HarvestTable;