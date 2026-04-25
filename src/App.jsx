import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DiscoveryPage from './pages/DiscoveryPage';
import SalonDetailPage from './pages/SalonDetailPage';
import ComparePage from './pages/ComparePage';
import QuizPage from './pages/QuizPage';

export default function App() {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (salon) => {
    setCompareList((prev) => {
      if (prev.find((s) => s.id === salon.id)) return prev;
      if (prev.length >= 3) return [...prev.slice(1), salon];
      return [...prev, salon];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <BrowserRouter>
      <Navbar compareCount={compareList.length} />
      <Routes>
        <Route path="/" element={<HomePage addToCompare={addToCompare} compareList={compareList} />} />
        <Route
          path="/discover"
          element={<DiscoveryPage addToCompare={addToCompare} compareList={compareList} />}
        />
        <Route
          path="/salon/:id"
          element={<SalonDetailPage addToCompare={addToCompare} compareList={compareList} />}
        />
        <Route
          path="/compare"
          element={<ComparePage compareList={compareList} removeFromCompare={removeFromCompare} />}
        />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}
