// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import FormSection from './components/FormSection';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormSection />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
