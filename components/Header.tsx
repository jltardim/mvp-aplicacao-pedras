import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 md:px-8">
        <h1 className="text-3xl font-bold text-gray-800">Visualizador de Pedras</h1>
        <p className="text-gray-500 mt-1">Veja como a pedra dos seus sonhos fica no seu ambiente.</p>
      </div>
    </header>
  );
};

export default Header;