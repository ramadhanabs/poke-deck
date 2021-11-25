import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { faHandsWash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavbarMobile from '../../components/navbar/mobile.js';

const endpoint = 'https://pokeapi.co/api/v2/pokemon';
const urlLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/538px-International_Pok%C3%A9mon_logo.svg.png';

function formatCapital(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const PokemonDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [type, setType] = useState([]);
  const [color, setColor] = useState('');
  const [urlPhoto, setUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${endpoint}/${id}`);
        const result = await response.json();
        setName(result.name);
        setUrl(result.sprites);
        setType(result.types.map((item) => item.type.name));
        console.log(urlPhoto);
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
          return 'bg-gray-100';
      }
    });
  }, [type]);

  return (
    <div className="h-screen">
      <div className="container h-screen px-5 max-w-screen-lg mx-auto">
        <div className="flex flex-row justify-center border-b border-gray-100 py-5">
          <img src={urlLogo} alt="pokemon-logo" className="w-28" />
        </div>
        <div className="flex flex-column border border-gray-200 rounded-lg mt-7 max-w-screen-sm mx-auto">
          <div className={`flex flex-none px-auto py-auto rounded-lg bg-opacity-80 ${color}`}>
            <img src={urlPhoto.front_default} alt="" />
          </div>
          <div className="flex flex-row flex-grow mx-3">
            <div className="my-auto">
              <p className="text-gray-700 font-bold text-2xl">{formatCapital(name)}</p>
              {type.map((item) => (
                <div className="w-100 mr-1 py-0.5 px-2 bg-gray-100 rounded inline-block text-gray-800">
                  <p className="text-pill bold">{formatCapital(item)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid px-auto py-auto text-right">
            <button type="button" className="bg-gray-100 rounded-lg h-14 w-100 px-3 mr-3 my-auto mx-auto text-xs text-gray-400 hover:bg-blue-400 hover:text-white transition ease-in-out">
              Catch Me!
            </button>
          </div>
        </div>
        <div className="flex flex-row mt-7 max-w-scree-sm mx-auto">
          <p className="font-bold text-gray-600 text-lg">Specs</p>
        </div>
      </div>
      <div className="fixed bottom-3 w-full">
        <NavbarMobile />
      </div>
    </div>

  );
};

export default PokemonDetail;
