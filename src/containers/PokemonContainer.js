import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POKEMONS } from '../graphql/getDataPokemon'
import {Link} from 'react-router-dom'

import Pokemon from '../components/Pokemon'

function PokemonContainer() {

    const[stateLimit] = useState(5)
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
            <Link to={`/detail/${pokemon.name}`}>
                <Pokemon key={pokemon.name} pokemon={pokemon} />
            </Link>
            
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
        <div className="pokemons">
            <Link to={`/pokemon-list`}>
                <button>My Pokemon</button>
            </Link>
            {pokemonsData}
            <button onClick={getPrevData}>Prev</button>
            <button onClick={getNextData}>Next</button>
        </div>
    )
}

export default PokemonContainer