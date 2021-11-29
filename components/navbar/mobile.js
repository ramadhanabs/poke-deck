import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDharmachakra, faDna, faHome } from '@fortawesome/free-solid-svg-icons';

const mobile = (props) => {
  const { active } = props;

  return (
    <div className="w-11/12 h-full py-3 px-5 bg-gray-100 text-center rounded-full shadow-smooth">
      <div className="grid grid-cols-3 text-center">
        <Link href="/">
          <button type="button" className={`grid grid-rows-2 text-center ${active === 'home' ? 'text-gray-700' : 'text-gray-400'} hover:text-gray-700 transition ease-in-out`}>
            <FontAwesomeIcon icon={faHome} className="mx-auto" size="lg" />
            <p className="text-sm">Home</p>
          </button>
        </Link>
        <Link href="/details">
          <button type="button" className={`grid grid-rows-2 text-center ${active === 'pokemon-list' ? 'text-gray-700' : 'text-gray-400'} hover:text-gray-700 transition ease-in-out`}>
            <FontAwesomeIcon icon={faDharmachakra} className="mx-auto" size="lg" />
            <p className="text-sm">Pokemon List</p>
          </button>
        </Link>
        <Link href="/my-pokemon">
          <button type="button" className={`grid grid-rows-2 text-center ${active === 'my-pokemon' ? 'text-gray-700' : 'text-gray-400'} hover:text-gray-700 transition ease-in-out`}>
            <FontAwesomeIcon icon={faDna} className="mx-auto" size="lg" />
            <p className="text-sm">My Pokemon</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default mobile;
