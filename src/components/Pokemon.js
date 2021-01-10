import React from 'react'

function Pokemon(props) {
    
    let localPokemonCounter = 0
    let localPokemon = JSON.parse(localStorage.getItem("myPokemon"))

    const countingPokemon = localPokemon.map(data => {
        if (data[0] === props.pokemon.name) {
            localPokemonCounter += 1
        }
    })

    return (
        <div className="pokemon">
            <div className="pokemon_name">
                <p>{props.pokemon.name}</p>
            </div>
            <div className="pokemon_image">
                <img src={props.pokemon.image} alt={props.pokemon.name} />
            </div>
            <div className="pokemon_owned">
                <p>Owned : {localPokemonCounter}</p>
            </div>
        </div>
    )
}

export default Pokemon