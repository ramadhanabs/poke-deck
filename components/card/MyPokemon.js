import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import formatCapital from '../../helper/string-manipulation';
import pokemonColor from '../../helper/pokemon-color';
import { deletePokemon } from '../../data/capture-pokemons';

const SweetAlert = withReactContent(Swal);

const MyPokemon = (props) => {
  const { item } = props;
  const { id } = item;

  async function releasePokemon(pokemonID) {
    try {
      await deletePokemon(pokemonID);
    } catch (err) {
      console.log(err);
    } finally {
      Swal.fire({
        title: 'Pokemon Released!',
        icon: 'success',
      });
    }
  }

  function confirmation() {
    SweetAlert.fire({
      title: 'Release this pokemon?',
      showCancelButton: true,
      confirmButtonText: 'Yes, release it!',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval;
        Swal.fire({
          title: 'Releasing pokemon...',
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then(() => {
          releasePokemon(id);
        });
      }
    });
  }

  return (
    <div className={`w-full px-3 py-3 rounded-2xl shadow-smooth text-white transform ${pokemonColor(item.type)}`}>
      <div className="grid grid-cols-2">
        <div>
          <p className="font-bold">{item.nickname}</p>
          <div className="w-100 mb-0.5 ml-1 py-0.5 px-2 bg-white bg-opacity-20 rounded-lg inline-block">
            <p className="text-pill">{formatCapital(item.original_name)}</p>
          </div>
        </div>
        <div>
          <img src={item.url_image} alt="pokemon" />
        </div>
      </div>
      <div className="grid grid-cols-1 mt-3">
        <button onClick={confirmation} type="button" className="bg-gray-700 bg-opacity-10 rounded-lg text-center bold text-xs text-white py-1 hover:bg-opacity-20 transition ease-in-out">Release</button>
      </div>
    </div>
  );
};

export default MyPokemon;
