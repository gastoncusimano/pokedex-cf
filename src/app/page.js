"use client";

import { useState } from 'react';
import PaginationDpad from '@/components/paginationDpad';
import RightPanel from '@/components/rightPanel';
import MainScreen from '@/components/mainScreen';
import usePokemonQuery from '@/hooks/usePokemonQuery';

export default function Home() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [generation, setGeneration] = useState('generation-i');
  const [page, setPage] = useState(0);
  const limit = 6;

  const { data, loading, error, pokemons, count } = usePokemonQuery({
    limit,
    offset: page * limit,
    name: search,
    type,
    generation,
  });

  return (
    <div className="pokedex-container font-mono">
      <div className="pokedex pixel-corners">
        <div className="left-panel">
          <div className="top-lights pixel-corners">
            <div></div><div></div><div></div>
          </div>

          <MainScreen pokemons={pokemons} loading={loading} error={error} />

          <div className="bottom-controls">
            <PaginationDpad
              page={page}
              setPage={setPage}
              total={count}
              limit={limit}
            />
          </div>

          <div className="bottom-controls">
            <input
              type="text"
              placeholder="Search Pokémon"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="filter-input pixel-corners"
            />
            <input
              type="text"
              placeholder="Filter by type (e.g. fire)"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(0);
              }}
              className="filter-input pixel-corners"
            />
          </div>
        </div>

        <RightPanel
          generation={generation}
          setGeneration={setGeneration}
          setPage={setPage}
        />
      </div>
    </div>
  );
}