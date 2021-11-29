/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavbarMobile from '../../components/navbar/mobile.js';
import PokemonCard from '../../components/card/Pokemon.js';
import Skeleton from '../../components/skeleton/PokemonList.js';

const endpoint = 'https://pokeapi.co/api/v2/type';
const urlLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/538px-International_Pok%C3%A9mon_logo.svg.png';

const TypePokemon = () => {
  const router = useRouter();
  const { id } = router.query;

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`${endpoint}/${id}`);
        const result = await response.json();
        console.log(result.pokemon);
        setPokemons(result.pokemon);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="h-screen">
      <div className="container h-screen px-5 max-w-screen-sm mx-auto">
        <div className="flex flex-row justify-center border-b border-gray-100 py-5">
          <img src={urlLogo} alt="pokemon-logo" className="w-28" />
        </div>
        <div className="mt-7 mb-2 max-w-screen-sm mx-auto">
          <p className="font-bold text-gray-600 text-xl text-center">Pokemon List</p>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-5 pb-28">
          { !loading && pokemons.map((item) => <PokemonCard name={item.pokemon.name} key={item.pokemon.name} />)}
          {loading && [1, 2, 3, 4, 5, 6].map((index) => <Skeleton key={index} />) }
        </div>
        <div className="fixed bottom-3 w-full max-w-screen-sm">
          <NavbarMobile active="pokemon-list" />
        </div>
      </div>
    </div>
  );
};

export default TypePokemon;
