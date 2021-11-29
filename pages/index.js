/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import NavbarMobile from '../components/navbar/mobile';
import PokemonCard from '../components/card/Type';

const endpoint = 'https://pokeapi.co/api/v2/type';
const urlLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/538px-International_Pok%C3%A9mon_logo.svg.png';

const index = () => {
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${endpoint}`);
        const result = await response.json();
        setTypes(result.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <div className="container h-screen px-5 max-w-screen-sm mx-auto">
        <div className="flex flex-row justify-center border-b border-gray-100 py-5">
          <img src={urlLogo} alt="pokemon-logo" className="w-28" />
        </div>
        <div className="mt-5 mb-2 max-w-screen-sm mx-auto">
          <p className="font-bold text-gray-600 text-xl text-center">Welcome to Pokedeck</p>
        </div>
        <div className="flex flex-row my-5 justify-center">
          <input onChange={(event) => setSearch(event.target.value)} type="text" className="bg-white border rounded-l-xl border-gray-300 border-r-0 w-full py-2 px-3" placeholder="Search pokemon by name here" />
          <Link href={`/details/${search}`}>
            <button type="button" className="bg-gray-100 hover:bg-gray-200 transition rounded-r-xl py-2 px-3 text-gray-900">
              <div>
                <FontAwesomeIcon icon={faSearch} className="mx-auto" size="lg" />
              </div>
            </button>
          </Link>
        </div>
        <div className="mt-5 mb-2 max-w-screen-sm mx-auto">
          <p className="font-bold text-gray-600 text-xl text-center">Choose type of pokemon</p>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-5 pb-28">
          {types.map((item) => <PokemonCard item={item} key={item.name} />)}
        </div>
        <div className="fixed bottom-3 w-full max-w-screen-sm">
          <NavbarMobile active="home" />
        </div>
      </div>
    </div>
  );
};
export default index;
