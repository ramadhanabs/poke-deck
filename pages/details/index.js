/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarMobile from '../../components/navbar/mobile';
import PokemonCard from '../../components/card/Pokemon';
import Skeleton from '../../components/skeleton/PokemonList';

const endpoint = 'https://pokeapi.co/api/v2/pokemon';
const urlLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/538px-International_Pok%C3%A9mon_logo.svg.png';

function index() {
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);

  const loadMore = () => {
    setOffset(offset + limit);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${endpoint}?offset=${offset}&limit=${limit}`);
        const result = await response.json();
        setPokemon([...pokemon, ...result.results]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset]);
  return (
    <div className="h-screen">
      <div className="container h-screen px-5 max-w-screen-sm mx-auto">
        <div className="flex flex-row justify-center border-b border-gray-100 py-5">
          <Image src={urlLogo} alt="pokemon-logo" width={110} height={40} />
        </div>
        <div className="mt-7 mb-2 max-w-screen-sm mx-auto">
          <p className="font-bold text-gray-600 text-xl text-center">Pokemon List</p>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-5">
          { !loading && pokemon.map((item) => <PokemonCard name={item.name} key={item.name} />)}
          {loading && [1, 2, 3, 4, 5, 6].map((index) => <Skeleton key={index} />) }
        </div>
        <div className="flex pt-5 pb-28">
          <button onClick={loadMore} type="button" className="px-5 py-3 bg-blue-300 hover:bg-blue-400 transition ease-in-out rounded-lg shadow-smooth text-white mx-auto">Load more</button>
        </div>
        <div className="fixed bottom-3 w-full max-w-screen-sm">
          <NavbarMobile active="pokemon-list" />
        </div>
      </div>
    </div>
  );
}

export default index;
