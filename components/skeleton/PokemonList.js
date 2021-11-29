import React from 'react';

const PokemonList = () => (
  <div className="w-full px-3 py-3 rounded-2xl border-1 bg-gray-100">
    <div className="grid grid-cols-2 gap-2">
      <div>
        <div className="h-3 bg-gray-300  rounded-lg animate-pulse mb-2" />
        <div className="grid grid-cols-2 gap-1">
          <div className="h-3 bg-gray-300  rounded-lg animate-pulse mb-2" />
          <div className="h-3 bg-gray-300  rounded-lg animate-pulse mb-2" />
        </div>
      </div>
      <div className="h-24  bg-gray-300  rounded-lg animate-pulse" />
    </div>
    <div className="grid grid-cols-1 mt-3">
      <div className="h-6 bg-gray-300 rounded-lg animate-pulse" />
    </div>
  </div>
);

export default PokemonList;
