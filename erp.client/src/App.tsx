import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FieldPage from './pages/FieldPage';
import HarvestPage from './pages/HarvestPage';
import PlantPage from './pages/PlantPage';
import PlotPage from './pages/PlotPage';
import PotPage from './pages/PotPage';
import SoilTypePage from './pages/SoilTypePage';
import WateringPage from './pages/WateringPage';
import AgroAnalyticsPage from './pages/AgroAnalyticsPage';

import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <div className="App" style={{ paddingTop: '64px' }}>
        <Routes>
          <Route path="/" element={<div>Головна сторінка</div>} />
          <Route path="/analytics" element={<AgroAnalyticsPage />} />
          <Route path="/field" element={<FieldPage />} />
          <Route path="/harvest" element={<HarvestPage />} />
          <Route path="/plant" element={<PlantPage />} />
          <Route path="/plot" element={<PlotPage />} />
          <Route path="/pot" element={<PotPage />} />
          <Route path="/soiltype" element={<SoilTypePage />} />
          <Route path="/watering" element={<WateringPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;