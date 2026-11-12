import CatalogToolbar from '../CatalogToolbar/CatalogToolbar';
import LoadMore from '../LoadMore/LoadMore';
import PokemonList from '../PokemonList/PokemonList';
import './PokemonCatalog.css';
import type { Dispatch, RootState } from '../../state/store.ts';
import { POKEMON_DETAILS_LIMIT } from '../../api/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMorePokemon } from '../../state/pokemonApi/pokemonLoadMoreSlice.ts';

interface PokemonCatalogProps {
  openPokemonModal: () => void;
}

export default function PokemonCatalog({ openPokemonModal }: PokemonCatalogProps) {
  const { query, matches, isLoading, error } = useSelector(
    (state: RootState) => state.pokemonSearch,
  );
  const hasSearch = query !== '';
  const loadedPokemon = useSelector((state: RootState) => state.pokemonLoadMore.pokemon);
  const resultCount = hasSearch ? matches.length : loadedPokemon.length;

  const dispatch = useDispatch<Dispatch>();
  const { pages } = useSelector((state: RootState) => state.pokemonLoadMore);

  useEffect(() => {
    if (pages === 0) {
      void dispatch(fetchMorePokemon());
    }
  }, [dispatch, pages]);

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <CatalogToolbar onRandomPokemon={openPokemonModal} />
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
            <PokemonList names={matches} openPokemonModal={openPokemonModal} />
          ) : (
            <p className="catalog-message" role="status">
              Not founded matches for: {query}
            </p>
          )}
        </>
      )}
      {!hasSearch && (
        <>
          <PokemonList pokemon={loadedPokemon} openPokemonModal={openPokemonModal} />
          <LoadMore />
        </>
      )}
    </section>
  );
}
