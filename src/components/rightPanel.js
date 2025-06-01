export default function RightPanel({ generation, setGeneration, setPage }) {
    const generations = ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv'];
  
    return (
      <div className="right-panel">
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