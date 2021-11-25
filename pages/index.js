/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import NavbarMobile from '../components/navbar/mobile.js';
import PokemonCard from '../components/card/Pokemon.js';

const urlLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/538px-International_Pok%C3%A9mon_logo.svg.png';

const index = function () {
  return (
    <div className="h-screen">
      <div className="container h-screen px-5">
        <div className="flex flex-row justify-center border-b border-gray-100 py-5">
          <img src={urlLogo} alt="pokemon-logo" className="w-28" />
        </div>

      </div>
      <div className="fixed bottom-3 w-full">
        <NavbarMobile />
      </div>
    </div>
  );
};
export default index;
