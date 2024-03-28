import React, { useEffect, useState } from "react";
import PokemonsService from "../Services/PokemonsService";
import PokemonCard from "../components/PokemonCard";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";

const GenerationsPage = () => {
  // États -> States
  const { idGeneration } = useParams();
  const [pokemonsFiltered, setPokemonFiltered] = useState([]);
  const [pokemonsByGeneration, setPokemonsByGeneration] = useState([]);
  const [generation, setGeneration] = useState({});
  const [searchValue, setSearchValue] = useState("");

  // Comportements -> Les functions
  const getPokemonsByGeneration = async () => {
    const response = await PokemonsService.fetchPokemonByGeneration(
      idGeneration
    );
    setGeneration(response.data);
    response.data.pokemon_species.sort((a, b) => {
      return (
        a.url.slice(42).replaceAll("/", "") -
        b.url.slice(42).replaceAll("/", "")
      );
    });
    setPokemonsByGeneration(response.data.pokemon_species);
    setPokemonFiltered(response.data.pokemon_species);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    getPokemonsByGeneration();
  }, []);

  useEffect(() => {
    if (searchValue != "") {
      let res = pokemonsByGeneration.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setPokemonFiltered(res);
    } else {
      setPokemonFiltered(pokemonsByGeneration);
    }
  }, [searchValue]);

  //Affichage -> return
  return (
    <>
      <h1 className="text-center">
        {generation.names && generation.names[3].name}
      </h1>
      <div className="d-flex justify-content-center m-4 col-11">
        <Form.Control
          className="m-3"
          type="text"
          placeholder="Rechercher un Pokémon"
          onChange={handleChange}
        />
      </div>
      <div className="d-flex gap-3 flex-wrap justify-content-center mt-3">
        {pokemonsFiltered.map((pokemon) => {
          return (
            <PokemonCard
              nom={pokemon.name}
              id={pokemon.url.slice(42).replaceAll("/", "")}
            />
          );
        })}
      </div>
    </>
  );
};

export default GenerationsPage;
