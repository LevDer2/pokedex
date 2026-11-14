import './PokemonCard.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../state/store.ts';
import { addToFavorite } from '../../state/pokemonApi/favoritesSlice.ts';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

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
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  function handleFavoriteClick() {
    dispatch(addToFavorite({ number, name, image, types }));

    if (isFavorite) {
      toast.info(`${displayName} removed from favorites.`);
    } else {
      toast.success(`${displayName} added to favorites.`);
    }
  }

  return (
    <article className="pokemon-card">
      <button
        className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
        type="button"
        aria-label={
          isFavorite ? `Remove ${displayName} from favorites` : `Add ${displayName} to favorites`
        }
        aria-pressed={isFavorite}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? <IoHeart /> : <IoHeartOutline />}
      </button>

      <div className="pokemon-artwork" onClick={() => openPokemonModal?.(Number(number))}>
        {image ? (
          <img src={image} alt={name} width="200" height="200" loading="lazy" />
        ) : (
          <span className="pokemon-image-placeholder">Image unavailable</span>
        )}
      </div>

      <div className="pokemon-info">
        <p className="pokemon-number">#{number}</p>
        <h3>{displayName}</h3>
        {!!types?.length && (
          <ul className="pokemon-types" aria-label="Pokémon types">
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
