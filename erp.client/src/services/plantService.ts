import axios from "axios";

const API_BASE_URL = "https://localhost:44378/api/plant";

export interface Plant {
    plantId: number;
    seedId: number;
    potId: number | null;
    plotId: number | null;
    plantingDate: string;
    transplantDate?: string | null;
    harvestDate?: string | null;
}
export interface AddPlantDTO {
    seedId: number;
    potId: number;
    plotId: number;
    plantingDate: string;
    transplantDate?: string | null;
    harvestDate?: string | null;
}
export interface UpdatePlantDTO extends AddPlantDTO {
    plantId: number;
}
// Отримати всі рослини
export const fetchPlants = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Отримати одну рослину за ID
export const fetchPlantById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Додати нову рослину
export const createPlant = async (newPlant: AddPlantDTO): Promise<Plant> => {
  try {
    const response = await axios.post<Plant>(API_BASE_URL, newPlant);
    return response.data;
  } catch (error) {
    console.error("Error creating plant", error);
    throw error;
  }
};

// Оновити рослину
export const updatePlant = async (id: number, plant: UpdatePlantDTO) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, plant);
  return response.data;
};

// Видалити рослину
export const deletePlant = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
