import PokemonCard from '../PokemonCard/PokemonCard';
import type { PokemonCardProps } from '../PokemonCard/PokemonCard';
import './PokemonList.css';

export default function PokemonList({ pokemon }: { pokemon: PokemonCardProps[] }) {
  return (
    <div className="pokemon-grid">
      {pokemon.map((item) => (
        <PokemonCard key={item.number} {...item} />
      ))}
    </div>
  );
}
