import type { PokemonCardProps } from '../PokemonCard/PokemonCard';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonList.css';
import { useEffect, useState } from 'react';
import { getPokemonDetails, type PokemonDetails } from '../../api/pokemonApi.ts';

interface PokemonListProps {
  names?: string[];
  pokemon?: PokemonCardProps[];
}

interface PokemonListResult {
  names: string[];
  attempt: number;
  pokemon: PokemonDetails[];
  error: string | null;
}

const EMPTY_NAMES: string[] = [];

export default function PokemonList({ names = EMPTY_NAMES, pokemon = [] }: PokemonListProps) {
  const [result, setResult] = useState<PokemonListResult | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (names.length === 0) return;
    const controller = new AbortController();

    async function loadPokemon() {
      try {
        const data = await getPokemonDetails(names, controller.signal);

        if (controller.signal.aborted) return;

        setResult({ names, attempt, pokemon: data, error: null });
      } catch {
        if (controller.signal.aborted) return;

        controller.abort();
        setResult({
          names,
          attempt,
          pokemon: [],
          error: "Can't upload cards of Pokemon. Try again!",
        });
      }
    }

    void loadPokemon();

    return () => {
      controller.abort();
    };
  }, [names, attempt]);

  const currentResult = result?.names === names && result.attempt === attempt ? result : null;

  if (names.length > 0 && !currentResult) {
    return (
      <p className="pokemon-list-message" role="status">
        Loading cards of Pokemon...
      </p>
    );
  }

  if (names.length > 0 && currentResult?.error) {
    return (
      <div className="pokemon-list-message" role="alert">
        <p>{currentResult.error}</p>
        <button
          className="button button-primary"
          type="button"
          onClick={() => setAttempt((value) => value + 1)}
        >
          Try again
        </button>
      </div>
    );
  }

  const cards: PokemonCardProps[] =
    names.length > 0
      ? (currentResult?.pokemon ?? []).map((item) => ({
          number: String(item.id).padStart(3, '0'),
          name: item.name,
          image: item.sprites.front_default ?? '',
        }))
      : pokemon;

  return (
    <div className="pokemon-grid">
      {cards.map((item) => (
        <PokemonCard key={item.number} {...item} />
      ))}
    </div>
  );
}
