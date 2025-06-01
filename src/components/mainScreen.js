import Image from 'next/image';
import Link from 'next/link';

export default function MainScreen({ pokemons, loading, error, onSelectPokemon }) {
  return (
      <div className="grid grid-cols-2 gap-2">
      {loading && <p className="text-white m-5">Loading…</p>}
      {error && <p className="text-red-500 m-5">Error: {error.message}</p>}
        {pokemons.map((p) => {
          const sprite = p.pokemon_v2_pokemonsprites?.[0]?.sprites;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPokemon(p)}
              className="bg-white p-2 rounded text-center pixel-corners"
              >
              {sprite && (
                <Image
                  src={sprite}
                  alt={p.name}
                  width={64}
                  height={64}
                  className="mx-auto"
                />
              )}
              <p className="capitalize">{p.name}</p>
            </button>
          );
        })}
    </div>
  );
}