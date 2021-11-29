import React, { useState, useEffect } from 'react';
import NavbarMobile from '../../components/navbar/mobile';
import PokemonCard from '../../components/card/MyPokemon';
import { getAllCapturedPokemons } from '../../data/capture-pokemons';

const urlLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/538px-International_Pok%C3%A9mon_logo.svg.png';

function index() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getAllCapturedPokemons();
      setPokemons(data);
    };

    getData();
  }, [pokemons]);

  return (
    <div className="h-screen">
      <div className="container h-screen px-5 max-w-screen-sm mx-auto">
        <div className="flex flex-row justify-center border-b border-gray-100 py-5">
          <img src={urlLogo} alt="pokemon-logo" className="w-28" />
        </div>
        <div className="mt-7 mb-2 max-w-screen-sm mx-auto">
          <p className="font-bold text-gray-600 text-xl text-center">My Pokemon List</p>
          <p className="font text-gray-600 text-sm text-center">{`You owned ${pokemons.length} pokemon`}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-5 pb-28">
          {pokemons.map((item) => <PokemonCard item={item} key={item.id} />)}
        </div>

        <div className="fixed bottom-3 w-full max-w-screen-sm">
          <NavbarMobile active="my-pokemon" />
        </div>
      </div>
    </div>
  );
}

export default index;
