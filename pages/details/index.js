/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import NavbarMobile from '../../components/navbar/mobile.js';
import PokemonCard from '../../components/card/Pokemon.js';

const endpoint = 'https://pokeapi.co/api/v2/pokemon';
const urlLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/538px-International_Pok%C3%A9mon_logo.svg.png';

function index() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState('0');
  const [limit, setLimit] = useState('100');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${endpoint}?offset=${offset}&limit=${limit}`);
        const result = await response.json();
        console.log(result);
        setPokemon(result.results);
        console.log(pokemon);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="h-screen">
      <div className="container h-screen px-5">
        <div className="flex flex-row justify-center border-b border-gray-100 py-5">
          <img src={urlLogo} alt="pokemon-logo" className="w-28" />
        </div>
        <div className="grid grid-cols-2 gap-2 pt-5 pb-28">
          {pokemon.map((item) => <PokemonCard name={item.name} key={item.name} />)}
        </div>
      </div>
      <div className="fixed bottom-3 w-full">
        <NavbarMobile />
      </div>
    </div>
  );
}

export default index;
