import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const endpoint = 'https://pokeapi.co/api/v2/pokemon';

const Pokemon = (props) => {
  const { name } = props;
  const [urlPhoto, setUrl] = useState('');
  const [type, setType] = useState([]);
  const [color, setColor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${endpoint}/${name}`);
        const result = await response.json();
        console.log(result);
        setUrl(result.sprites.front_default);
        setType(result.types.map((item) => item.type.name));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setColor(() => {
      switch (type[0]) {
        case 'grass':
          return 'bg-green-400';
        case 'fire':
          return 'bg-red-400';
        case 'bug':
          return 'bg-yellow-500';
        case 'shadow':
          return 'bg-gray-600';
        case 'electric':
          return 'bg-yellow-300';
        case 'poison':
          return 'bg-indigo-400';
        case 'rock':
          return 'bg-gray-500';
        default:
          return 'bg-blue-400';
      }
    });
  }, [type]);
  return (
    <div className={`w-full px-3 py-3 rounded-2xl shadow-smooth text-white transform ${color}`}>
      <div className="grid grid-cols-2">
        <div>
          <p className="font-bold">{capitalizeFirstLetter(name)}</p>
          {type.map((item) => (
            <div className="w-100 mb-0.5 ml-1 py-0.5 px-2 bg-white bg-opacity-20 rounded-lg inline-block">
              <p className="text-pill">{capitalizeFirstLetter(item)}</p>
            </div>
          ))}
        </div>
        <div>
          <img src={urlPhoto} alt="pokemon" />
        </div>
      </div>
      <div className="grid grid-cols-1 mt-3">
        <Link href={`/details/${name}`}>
          <button type="button" className="bg-gray-700 bg-opacity-10 rounded-lg text-center bold text-xs text-white py-1 hover:bg-opacity-20 transition ease-in-out">Details</button>
        </Link>
      </div>
    </div>
  );
};
export default Pokemon;
