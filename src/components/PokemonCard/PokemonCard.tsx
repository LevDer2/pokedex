import { HeartIcon } from '../Icons/Icons';
import './PokemonCard.css';

export interface PokemonCardProps {
  number: string;
  name: string;
  image: string;
  types?: { type: string; label: string }[];
  isFavorite?: boolean;
  openPokemonModal?: (id: number) => void;
}

export default function PokemonCard({
  number,
  name,
  image,
  types,
  isFavorite = false,
  openPokemonModal,
}: PokemonCardProps) {
  return (
    <article className="pokemon-card" onClick={() => openPokemonModal?.(Number(number))}>
      <button
        className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
        type="button"
        aria-label={isFavorite ? `Видалити ${name} з обраного` : `Додати ${name} до обраного`}
        disabled={isFavorite}
      >
        <HeartIcon />
      </button>

      <div className="pokemon-artwork">
        {image ? (
          <img src={image} alt={name} width="200" height="200" loading="lazy" />
        ) : (
          <span className="pokemon-image-placeholder">No image</span>
        )}
      </div>

      <div className="pokemon-info">
        <p className="pokemon-number">#{number}</p>
        <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        {!!types?.length && (
          <ul className="pokemon-types" aria-label="Типи покемона">
            {types.map(({ type, label }) => (
              <li key={type} className={`type-badge type-${type}`}>
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
