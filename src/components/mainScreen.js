import Image from 'next/image';

export default function MainScreen({ pokemons, loading, error, onSelectPokemon }) {
  if (loading) {
    return <p className="text-white m-5">Loading…</p>;
  }

  if (error) {
    return <p className="text-red-500 m-5">Error: {error.message}</p>;
  }

  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-white text-center p-6">
      <div className="relative w-32 h-32">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 rounded-t-full border-4 border-black pixel-corners" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full border-4 border-black pixel-corners" />
        <div className="absolute top-1/2 left-0 w-full h-4 bg-black transform -translate-y-1/2 pixel-corners" />
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white border-4 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-2 h-2 bg-black rounded-full top-1/3 left-1/3" />
        <div className="absolute w-2 h-2 bg-black rounded-full top-1/3 right-1/3" />
        <div className="absolute bottom-6 left-1/2 w-8 h-1 bg-black transform -translate-x-1/2 rotate-180 rounded-b-full" />
      </div>
      <p className="font-mono text-sm mt-4">No Pokemon found... :(</p>
    </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
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