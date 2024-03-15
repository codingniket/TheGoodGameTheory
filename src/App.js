import './App.css';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokemon from './components/Pokemon';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:name" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
