import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SheetOverview: React.FC = () => {
  const [sheetData, setSheetData] = useState<{ [key: string]: any[][] }>({});

  useEffect(() => {
    fetch("/api/sheet")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setSheetData(data))
      .catch((err) => console.error("Error loading sheet data", err));
  }, []);

  // Split sheets by category
  const templates = Object.entries(sheetData).filter(([name]) =>
    name.toLowerCase().includes("template")
  );
  const months = Object.entries(sheetData).filter(
    ([name]) => !name.toLowerCase().includes("template")
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link to="/" className="text-3xl font-bold text-primary hover:underline block mb-4">
        📊 Finance Tracker
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Templates Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Templates</h2>
          <button className="mb-4 bg-green-300 text-black px-4 py-2 rounded hover:bg-green-200 transition">
            + Add Template
          </button>
          <ul className="grid grid-cols-1 gap-2">
            {templates.map(([template]) => (
              <li key={template}>
                <Link
                  to={`/sheet/${template}`}
                  className="block bg-green-300 hover:bg-green-200 shadow-md rounded-xl p-4 text-center text-lg text-black hover:scale-105 transition duration-200"
                >
                  {template}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Monthly Sheets Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Monthly Sheets</h2>
          <button className="mb-4 bg-blue-400 text-black px-4 py-2 rounded hover:bg-blue-200 transition">
            + Create New Month from Template
          </button>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {months.map(([month]) => (
              <li key={month}>
                <Link
                  to={`/sheet/${month}`}
                  className="block bg-green-300 hover:bg-green-200 shadow-md rounded-xl p-4 text-center text-lg text-black hover:scale-105 transition duration-200"
                >
                  {month}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SheetOverview;
