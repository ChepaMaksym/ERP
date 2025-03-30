import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import { fetchHarvests, Harvest } from '../../services/harvestService';
import { fetchPlants, Plant } from '../../services/plantService';

// Підключення необхідних модулів Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HarvestPlantChart = () => {
  const [harvestData, setHarvestData] = useState<Harvest[]>([]);
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Завантаження даних з обох сервісів
    const loadData = async () => {
      try {
        const harvests = await fetchHarvests();
        const plants = await fetchPlants();
        setHarvestData(harvests);
        setPlantData(plants);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Підготовка даних для графіку
  const harvestLabels = harvestData.map((harvest: any) => harvest.date);
  const harvestQuantities = harvestData.map((harvest: any) => harvest.quantityKg);
  const plantLabels = plantData.map((plant: any) => plant.plantingDate);
  const plantCounts = plantData.map((plant: any) => plant.plantId); // або інша метрика для рослин

  const data = {
    labels: harvestLabels,
    datasets: [
      {
        label: 'Harvest Quantity (kg)',
        data: harvestQuantities,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Plant Count',
        data: plantCounts,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>Harvest and Plant Analytics</h2>
      <div style={{ width: '100%', height: '600px' }}>
        <Line data={data} />
      </div>
    </div>
  );
};

export default HarvestPlantChart;