import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SheetOverview from './pages/SheetOverview';
import SheetMonth from './pages/SheetMonth';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-300">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sheet" element={<SheetOverview />} />
          <Route path="/sheet/:month" element={<SheetMonth />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
