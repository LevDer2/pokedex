import { useId } from 'react';
import './PokemonAbility.css';

interface PokemonAbilityProps {
  name: string;
  description?: string;
}

export default function PokemonAbility({ name, description }: PokemonAbilityProps) {
  const panelId = useId();
  const titleId = useId();

  if (!description) return <span>{name}</span>;

  return (
    <>
      <button
        className="pokemon-ability-trigger"
        type="button"
        popoverTarget={panelId}
        aria-label={`Про здібність: ${name}`}
      >
        {name}
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7.5" />
          <path d="M10 9v5M10 6v.5" />
        </svg>
      </button>

      <div
        className="pokemon-ability-panel"
        id={panelId}
        popover="auto"
        role="region"
        aria-labelledby={titleId}
      >
        <div className="pokemon-ability-panel-header">
          <span>Про здібність</span>
          <button type="button" popoverTarget={panelId} popoverTargetAction="hide">
            <span aria-hidden="true">×</span> Закрити
          </button>
        </div>
        <h3 id={titleId}>{name}</h3>
        <p>{description}</p>
      </div>
    </>
  );
}
