import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => {

  return (
    <Link
      to={to}
      className="text-black bg-slate-200 px-4 py-2 rounded-md transition transform hover:scale-105 hover:bg-blue-700 hover:text-gray-200 duration-200 ease-in-out"
    >
      {label}
    </Link>
  );
};

export default NavItem;