import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import PokemonsService from "../Services/PokemonsService";
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';

const PokemonsPage = () => {
    // États -> States
    const [pokemons, setPokemons] = useState([]);
    const [pokemonsFiltered, setPokemonFiltered]= useState([])
    const [pokemonPerPage, setPokemonPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(20);
    const [searchValue, setSearchValue]= useState("")

    // Comportements -> Les functions
    const getPokemons = async () => {
        let nombrePokemonAffiche = pokemonPerPage * (currentPage - 1);
        const response = await PokemonsService.fetchPokemon(pokemonPerPage, nombrePokemonAffiche);
        setMaxPage(Math.ceil(response.data.count / pokemonPerPage));
        setPokemons(response.data.results);
        setPokemonFiltered(response.data.results);
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);

    }

    useEffect(() => {
        getPokemons();
    }, [currentPage])

    useEffect(()=> {
        if(searchValue != ""){
            let res = pokemons.filter((pokemon) => {
                return pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
            })
            setPokemonFiltered(res);
            } else {
                   setPokemonFiltered(pokemons)
            }
    }, [searchValue])

    //Affichage -> return
    return <>
        <h1 className="text-center mb-5"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" height={150}  alt="pokemon_logo" /></h1>
        <div className="d-flex justify-content-center m-4 col-11">
             <Form.Control  className="m-3" type="text" placeholder="Rechercher un Pokémon" onChange={handleChange} />
        </div>
        <div className="d-flex gap-3 flex-wrap justify-content-center">
            {pokemonsFiltered.map((pokemon) => {
                return <PokemonCard nom={pokemon.name} id={pokemon.url.slice(33).replaceAll("/", "")} />
            })}
        </div>
        <div className="d-flex justify-content-center mt-4">
            <Pagination>
                {/* Si currentPage est strictement supérieur à 1 alors j'afficher mes éléments se trouvant dans les <> </> */}
                {currentPage > 1 && <>
                    <Pagination.First onClick={() => { setCurrentPage(1) }} />
                    <Pagination.Prev onClick={() => { setCurrentPage(currentPage - 1) }} />
                    <Pagination.Item onClick={() => { setCurrentPage(1) }}>{1}</Pagination.Item>
                    <Pagination.Ellipsis disabled />
                    <Pagination.Item onClick={() => { setCurrentPage(currentPage - 1) }}>{currentPage - 1}</Pagination.Item>
                </>}

                <Pagination.Item active>{currentPage}</Pagination.Item>

                {/* Si currentPage est strictement inférieur à la variable max Page 
                    alors j'afficher mes éléments se trouvant dans les <> </> */}
                {currentPage < maxPage && <>
                    <Pagination.Item onClick={() => { setCurrentPage(currentPage + 1) }}>{currentPage + 1}</Pagination.Item>
                    <Pagination.Ellipsis disabled />
                    <Pagination.Item onClick={() => { setCurrentPage(maxPage) }}>{maxPage}</Pagination.Item>
                    <Pagination.Next onClick={() => { setCurrentPage(currentPage + 1) }} />
                    <Pagination.Last onClick={() => { setCurrentPage(maxPage) }} />
                </>}

            </Pagination>
        </div>

    </>
}

export default PokemonsPage;