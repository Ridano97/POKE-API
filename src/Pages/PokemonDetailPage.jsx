import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PokemonsService from '../Services/PokemonsService';
import ReactAudioPlayer from 'react-audio-player';
import CanvasJSReact from '@canvasjs/react-charts';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import TypeService from '../Services/TypeService';


const PokemonDetailPage = () => {
    // États -> states
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [pokemonSpecies, setPokemonSpecies] = useState({})
    const [type, setType] = useState({});
    const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    //Comportement
    const fetchPokemon = async () => {
        const response = await PokemonsService.fetchPokemonByID(id);
        setPokemon(response.data);
        const type = await TypeService.fetchTypeByURL(response.data.types[0].type.url);
        setType(type.data);
        fetchPokemonSpecies(response.data.species.url.slice(42).replaceAll("/", ""))
    }

    const fetchPokemonSpecies = async (idSpecies) => {
        const response = await PokemonsService.fetchPokemonSpeciesByID(idSpecies);
        setPokemonSpecies(response.data);
    }

    useEffect(() => {
        fetchPokemon();
    }, [])

    // Affichage
    return <>
        {/* Joue le son du pokemon sans rien afficher */}
        <ReactAudioPlayer
            src={pokemon.cries && pokemon.cries.latest}
            // controls
            autoPlay
            volume={0.2}
        />
        <div className='container d-flex flex-column justify-content-center'>
            <h1 className='text-center'>{pokemon.name && pokemon.name[0].toUpperCase() + pokemon.name.slice(1)} N°{id}</h1>
            <div className='d-flex flex-wrap justify-content-center'>
                {/* Column left */}
                <div className='d-flex flex-column bg-secondary col-lg-6 col-12' id='column-left'>
                    <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png"}
                        alt='Pokemon Image' />
                    <CanvasJSChart options={{
                        title: {
                            text: "Statistiques de base"
                        },
                        data: [{
                            type: "column",
                            dataPoints: pokemon.stats && pokemon.stats.map((statistique) => {
                                return { label: statistique.stat.name, y: statistique.base_stat }
                            })
                        }]
                    }} />
                </div>
                {/* Column right */}
                <div className='d-flex flex-column col-lg-6 col-12 p-3' id='column-right'>
                    <h4>{(pokemonSpecies.flavor_text_entries && pokemonSpecies.flavor_text_entries[0] != undefined) && pokemonSpecies.flavor_text_entries[0].flavor_text}</h4>
                    <div className='mt-3'>
                        <h5>Game versions : </h5>
                        <Stack className="flex-wrap p-1" direction="horizontal" gap={2}>
                            {pokemon.game_indices && pokemon.game_indices.map((game) => {
                                return <h4><Badge bg="" className={game.version.name}>{game.version.name[0].toUpperCase() + game.version.name.slice(1)}</Badge></h4>
                            })}
                        </Stack>
                    </div>
                    {/* Encadré bleu */}
                    <div className='d-flex bg-primary w-100 rounded mt-3 p-3'>
                        {/* Partie gauche de l'encadré */}
                        <div className='d-flex flex-column col-6'>
                            <h4 className='text-white'>Taille : </h4>
                            <h5>{pokemon.height}</h5>
                            <h4 className='text-white'>Poids : </h4>
                            <h5>{pokemon.weight}</h5>
                        </div>
                        {/* Partie droite de l'encadré */}
                        <div className='d-flex flex-column align-self-center'>
                            <h4 className='text-white'>Compétences : </h4>
                            <Stack className="flex-wrap p-1" direction="vertical" gap={2}>
                                {pokemon.abilities && pokemon.abilities.map((ability) => {
                                    return <h3><Badge bg="secondary">{ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1)}</Badge></h3>
                                })}
                            </Stack>
                        </div>
                    </div>
                    {/* Types du pokemon */}
                    <div className='mt-3'>
                        <h4>Types : </h4>
                        <Stack className="flex-wrap p-1" direction="horizontal" gap={2}>
                            {pokemon.types && pokemon.types.map((type) => {
                                return <h3><Badge className={type.type.name} bg=''>{type.type.name[0].toUpperCase() + type.type.name.slice(1)}</Badge></h3>
                            })}
                        </Stack>
                    </div>
                    {/* Faiblesse du pokemon */}
                    <div className='mt-3'>
                        <h4>Faiblesses : </h4>
                        <Stack className="flex-wrap p-1" direction="horizontal" gap={2}>
                            {/* SI type.damage_relations existe ou et définie alors je fait mon traitement (.map) */}
                            {type.damage_relations && type.damage_relations.double_damage_from.map((type) => {
                                return <h3><Badge className={type.name} bg=''>{type.name[0].toUpperCase() + type.name.slice(1)}</Badge></h3>
                            })}
                        </Stack>
                    </div>
                    {/* Force du pokemon */}
                    <div className='mt-3'>
                        <h4>Fort contre : </h4>
                        <Stack className="flex-wrap p-1" direction="horizontal" gap={2}>
                            {/* SI type.damage_relations existe ou et définie alors je fait mon traitement (.map) */}
                            {type.damage_relations && type.damage_relations.double_damage_to.map((type) => {
                                return <h3><Badge className={type.name} bg=''>{type.name[0].toUpperCase() + type.name.slice(1)}</Badge></h3>
                            })}
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
        {/* <h1>Détail Pokemon N°{id}</h1>
        <h2>Name : {pokemon.name}</h2>
        <h2>Poids : {pokemon.weight}</h2>
        <h2>Taille : {pokemon.height}</h2> */}

    </>
}

export default PokemonDetailPage;