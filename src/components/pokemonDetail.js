import Image from 'next/image';

export default function PokemonDetail({ pokemon, onBack }) {
  const sprite = pokemon?.pokemon_v2_pokemonsprites?.[0]?.sprites;
  
  return (
    <div className="bg-white p-3 rounded text-center pixel-corners">
      <button onClick={onBack} className="pixel-button">
        ← Back
      </button>
      <div className="text-center">
        {sprite && (
          <Image
            src={sprite}
            alt={pokemon.name}
            width={120}
            height={120}
            className="mx-auto"
          />
        )}
        <h2 className="text-xl capitalize mt-2">{pokemon.name}</h2>
        <div className="grid grid-cols-3">
          <span>Height: {pokemon.height}m</span>
          <span>Weight: {pokemon.height}kg</span>
          <span>
            Type:{" "}
            {pokemon.pokemon_v2_pokemontypes
              .map((typeObj) => typeObj.pokemon_v2_type.name)
              .join(", ")}
          </span>
        </div>
        <span>
            Abilities:{" "}
            {pokemon.pokemon_v2_pokemonabilities
              .map((typeObj) => typeObj.pokemon_v2_ability.name)
              .join(", ")}
          </span>
      </div>
    </div>
  );
}