import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-blue-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Cricket Scoring</h1>
        <div>
          <a href="#" className="text-white mx-2 hover:underline">Home</a>
          <a href="#" className="text-white mx-2 hover:underline">Matches</a>
          <a href="#" className="text-white mx-2 hover:underline">Teams</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
