import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POKEMON_DETAIL } from '../graphql/getDataPokemon'
import {Link} from 'react-router-dom'

import PokemonDetail from '../components/PokemonDetail'
import Modal from '../components/ModalCatch'

function PokemonContainer({match}) {

    const[isShowAdd, setStateModal] = useState(false)
    const[username, setStateUsername] = useState('')

    const gqlVariables = {
        name: match.params.name
    }

    const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
        variables: gqlVariables,
    })
      
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    function catchPokemon() {
        if (Math.random() > 0.5) {
            setStateModal(true)
            alert('Catch Success! Please Input Nickname to Your Pokemon!')
        }
        else {
            alert('Catch Failed! Please Try Aain!')
        }
    }

    function closeModalCatchHandler(){
        setStateModal(false)
    }

    function handleChange(e) {
        setStateUsername(e.target.value);
    }

    function insertPokemon() {
        let checkUsername = 0
        let pokemon = []
        let localPokemon = JSON.parse(localStorage.getItem("myPokemon"))
        
        if (localPokemon === null) {
            pokemon.push([match.params.name, username])
        }
        else {
            localPokemon.map(data => {
                if (data[1] === username && data[0] === match.params.name) {
                    checkUsername = 1
                }
            })
            localPokemon.push([match.params.name, username])
            pokemon = localPokemon
        }
        
        if (checkUsername === 1) {
            alert('Username Already Exist!')
        }
        else {
            localStorage.setItem('myPokemon', JSON.stringify(pokemon));
            setStateModal(false)
            alert('Catch Success!')
        }
    }

    return (
        <div className="pokemons">
            <Link to={`/`}>
                <button>Home</button>
            </Link>
            <Link to={`/pokemon-list`}>
                <button>My Pokemon</button>
            </Link>
            <PokemonDetail key={data.pokemon} pokemon={data.pokemon}/>
            <button onClick={catchPokemon}>Catch</button>
            <Modal show={isShowAdd} handleClose={closeModalCatchHandler} headerTitle="Input Username">
                <input placeholder="Input Username" onChange={handleChange}/>
                <button onClick={insertPokemon}>Submit</button>
            </Modal>
        </div>
    )
}

export default PokemonContainer