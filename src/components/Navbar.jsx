import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="flex items-center">
          <Link to="/">
            <span className="text-white text-xl font-bold">Pokémon</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
