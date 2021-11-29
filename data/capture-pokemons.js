import moment from 'moment';
import { db } from '../db';

export const addPokemon = async (pokemon) => {
  try {
    await db.pokemon.add({
      nickname: pokemon.nickname,
      url_image: pokemon.url.front_default,
      original_name: pokemon.name,
      type: pokemon.type[0],
      timestamps: moment().format('LL'),
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllCapturedPokemons = async () => {
  try {
    const data = await db.pokemon.toArray();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const deletePokemon = async (pokemonID) => {
  await db.pokemon.delete(pokemonID);
};

export const checkDuplicateName = async (nickname) => {
  try {
    const response = await db.pokemon.where('nickname').equals(nickname).count();
    if (response > 0) {
      return false;
    } return true;
  } catch (err) {
    console.log(err);
  }
};
