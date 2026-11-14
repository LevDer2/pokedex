import { useId } from 'react';
import './PokemonAbility.css';
import { IoIosInformationCircle } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

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
        aria-label={`About ${name}`}
      >
        {name}
        <IoIosInformationCircle />
      </button>

      <div
        className="pokemon-ability-panel"
        id={panelId}
        popover="auto"
        role="region"
        aria-labelledby={titleId}
      >
        <div className="pokemon-ability-panel-header">
          <span>Ability details</span>
          <button type="button" popoverTarget={panelId} popoverTargetAction="hide">
            <IoCloseOutline />
            Close
          </button>
        </div>
        <h3 id={titleId}>{name}</h3>
        <p>{description}</p>
      </div>
    </>
  );
}
