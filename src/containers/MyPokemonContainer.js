import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function MyPokemonContainer({match}) {
    
    let localPokemon = JSON.parse(localStorage.getItem("myPokemon"))
    let currState = []

    if (localPokemon) {
        currState = localPokemon
    }

    const [state, setState] = useState(currState)


    function deletePokemon(pokemon, nickname) {
        let indexDeleted = -1
        localPokemon.map((data, index) => {
            if (data[0] === pokemon && data[1] === nickname) {
                indexDeleted = index
            }
        })
        localPokemon.splice(indexDeleted, 1)
        localStorage.setItem('myPokemon', JSON.stringify(localPokemon));
        setState(JSON.parse(localStorage.getItem("myPokemon")))
    }

    const listTable = state.map((data, index) => {
        return (
            <tr>
                <td>{index+1}</td>
                <td>{data[0]}</td>
                <td>{data[1]}</td>
                <td><button onClick={() => { deletePokemon(data[0], data[1]) }}>Delete</button></td>
            </tr>
        )
    })

    return (
        <div className="pokemons">
            <Link to={`/`}>
                <button>Home</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <td>Number</td>
                        <td>Pokemon</td>
                        <td>Nickname</td>
                    </tr>
                </thead>
                <tbody>
                    {listTable}
                </tbody>
            </table>
        </div>
    )
}

export default MyPokemonContainer