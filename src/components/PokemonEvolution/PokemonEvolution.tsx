import { useId } from 'react';
import type { PokemonBadge } from '../PokemonModal/PokemonModal';
import './PokemonEvolution.css';

export interface PokemonEvolutionStage {
  number: string;
  name: string;
  image: string;
  types: PokemonBadge[];
  condition?: string;
}

interface PokemonEvolutionProps {
  paths: PokemonEvolutionStage[][];
  currentNumber: string;
}

export default function PokemonEvolution({ paths, currentNumber }: PokemonEvolutionProps) {
  const titleId = useId();
  const availablePaths = paths.filter((path) => path.length > 0);

  if (availablePaths.length === 0) return null;

  return (
    <section className="pokemon-evolution" aria-labelledby={titleId}>
      <div className="pokemon-evolution-heading">
        <h3 id={titleId}>Еволюція</h3>
        <span>Шлях розвитку покемона</span>
      </div>
      {availablePaths.map((path) => (
        <ol className="pokemon-evolution-path" key={path.map((stage) => stage.number).join('-')}>
          {path.map((stage, index) => (
            <li
              className="pokemon-evolution-stage"
              key={stage.number}
              aria-current={stage.number === currentNumber ? 'step' : undefined}
            >
              {index > 0 && (
                <div className="pokemon-evolution-transition">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                  {stage.condition && <span>{stage.condition}</span>}
                </div>
              )}
              <div className="pokemon-evolution-portrait">
                {stage.image ? (
                  <img src={stage.image} alt={stage.name} width="160" height="160" loading="lazy" />
                ) : (
                  <span>Зображення відсутнє</span>
                )}
              </div>
              <p className="pokemon-evolution-name">{stage.name}</p>
              <p className="pokemon-evolution-number">№ {stage.number}</p>
              <div className="pokemon-modal-badges">
                {stage.types.map(({ type, label }) => (
                  <span key={type} className={`pokemon-modal-badge pokemon-modal-badge--${type}`}>
                    {label}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      ))}
      {availablePaths.length === 1 && availablePaths[0].length === 1 && (
        <p className="pokemon-evolution-note">Цей покемон не має еволюцій.</p>
      )}
    </section>
  );
}
