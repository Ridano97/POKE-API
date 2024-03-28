import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Card.css'

const PokemonCard = ({nom, id}) => {
    // State
    const navigate = useNavigate();

    //Comportement
    const redirectTo = () => {
        navigate("/pokemon/"+id)
    }
    //Affichage
    return <>
        <Card className='card-pokemon' onClick={redirectTo}>
            <Card.Img variant="top" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+ id + ".png"} />
            <Card.Body>
                <Card.Title className='text-center'>{nom[0].toUpperCase() + nom.slice(1)}</Card.Title>
                {/* <Link to={"/pokemon/"+url.slice(33).replaceAll("/", "")}>
                    <Button variant="primary">Voir détails</Button>
                </Link> */}
            </Card.Body>
        </Card>
    </>
}

export default PokemonCard;