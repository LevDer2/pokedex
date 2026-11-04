import CatalogToolbar from '../CatalogToolbar/CatalogToolbar';
import LoadMore from '../LoadMore/LoadMore';
import type { PokemonCardProps } from '../PokemonCard/PokemonCard';
import PokemonList from '../PokemonList/PokemonList';
import './PokemonCatalog.css';

interface PokemonCatalogProps {
  pokemon: PokemonCardProps[];
}

export default function PokemonCatalog({ pokemon }: PokemonCatalogProps) {
  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <CatalogToolbar />
      <div className="catalog-heading">
        <h2 id="catalog-title">Каталог покемонів</h2>
        <p>
          Знайдено: <strong>10 покемонів</strong>
        </p>
      </div>
      <PokemonList pokemon={pokemon} />
      <LoadMore />
    </section>
  );
}
