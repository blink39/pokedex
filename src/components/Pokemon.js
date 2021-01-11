import React from 'react'
/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react'

function Pokemon(props) {
    
    let localPokemonCounter = 0
    let localPokemon = JSON.parse(localStorage.getItem("myPokemon"))
    let string = ''

    const countingPokemon = localPokemon.map(data => {
        if (data[0] === props.pokemon.name) {
            localPokemonCounter += 1
        }
    })
    
    const capitalizeFLetter = props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)

    const styleText = css`
        font-family:'Roboto', sans-serif;
        text-align: center;
        background-color: grey;
        border-radius: 15px;
        padding: 3px;
        color: white;
        font-size: 20px;
        text-decoration: none;
    `

    return (
        <div css={styleText}>
            <div>
                <p>{capitalizeFLetter}</p>
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