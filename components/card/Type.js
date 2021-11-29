import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import formatCapital from '../../helper/string-manipulation';
import backgroundColor from '../../helper/pokemon-color';

const Type = (props) => {
  const { item } = props;
  return (
    <div className={`w-full px-5 py-3 rounded-2xl shadow-smooth text-white ${backgroundColor(item.name)}`}>
      <div className="grid grid-cols-2">
        <div>
          <p className="font-bold">{formatCapital(item.name)}</p>
        </div>
        <div className="text-right">
          <Link href={`/type/${item.name}`}>
            <button type="button">
              <FontAwesomeIcon icon={faChevronRight} className="mx-auto" size="lg" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Type;
