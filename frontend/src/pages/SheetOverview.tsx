import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SheetOverview: React.FC = () => {
  const [sheetData, setSheetData] = useState<{ [key: string]: any[][] }>({});

  // useEffect triggers once on component render, and whenever a dependency changes
  useEffect(() => {
    fetch("/api/sheet")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setSheetData(data))
      .catch((err) => console.error("Error loading sheet data", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-3xl font-bold text-primary hover:underline block mb-4">
        📊 Finance Tracker
      </Link>
      <h2 className="text-xl font-semibold mb-4">Select a Month</h2>
      <ul className="grid grid-cols-2 gap-4">
        {Object.entries(sheetData).map(([month]) => (
          <li key={month}>
            <Link
              to={`/sheet/${month}`}
              className="block bg-white shadow-md rounded-xl p-4 text-center text-lg text-primary hover:bg-blue-100 hover:scale-105 transition duration-200"
            >
              {month}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SheetOverview;

