import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonPics from '../skeleton/Picture';
import formatCapital from '../../helper/string-manipulation';
import pokemonColor from '../../helper/pokemon-color';
import { db } from '../../db';

const endpoint = 'https://pokeapi.co/api/v2/pokemon';

const Pokemon = ({ name }) => {
  const [urlPhoto, setUrl] = useState('');
  const [type, setType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalOwned, setTotalOwned] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${endpoint}/${name}`);
        const result = await response.json();
        setUrl(result.sprites.front_default);
        setType(result.types.map((item) => item.type.name));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    const countTotalOwned = async () => {
      try {
        const total = await db.pokemon.where('original_name').equalsIgnoreCase(name).count();
        setTotalOwned(total);
      } catch (err) {
        console.log(err);
      }
    };

    countTotalOwned();
    fetchData();
  }, []);
  return (
    <div className={`w-full px-3 py-3 rounded-2xl shadow-smooth text-white transform ${pokemonColor(type[0])}`}>
      <div className="grid grid-cols-2">
        <div>
          <p className="font-bold">{formatCapital(name)}</p>
          {type.map((item, index) => (
            <div className="w-100 mb-0.5 ml-1 py-0.5 px-2 bg-white bg-opacity-20 rounded-lg inline-block" key={index}>
              <p className="text-pill">{formatCapital(item)}</p>
            </div>
          ))}
          <p className="text-pill mt-2">{`Total owned: ${totalOwned}`}</p>
        </div>
        <div>
          {(!loading && urlPhoto) && <Image src={urlPhoto} width={90} height={90} alt={name} />}
          {loading && <SkeletonPics />}
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
