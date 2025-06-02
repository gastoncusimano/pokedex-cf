export default function RightPanel({ generation, setGeneration, setPage, pokemon }) {
    const generations = ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv'];
  
    return (
      <div className="right-panel">
        {pokemon?.pokemon_v2_pokemonstats && (
        <div className="pixel-corners bg-gray-900 p-3 text-white stats">
          <h2 className="font-mono text-md mb-2">Stats</h2>
          {pokemon.pokemon_v2_pokemonstats.map((stat) => (
            <PixelStatBar
              key={stat.pokemon_v2_stat.name}
              label={formatStatLabel(stat.pokemon_v2_stat.name)}
              value={normalizeStat(stat.base_stat)}
            />
          ))}
        </div>
      )}
        <div className="info-screen pixel-corners">
          Gastón Cusimano - Pokedex
          <div className="text-xs mt-1">
            Generation: <span className="capitalize">{generation.replace('generation-', 'Gen ')}</span>
          </div>
        </div>
        <div className="buttons">
          {generations.map((gen) => (
            <button
              key={gen}
              onClick={() => {
                setGeneration(gen);
                setPage(0);
              }}
              className={generation === gen ? 'selected' : ''}
              aria-label={`Select ${gen}`}
            />
          ))}
        </div>
      </div>
    );
  }

function normalizeStat(baseStat) {
  const min = 10;
  const max = 160;
  return Math.max(0, Math.min(5, Math.floor(((baseStat - min) / (max - min)) * 5)));
}

function PixelStatBar({ label, value }) {
  const total = 5;
  const filled = Array(value).fill(true);
  const empty = Array(total - value).fill(false);

  return (
    <div className="flex items-center space-x-2 font-mono text-sm text-white">
      <span className="w-24 capitalize">{label}</span>
      <div className="flex space-x-1">
        {[...filled, ...empty].map((filled, idx) => (
          <div
            key={idx}
            className={`w-4 h-4 ${filled ? 'bg-green-500' : 'bg-gray-700'}`}
          />
        ))}
      </div>
    </div>
  );
}

function formatStatLabel(label) {
  const map = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Att',
    'special-defense': 'Sp. Def',
    'speed': 'Speed',
  };
  return map[label] || label;
}