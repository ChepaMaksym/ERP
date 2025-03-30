import axios from "axios";

// Типізація для Harvest
export interface Harvest {
  harvestId: number;
  plantId: number;
  date: string; // Зберігаємо дату у вигляді рядка
  quantityKg: number;
  averageWeightPerItem: number;
  numberItems: number;
}

// Типізація для DTO
export interface AddHarvestDTO {
  plantId: number;
  date: string;
  quantityKg: number;
  averageWeightPerItem: number;
  numberItems: number;
}

export interface UpdateHarvestDTO extends AddHarvestDTO {
  harvestId: number;
}

// Базовий URL для API
const BASE_URL = "https://localhost:44378/api/harvest";

// Отримання списку
export const fetchHarvests = async (): Promise<Harvest[]> => {
  try {
    const response = await axios.get<Harvest[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching harvests", error);
    throw error;
  }
};

// Створення нового запису
export const createHarvest = async (newHarvest: AddHarvestDTO): Promise<Harvest> => {
  try {
    const response = await axios.post<Harvest>(BASE_URL, newHarvest);
    return response.data;
  } catch (error) {
    console.error("Error creating harvest", error);
    throw error;
  }
};

// Оновлення існуючого запису
export const updateHarvest = async (updatedHarvest: UpdateHarvestDTO): Promise<Harvest> => {
  try {
    const response = await axios.put<Harvest>(`${BASE_URL}/${updatedHarvest.harvestId}`, updatedHarvest);
    return response.data;
  } catch (error) {
    console.error("Error updating harvest", error);
    throw error;
  }
};

// Видалення запису
export const deleteHarvest = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting harvest", error);
    throw error;
  }
};
