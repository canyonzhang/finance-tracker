import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-black shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:opacity-90">
          📊 Finance Tracker
        </Link>
        <div className="flex space-x-4">
          <NavItem to="/sheet" label="View Monthly Breakdown" />
          {/* Add future tabs here */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;