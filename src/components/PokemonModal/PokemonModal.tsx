import { type Ref, useId } from 'react';
import PokemonAbility from '../PokemonAbility/PokemonAbility';
import PokemonEvolution, { type PokemonEvolutionStage } from '../PokemonEvolution/PokemonEvolution';
import './PokemonModal.css';

export type PokemonElement =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export interface PokemonBadge {
  type: PokemonElement;
  label: string;
}

export interface PokemonModalData {
  number: string;
  name: string;
  image: string;
  description: string;
  height: string;
  weight: string;
  category: string;
  ability: string;
  abilityDescription?: string;
  evolutionPaths?: PokemonEvolutionStage[][];
  types: PokemonBadge[];
  weaknesses: PokemonBadge[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

interface PokemonModalProps {
  ref: Ref<HTMLDialogElement>;
  pokemon: PokemonModalData;
}

const statLabels = [
  { key: 'hp', label: 'Здоров’я', short: 'HP' },
  { key: 'attack', label: 'Атака', short: 'ATK' },
  { key: 'defense', label: 'Захист', short: 'DEF' },
  { key: 'specialAttack', label: 'Спец. атака', short: 'SPA' },
  { key: 'specialDefense', label: 'Спец. захист', short: 'SPD' },
  { key: 'speed', label: 'Швидкість', short: 'SPE' },
] as const;

export default function PokemonModal({ ref, pokemon }: PokemonModalProps) {
  const titleId = useId();

  return (
    <dialog className="pokemon-modal" ref={ref} aria-labelledby={titleId}>
      <header className="pokemon-modal-header">
        <span className="pokemon-modal-eyebrow">World of Pokemon's</span>
        <form method="dialog">
          <button className="pokemon-modal-close" aria-label="Close Modal" autoFocus>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M6 18 18 6" />
            </svg>
          </button>
        </form>
      </header>

      <div className="pokemon-modal-body">
        <div className="pokemon-modal-visual">
          <div className="pokemon-modal-artwork">
            <span className="pokemon-modal-art-number" aria-hidden="true">
              #{pokemon.number}
            </span>
            <span className="pokemon-modal-pokeball" aria-hidden="true" />
            {pokemon.image ? (
              <img src={pokemon.image} alt={pokemon.name} width="360" height="360" />
            ) : (
              <span className="pokemon-modal-no-image">There is no image</span>
            )}
          </div>
          <section className="pokemon-modal-weaknesses" aria-label="Pokemon Weaknesses">
            <h3>Weakness</h3>
            <div className="pokemon-modal-badges">
              {pokemon.weaknesses.map(({ type, label }) => (
                <span key={type} className={`pokemon-modal-badge pokemon-modal-badge--${type}`}>
                  {label}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="pokemon-modal-details">
          <p className="pokemon-modal-number">№ {pokemon.number}</p>
          <h2 id={titleId}>{pokemon.name}</h2>
          <div className="pokemon-modal-badges" aria-label="Типи покемона">
            {pokemon.types.map(({ type, label }) => (
              <span key={type} className={`pokemon-modal-badge pokemon-modal-badge--${type}`}>
                {label}
              </span>
            ))}
          </div>
          <p className="pokemon-modal-description">{pokemon.description}</p>

          <dl className="pokemon-modal-facts">
            <div>
              <dt>Height</dt>
              <dd>{pokemon.height}</dd>
            </div>
            <div>
              <dt>Weight</dt>
              <dd>{pokemon.weight}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{pokemon.category}</dd>
            </div>
            <div>
              <dt>Abilities</dt>
              <dd>
                <PokemonAbility
                  key={pokemon.number}
                  name={pokemon.ability}
                  description={pokemon.abilityDescription}
                />
              </dd>
            </div>
          </dl>

          <section className="pokemon-modal-stats" aria-label="Базові характеристики">
            <div className="pokemon-modal-stats-heading">
              <h3>Stats</h3>
              <span>from 0 to 255</span>
            </div>
            <dl className="pokemon-modal-stat-list">
              {statLabels.map(({ key, label }) => (
                <div className={`pokemon-modal-stat pokemon-modal-stat--${key}`} key={key}>
                  <dt>{label}</dt>
                  <dd>
                    <span className="pokemon-modal-stat-track" aria-hidden="true">
                      <span
                        style={{
                          width: `${Math.min(100, Math.max(0, (pokemon.stats[key] / 255) * 100))}%`,
                        }}
                      />
                    </span>
                    <span className="pokemon-modal-stat-value">{pokemon.stats[key]}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      {pokemon.evolutionPaths && (
        <PokemonEvolution paths={pokemon.evolutionPaths} currentNumber={pokemon.number} />
      )}

      <footer className="pokemon-modal-footer">
        <span>Кожен покемон — нове відкриття.</span>
        <form method="dialog">
          <button className="button button-primary">Повернутися до каталогу</button>
        </form>
      </footer>
    </dialog>
  );
}
