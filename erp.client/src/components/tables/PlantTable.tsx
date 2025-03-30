import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import {
  fetchPlants,
  createPlant,
  updatePlant,
  deletePlant,
  Plant,
  AddPlantDTO,
  UpdatePlantDTO,
} from "../../services/plantService";

const PlantTable: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [newPlant, setNewPlant] = useState<AddPlantDTO>({
    seedId: 0,
    potId: 0,
    plotId: 0,
    plantingDate: "",
    transplantDate: null,
    harvestDate: null,
  });

  useEffect(() => {
    const loadPlants = async () => {
      const data = await fetchPlants();
      setPlants(data);
    };

    loadPlants();
  }, []);

  const handleAddPlant = async () => {
    const createdPlant = await createPlant(newPlant);
    setPlants([...plants, createdPlant]);
    setNewPlant({
      seedId: 0,
      potId: 0,
      plotId: 0,
      plantingDate: "",
      transplantDate: null,
      harvestDate: null,
    });
  };

  const handleUpdatePlant = async (updatedPlant: UpdatePlantDTO) => {
    const updated = await updatePlant(updatedPlant.plantId,updatedPlant);
    setPlants((prev) =>
      prev.map((plant) =>
        plant.plantId === updated.plantId ? updated : plant
      )
    );
  };

  const handleDeletePlant = async (id: number) => {
    await deletePlant(id);
    setPlants(plants.filter((plant) => plant.plantId !== id));
  };

  return (
    <div>
      <h1>Plant Management</h1>

      <TextField
        label="Seed ID"
        type="number"
        value={newPlant.seedId}
        onChange={(e) =>
          setNewPlant({ ...newPlant, seedId: parseInt(e.target.value) })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Pot ID"
        type="number"
        value={newPlant.potId}
        onChange={(e) =>
          setNewPlant({ ...newPlant, potId: parseInt(e.target.value) })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Plot ID"
        type="number"
        value={newPlant.plotId}
        onChange={(e) =>
          setNewPlant({ ...newPlant, plotId: parseInt(e.target.value) })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Planting Date"
        type="date"
        value={newPlant.plantingDate}
        onChange={(e) =>
          setNewPlant({ ...newPlant, plantingDate: e.target.value })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Transplant Date"
        type="date"
        value={newPlant.transplantDate || ""}
        onChange={(e) =>
          setNewPlant({
            ...newPlant,
            transplantDate: e.target.value || null,
          })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Harvest Date"
        type="date"
        value={newPlant.harvestDate || ""}
        onChange={(e) =>
          setNewPlant({
            ...newPlant,
            harvestDate: e.target.value || null,
          })
        }
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddPlant}>
        Add Plant
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Seed ID</TableCell>
              <TableCell>Pot ID</TableCell>
              <TableCell>Plot ID</TableCell>
              <TableCell>Planting Date</TableCell>
              <TableCell>Transplant Date</TableCell>
              <TableCell>Harvest Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plants.map((plant) => (
              <TableRow key={plant.plantId}>
                <TableCell>{plant.plantId}</TableCell>
                <TableCell>{plant.seedId}</TableCell>
                <TableCell>{plant.potId || "-"}</TableCell>
                <TableCell>{plant.plotId || "-"}</TableCell>
                <TableCell>{plant.plantingDate}</TableCell>
                <TableCell>{plant.transplantDate || "-"}</TableCell>
                <TableCell>{plant.harvestDate || "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeletePlant(plant.plantId)}
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

export default PlantTable;
