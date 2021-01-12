import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POKEMONS } from '../graphql/getDataPokemon'
import {Link} from 'react-router-dom'
/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react'

import Pokemon from '../components/Pokemon'

function PokemonContainer() {

    const pokemonList = css`
        width: 100%;
    `

    const buttonSize = css `
        width: 100%;
    `
    
    const eachPokemon = css`
        width: 45%;
        padding: 10px;
        float: left;
    `

    const[stateLimit] = useState(6)
    const[stateOffset, setStateOffset] = useState(0)

    let prevOffset = 0
    let nextOffset = 0

    const gqlVariables = {
        limit: stateLimit,
        offset: stateOffset,
    }

    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: gqlVariables,
    })
      
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    if (data) {
        prevOffset = data.pokemons.prevOffset
        nextOffset = data.pokemons.nextOffset
    }

    const pokemonsData = data.pokemons.results.map(pokemon => {
        return (
            <div css={eachPokemon}>
                <Link to={`/detail/${pokemon.name}`} style={{ textDecoration: 'none' }}>
                    <Pokemon key={pokemon.name} pokemon={pokemon} />
                </Link>
            </div>
            
        )
    })

    const getPrevData = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStateOffset(prevOffset)
    };
    
    const getNextData = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStateOffset(nextOffset)
    };

    return (
        <div css={pokemonList}>
            <div css={buttonSize}>
                <Link to={`/pokemon-list`}>
                    <button>My Pokemon</button>
                </Link>
            </div>
            {pokemonsData}
            <div css={buttonSize}>
                <button onClick={getPrevData}>Prev</button>
                <button onClick={getNextData}>Next</button>
            </div>
        </div>
    )
}

export default PokemonContainer