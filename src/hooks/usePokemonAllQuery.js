import { gql, useQuery } from '@apollo/client';
import client from '@/lib/apolloClient';

const GET_POKEMONS = gql`
  query GetPokemons($limit: Int, $offset: Int, $name: String, $type: String, $generation: String) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
      where: {
        is_default: { _eq: true }
        name: { _ilike: $name }
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _ilike: $type } }
        }
        pokemon_v2_pokemonspecy: {
          pokemon_v2_generation: { name: { _eq: $generation } }
        }
      }
    ) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites(path: "$.other.home.front_default")
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type { name }
      }
    }
    pokemon_v2_pokemon_aggregate(
      where: {
        is_default: { _eq: true }
        name: { _ilike: $name }
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _ilike: $type } }
        }
        pokemon_v2_pokemonspecy: {
          pokemon_v2_generation: { name: { _eq: $generation } }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;


export default function usePokemonAllQuery({ limit, offset, name, type, generation }) {
  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: {
      limit,
      offset,
      name: name ? `%${name}%` : '%%',
      type: type ? `%${type}%` : '%%',
      generation
    },
    client,
  });

  return {
    data,
    loading,
    error,
    count: data?.pokemon_v2_pokemon_aggregate?.aggregate?.count || 0,
    pokemons: data?.pokemon_v2_pokemon || [],
  };
}