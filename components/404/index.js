import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';

function index() {
  return (
    <div className="grid grid-cols-1 h-full">
      <div className="my-auto text-center">
        <FontAwesomeIcon icon={faSadCry} className="mx-auto text-gray-300" size="lg" />
        <p className="text-4xl text-red-300 font-bold">404</p>
        <p className="text-sm text-gray-300">
          Unfortunately pokemon not found,
          {' '}
          <br />
          {' '}
          search it with full name
        </p>
        <Link href="/">
          <button type="button" className="my-3 w-18 h-10 px-3 bg-blue-300 hover:bg-blue-500 rounded-lg text-white font-sm">Search Again</button>
        </Link>
      </div>
    </div>
  );
}

export default index;
