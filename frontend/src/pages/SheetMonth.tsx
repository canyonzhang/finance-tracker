import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SheetMonth: React.FC = () => {
  const { month } = useParams<{ month: string }>();
  const [monthData, setMonthData] = useState<string[][]>([]);

  useEffect(() => {
    fetch(`/api/sheet/${month}`)
      .then((res) => res.json())
      .then((data) => setMonthData(data.data || []));
  }, [month]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-3xl font-bold text-primary hover:underline block mb-4">
        📊 Finance Tracker
      </Link>
      <Link to="/sheet" className="text-sm text-secondary hover:underline mb-2 block">← Back to Overview</Link>
      <h2 className="text-2xl font-semibold mb-4">{month} Breakdown</h2>

      {monthData.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow border border-primary">
          <table className="min-w-full divide-y divide-primary">
            <thead className="bg-primary text-white">
              <tr>
                {monthData[0].map((header, idx) => (
                  <th key={idx} className="px-4 py-2 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-secondary/10 transition transform hover:scale-[1.01] duration-200 ease-in-out">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data found for {month}.</p>
      )}
    </div>
  );
};

export default SheetMonth;
