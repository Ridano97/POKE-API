import React, { useEffect, useState } from "react";
import PokemonsService from "../Services/PokemonsService";
import PokemonCard from "../components/PokemonCard";
import { useParams } from "react-router-dom";
import VersionService from "../Services/VersionService";
import Form from "react-bootstrap/Form";

const PokemonByVersion = () => {
  //Etats -> States
  const { idVersion } = useParams();
  const [pokemonsFiltered, setPokemonFiltered] = useState([]);
  const [pokemonsByVersions, setPokemonsByVersions] = useState([]);
  const [version, setVersion] = useState({});
  const [searchValue, setSearchValue] = useState("");

  //Comportements -> les functions
  const PokemonsByVersion = async () => {
    const response = await VersionService.getVersionByID(idVersion);
    setVersion(response.data);
    const generation = await PokemonsService.fetchPokemonByGeneration(response.data.generation.url.slice(36).replaceAll("/", ""))
    setPokemonsByVersions(generation.data.pokemon_species);
    setPokemonFiltered(generation.data.pokemon_species);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };


  useEffect(() => {
    PokemonsByVersion();
  }, []);

  useEffect(() => {
    if (searchValue != "") {
      let res = pokemonsByVersions.filter((pokemon) => {
        return pokemon.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setPokemonFiltered(res);
    } else {
      setPokemonFiltered(pokemonsByVersions);
    }
  }, [searchValue]);

  //Affichage -> return
  return (
    <>
      <h1 className="text-center">Pokémon de {version.names}</h1>
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

export default PokemonByVersion;
