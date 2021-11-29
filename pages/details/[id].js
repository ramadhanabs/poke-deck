import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Image from 'next/image';
import { db } from '../../db';
import NavbarMobile from '../../components/navbar/mobile';
import formatCapital from '../../helper/string-manipulation';
import pokemonColor from '../../helper/pokemon-color';
import NotFound from '../../components/404/index';
import { addPokemon } from '../../data/capture-pokemons';

const SweetAlert = withReactContent(Swal);

const endpoint = 'https://pokeapi.co/api/v2/pokemon';
const urlLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/538px-International_Pok%C3%A9mon_logo.svg.png';

const PokemonDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [pokemon, setPokemon] = useState(null);
  const [probability, setProbability] = useState('');

  async function submitData(nickname) {
    try {
      await addPokemon({ nickname, ...pokemon });
    } catch (err) {
      console.log(err);
    }
  }

  async function validateName(nickname) {
    const response = await db.pokemon.where('nickname').equals(nickname).count();
    if (response > 0) {
      return false;
    } return true;
  }

  function confirmation() {
    setProbability(Math.random() < 0.5);
    SweetAlert.fire({
      title: 'Catch this pokemon?',
      showCancelButton: true,
      confirmButtonText: 'Yes, catch now!',
      denyButtonText: 'Mmm, maybe no',
      icon: 'question',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let timerInterval;
        Swal.fire({
          title: 'Capturing pokemon...',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(() => {
          if (probability) {
            Swal.fire(
              'Pokemon Captured!',
              'Congrats :D',
              'success',
            );

            Swal.fire({
              icon: 'success',
              title: `Success capturing ${formatCapital(pokemon.name)}!`,
              input: 'text',
              inputLabel: 'Give your pokemon new nickname',
              inputPlaceholder: 'Enter new nickname',
              allowOutsideClick: false,
              inputValidator: async (value) => {
                const response = await validateName(value);
                if (!response) {
                  return 'Choose other name!';
                } if (!value) {
                  return 'Input nickname first!';
                }
              },
            }).then((res) => {
              Swal.fire({
                title: 'Congratulations!',
                text: `His/her name is ${res.value}`,
                icon: 'success',
              });
              submitData(res.value);
            });
          } else {
            Swal.fire(
              'Failed Capture Pokemon',
              'Try again :)',
              'error',
            );
          }
        });
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      try {
        const response = await fetch(`${endpoint}/${id}`);
        const result = await response.json();
        setPokemon({
          name: result.name,
          url: result.sprites,
          type: result.types.map((item) => item.type.name),
          info: {
            height: result.height,
            weight: result.weight,
            base_experience: result.base_experience,
          },
          stats: result.stats.map((item) => ({
            base_stat: item.base_stat,
            name: item.stat.name,
          })),
          moves: result.moves.slice(0, 8).map((item) => item.move.name),
          abilities: result.abilities.map((item) => item.ability.name),
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return pokemon && (
    <div className="h-screen">
      <div className="container h-screen px-5 max-w-screen-sm mx-auto">
        <div>
          <div className="flex flex-row justify-center border-b border-gray-100 py-5">
            <Image src={urlLogo} alt="pokemon-logo" width={110} height={40} />
          </div>
          <div className="flex flex-column border border-gray-200 rounded-lg mt-7 max-w-screen-sm mx-auto">
            <div className={`flex flex-none px-auto py-auto rounded-lg bg-opacity-80 ${pokemonColor(pokemon.type[0])}`}>
              <Image src={pokemon.url.front_default} alt="pokemon-pic" width={90} height={90} />
            </div>
            <div className="flex flex-row flex-grow mx-3">
              <div className="my-auto">
                <p className="text-gray-700 font-bold text-2xl">{formatCapital(pokemon.name)}</p>
                {pokemon.type.map((item) => (
                  <div key={item} className="w-100 mr-1 py-0.5 px-2 bg-gray-100 rounded inline-block text-gray-800">
                    <p className="text-pill bold">{formatCapital(item)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid px-auto py-auto text-right">
              <button onClick={confirmation} type="button" className="font-bold bg-yellow-100 rounded-lg h-14 w-100 px-3 my-auto mx-auto mr-3 text-xs text-yellow-500 hover:bg-blue-400 hover:text-white hover:scale-105 transition ease-in-out">
                Catch Me!
              </button>
            </div>
          </div>
          <div className="flex flex-row mt-7 mb-2 max-w-screen-sm mx-auto">
            <p className="font-bold text-gray-600 text-lg">Basic Info</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="px-3 py-3 bg-blue-100 rounded-lg">
              <p className="text-lg font-bold text-center text-gray-700">
                {pokemon.info.weight / 10}
                {' '}
                kg
              </p>
              <p className="text-xs text-center text-gray-500">Weight</p>
            </div>
            <div className="px-3 py-3 bg-green-100 rounded-lg">
              <p className="text-lg font-bold text-center text-gray-700">
                {pokemon.info.height / 10}
                {' '}
                meter
              </p>
              <p className="text-xs text-center text-gray-500">Height</p>
            </div>
            <div className="px-3 py-3 bg-yellow-100 rounded-lg">
              <p className="text-lg font-bold text-center text-gray-700">{pokemon.info.base_experience}</p>
              <p className="text-xs text-center text-gray-500">Base Exp</p>
            </div>
          </div>

          <div className="flex flex-row mt-4 max-w-screen-sm mx-auto">
            <p className="font-bold text-gray-600 text-lg mb-2">Abilities</p>
          </div>
          {pokemon.abilities.map((item) => <div className="bg-blue-100 rounded-lg py-1 px-3 inline-block text-xs text-blue-400 font-bold mr-2 mb-2" key={item}>{formatCapital(item)}</div>)}

          <div className="flex flex-row mt-4 max-w-screen-sm mx-auto">
            <p className="font-bold text-gray-600 text-lg mb-2">Moves</p>
          </div>
          {pokemon.moves.map((item) => (
            <div className="bg-yellow-100 rounded-lg py-1 px-3 inline-block text-xs text-yellow-400 font-bold mr-2 mb-2" key={item}>{formatCapital(item)}</div>
          ))}

          <div className="flex flex-row mt-7 max-w-screen-sm mx-auto">
            <p className="font-bold text-gray-600 text-lg">Specs</p>
          </div>
          <div className="pb-28">
            {
         pokemon.stats.map((item) => (
           <div className="mt-2 max-w-screen-sm mx-auto" key={item.name}>
             <div className="flex flex-row justify-between">
               <p className="text-xs text-gray-600">{formatCapital(item.name)}</p>
               <p className="text-xs text-gray-600 font-bold">{item.base_stat}</p>
             </div>
             <div>
               <div className="h-3 relative max-w-xl rounded-full overflow-hidden">
                 <div className="w-full h-full bg-gray-200 absolute" />
                 <div className={`h-full ${pokemonColor(pokemon.type[0])} absolute rounded-full`} style={{ width: `${item.base_stat}%` }} />
                 <div className={`h-full ${pokemonColor(pokemon.type[0])}  absolute rounded-full animate-ping`} style={{ width: `${item.base_stat}%` }} />
               </div>
             </div>
           </div>
         ))
       }
          </div>
        </div>
        <div className="fixed bottom-3 w-full max-w-screen-sm">
          <NavbarMobile />
        </div>
      </div>
    </div>

  );
};

export default PokemonDetail;
