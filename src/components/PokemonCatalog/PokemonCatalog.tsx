import CatalogToolbar from '../CatalogToolbar/CatalogToolbar';
import LoadMore from '../LoadMore/LoadMore';
import type { PokemonCardProps } from '../PokemonCard/PokemonCard';
import PokemonList from '../PokemonList/PokemonList';
import './PokemonCatalog.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../state/store.ts';
import { POKEMON_DETAILS_LIMIT } from '../../api/pokemonApi';

interface PokemonCatalogProps {
  pokemon: PokemonCardProps[];
}

export default function PokemonCatalog({ pokemon }: PokemonCatalogProps) {
  const { query, matches, isLoading, error } = useSelector(
    (state: RootState) => state.pokemonSearch,
  );
  const hasSearch = query !== '';
  const resultCount = hasSearch ? matches.length : pokemon.length;

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <CatalogToolbar />
      <div className="catalog-heading">
        <h2 id="catalog-title">{hasSearch ? 'Results of searching' : "Catalog Pokemon's"}</h2>
        <p>
          Founded: <strong>{resultCount}</strong>
        </p>
      </div>
      {isLoading && (
        <p className="catalog-message" role="status">
          Searching Pokemon...
        </p>
      )}
      {error && (
        <p className="catalog-message" role="alert">
          {error}
        </p>
      )}
      {!isLoading && !error && hasSearch && (
        <>
          <p className="catalog-search-query">All matches for: {query}</p>
          {matches.length > POKEMON_DETAILS_LIMIT && (
            <p className="catalog-search-query">
              Shows {POKEMON_DETAILS_LIMIT} from {matches.length} query. Write your pokemon name
              more clearly for more better results
            </p>
          )}
          {matches.length > 0 ? (
            <PokemonList names={matches} />
          ) : (
            <p className="catalog-message" role="status">
              Not founded matches for: {query}
            </p>
          )}
        </>
      )}
      {!hasSearch && (
        <>
          <PokemonList pokemon={pokemon} />
          <LoadMore />
        </>
      )}
    </section>
  );
}
