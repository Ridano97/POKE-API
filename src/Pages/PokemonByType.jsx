import React, { useEffect, useState } from "react";
import PokemonsService from "../Services/PokemonsService";
import PokemonCard from "../components/PokemonCard";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";

const PokemonByType = () => {
  //Etats -> States
  const { idType } = useParams();
  const [pokemonsFiltered, setPokemonFiltered] = useState([]);
  const [pokemonsByTypes, setPokemonsByTypes] = useState([]);
  const [type, setType] = useState({});
  const [searchValue, setSearchValue] = useState("");

  //Comportements -> les functions
  const PokemonsByType = async () => {
    const response = await PokemonsService.fetchPokemonByType(idType);
    setType(response.data);
    setPokemonsByTypes(response.data.pokemon);
    setPokemonFiltered(response.data.pokemon);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    PokemonsByType();
  }, []);

  useEffect(() => {
    if (searchValue != "") {
      let res = pokemonsByTypes.filter((pokemon) => {
        return pokemon.pokemon.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setPokemonFiltered(res);
    } else {
      setPokemonFiltered(pokemonsByTypes);
    }
  }, [searchValue]);

  //Affichage -> return
  return (
    <>
      <div className="d-flex justify-content-center m-4 col-11">
        <Form.Control
          className="m-3"
          type="text"
          placeholder="Rechercher un Pokémon"
          onChange={handleChange}
        />
      </div>
      <h1 className="text-center">{type.names && type.names[3].name}</h1>
      <div className="d-flex gap-3 flex-wrap justify-content-center mt-3">
        {pokemonsFiltered.map((pokemon) => {
          return (
            <PokemonCard
              nom={pokemon.pokemon.name}
              id={pokemon.pokemon.url.slice(33).replaceAll("/", "")}
            />
          );
        })}
      </div>
    </>
  );
};

export default PokemonByType;
