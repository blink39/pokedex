import React from 'react'

function Pokemon(props) {
    return (
        <div className="pokemon">
            <div className="pokemon_image">
                <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
            </div>
            <div className="pokemon_name">
                <p>{props.pokemon.types[0].type.name}</p>
            </div>
        </div>
    )
}

export default Pokemon