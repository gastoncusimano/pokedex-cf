import { gql, useQuery } from '@apollo/client';
import client from '@/lib/apolloClient';

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($name: String!) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type { name }
      }
      pokemon_v2_pokemonsprites {
        sprites(path: "$.other.home.front_default")
      }
      pokemon_v2_pokemonspecy {
        name
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`;
export default function usePokemonDetail(name) {
    const { data, loading, error } = useQuery(GET_POKEMON_DETAIL, {
      variables: { name },
      skip: !name,
      client,
    });
  
    const pokemon = data?.pokemon_v2_pokemon?.[0];
  
    return {
      pokemon,
      loading,
      error,
    };
  }