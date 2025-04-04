import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SheetOverview from './pages/SheetOverview';
import SheetMonth from './pages/SheetMonth';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sheet" element={<SheetOverview />} />
        <Route path="/sheet/:month" element={<SheetMonth />} />
      </Routes>
    </Router>
  );
};

export default App;
