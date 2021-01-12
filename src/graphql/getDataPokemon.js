import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            nextOffset
            prevOffset
            results {
                url
                name
                image
            }
        }
    }
`

export const GET_POKEMON_DETAIL = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
            id
            name
            abilities {
                ability {
                    name
                }
            }
            moves {
                move {
                    name
                }
            }
            types {
                type {
                    name
                }
            }
            sprites {
                front_default
            }
            message
            status
        }
    }
`