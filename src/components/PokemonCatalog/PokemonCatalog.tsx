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
        <h2 id="catalog-title" className="display-title">
          {hasSearch ? 'Search Results' : 'Pokémon Catalog'}
        </h2>
        <p>
          {hasSearch ? 'Matches' : 'Pokémon loaded'}: <strong>{resultCount}</strong>
        </p>
      </div>
      {isLoading && (
        <p className="catalog-message" role="status">
          Searching Pokémon…
        </p>
      )}
      {error && (
        <p className="catalog-message" role="alert">
          {error}
        </p>
      )}
      {!isLoading && !error && hasSearch && (
        <>
          <p className="catalog-search-query">Results for “{query}”</p>
          {matches.length > POKEMON_DETAILS_LIMIT && (
            <p className="catalog-search-query">
              Showing the first {POKEMON_DETAILS_LIMIT} of {matches.length} matches. Refine your
              search to narrow the results.
            </p>
          )}
          {matches.length > 0 ? (
            <PokemonList names={matches} openPokemonModal={openPokemonModal} />
          ) : (
            <p className="catalog-message" role="status">
              No Pokémon match “{query}”.
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
