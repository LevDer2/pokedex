import { HeartIcon } from '../Icons/Icons';
import './PokemonCard.css';

export interface PokemonCardProps {
  number: string;
  name: string;
  image: string;
  types: { label: string; color: string }[];
}

export default function PokemonCard({ number, name, image, types }: PokemonCardProps) {
  return (
    <article className="pokemon-card">
      <button className="favorite-button" type="button" aria-label={`Додати ${name} до обраного`}>
        <HeartIcon />
      </button>
      <div className="pokemon-artwork">
        <img src={image} alt={name} width="200" height="200" loading="lazy" />
      </div>
      <div className="pokemon-info">
        <p className="pokemon-number">#{number}</p>
        <h3>{name}</h3>
        <ul className="pokemon-types" aria-label="Типи покемона">
          {types.map((type) => (
            <li className={`type-badge type-${type.color}`} key={type.label}>
              {type.label}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
