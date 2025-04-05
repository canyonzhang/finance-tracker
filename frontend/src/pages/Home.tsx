import React from "react";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Track your spending, income, and trends by month.
        </h2>
      </div>
    </div>
  );
};

export default Home;