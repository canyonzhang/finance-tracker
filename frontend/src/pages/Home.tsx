import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">📊 Finance Tracker</h1>
        <p className="text-gray-600 mb-6">Track your spending, income, and trends by month.</p>
        <Link
          to="/sheet"
          className="bg-blue-600 text-black px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition"
        >
          View Monthly Breakdown
        </Link>
      </div>
    );
  };
  
  export default Home;