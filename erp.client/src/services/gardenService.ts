import axios from "axios";

// Типізація для Garden
export interface Garden {
  gardenId: number;
  size: number;
}

// URL для API
const BASE_URL = "https://localhost:44378/api/garden";

// Функція для отримання списку садів
export const fetchGardens = async (): Promise<Garden[]> => {
  try {
    const response = await axios.get<Garden[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching gardens", error);
    throw error;
  }
};

// Функція для створення нового саду
export const createGarden = async (newGarden: Omit<Garden, "gardenId">): Promise<Garden> => {
  try {
    const response = await axios.post<Garden>(BASE_URL, newGarden);
    return response.data;
  } catch (error) {
    console.error("Error creating garden", error);
    throw error;
  }
};

// Функція для оновлення існуючого саду
export const updateGarden = async (id: number, updatedGarden: Garden): Promise<Garden> => {
  try {
    const response = await axios.put<Garden>(`${BASE_URL}/${id}`, updatedGarden);
    return response.data;
  } catch (error) {
    console.error("Error updating garden", error);
    throw error;
  }
};

// Функція для видалення саду
export const deleteGarden = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting garden", error);
    throw error;
  }
};
