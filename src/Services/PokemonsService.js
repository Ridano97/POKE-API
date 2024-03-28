import axios from "axios";

class PokemonsService {
  static fetchPokemon(pokemonPerPage, nombrePokemonAffiche) {
    return axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=" +
        pokemonPerPage +
        "&offset=" +
        nombrePokemonAffiche
    );
  }

  static fetchPokemonByID(id) {
    return axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
  }

  static fetchPokemonSpeciesByID(id) {
    return axios.get("https://pokeapi.co/api/v2/pokemon-species/" + id);
  }

  static fetchPokemonByGeneration(id) {
    return axios.get("https://pokeapi.co/api/v2/generation/" + id);
  }

  static fetchPokemonByType(id) {
    return axios.get("https://pokeapi.co/api/v2/type/" + id);
  }

  static fetchPokemonByVersion(id) {
    return axios.get("https://pokeapi.co/api/v2/version-group/" + id);
  }
}

export default PokemonsService;
