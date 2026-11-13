import { HeartIcon } from '../Icons/Icons';
import './PokemonCard.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../state/store.ts';
import { addToFavorite } from '../../state/pokemonApi/favoritesSlice.ts';

export interface PokemonCardProps {
  number: string;
  name: string;
  image: string;
  types?: { type: string; label: string }[];
  openPokemonModal?: (id: number) => void;
}

export default function PokemonCard({
  number,
  name,
  image,
  types,
  openPokemonModal,
}: PokemonCardProps) {
  const isFavorite = useSelector((state: RootState) =>
    state.favorite.some((pokemon) => pokemon.number === number),
  );
  const dispatch = useDispatch();

  return (
    <article className="pokemon-card">
      <button
        className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
        type="button"
        aria-label={isFavorite ? `Видалити ${name} з обраного` : `Додати ${name} до обраного`}
        onClick={() =>
          dispatch(
            addToFavorite({
              number,
              name,
              image,
              types,
            }),
          )
        }
      >
        <HeartIcon />
      </button>

      <div className="pokemon-artwork" onClick={() => openPokemonModal?.(Number(number))}>
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
