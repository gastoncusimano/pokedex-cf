import Image from 'next/image';

export default function PokemonDetail({ pokemon, onBack }) {
  const sprite = pokemon?.pokemon_v2_pokemonsprites?.[0]?.sprites;
  
  return (
    <div
      className="bg-white p-3 rounded text-center pixel-corners flex flex-col justify-between"
      style={{ height: '327px' }}
    >
    <button className="pixel-button self-start" onClick={onBack} >← Back</button>
    <div className="flex flex-col items-center text-center flex-grow justify-center">
      <Image
        src={sprite}
        alt={pokemon.name}
        width={120}
        height={120}
        className="mx-auto"
      />
      <h2 className="text-xl capitalize mt-2">{pokemon.name}</h2>

      <div className="grid grid-cols-3 text-sm gap-1 mt-2">
        <span>Height: {pokemon.height}m</span>
        <span>Weight: {pokemon.weight}kg</span>
        <span>
          Type:{' '}
          {pokemon.pokemon_v2_pokemontypes
            .map((t) => t.pokemon_v2_type.name)
            .join(', ')}
        </span>
      </div>

      <span className="text-sm mt-2">
        Abilities:{' '}
        {pokemon.pokemon_v2_pokemonabilities
          .map((a) => a.pokemon_v2_ability.name)
          .join(', ')}
      </span>
    </div>
  </div>
  );
}