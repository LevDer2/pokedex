import { HeartIcon } from '../Icons/Icons';
import './PokemonCard.css';

export interface PokemonCardProps {
  number: string;
  name: string;
  image: string;
  openPokemonModal?: (id: number) => void;
}

export default function PokemonCard({ number, name, image, openPokemonModal }: PokemonCardProps) {
  return (
    <article className="pokemon-card" onClick={() => openPokemonModal?.(Number(number))}>
      <button className="favorite-button" type="button" aria-label={`Додати ${name} до обраного`}>
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
        <h3>{name}</h3>
      </div>
    </article>
  );
}
