"use client";

import { useState } from 'react';
import PaginationDpad from '@/components/paginationDpad';
import usePokemonAllQuery from '@/hooks/usePokemonAllQuery';
import usePokemonDetail from '@/hooks/usePokemonDetail';
import RightPanel from '@/components/rightPanel';
import MainScreen from '@/components/mainScreen';
import PokemonDetail from '@/components/pokemonDetail';

export default function Home() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [generation, setGeneration] = useState('generation-i');
  const [page, setPage] = useState(0);
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const limit = 6;

  const { pokemons, loading, error, count } = usePokemonAllQuery({
    limit,
    offset: page * limit,
    name: search,
    type,
    generation,
  });

  const { pokemon, loading: loadingDetail, error: errorDetail } = usePokemonDetail(selectedPokemonName);

  return (
    <div className="pokedex-container font-mono">
      <div className="pokedex pixel-corners">
        <div className="left-panel">
          <div className="top-lights pixel-corners">
            <div></div><div></div><div></div>
          </div>
          <div className="main-screen pixel-corners">
            {selectedPokemonName ? (
              loadingDetail ? (
                <p className="text-white m-5">Loading detail…</p>
              ) : errorDetail ? (
                <p className="text-red-500 m-5">Error: {errorDetail.message}</p>
              ) : (
                <PokemonDetail
                  pokemon={pokemon}
                  onBack={() => setSelectedPokemonName(null)}
                />
              )
            ) : (
              <MainScreen
                pokemons={pokemons}
                loading={loading}
                error={error}
                onSelectPokemon={(p) => setSelectedPokemonName(p.name)}
              />
            )}
          </div>
          <div className="bottom-controls">
          {!selectedPokemonName &&
            <PaginationDpad
              page={page}
              setPage={setPage}
              total={count}
              limit={limit}
            />}
          </div>
          {!selectedPokemonName &&
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
            </div>}
        </div>

        <RightPanel
          generation={generation}
          setGeneration={setGeneration}
          setPage={setPage}
          pokemon={pokemon}
        />
      </div>
    </div>
  );
}