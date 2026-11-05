import SearchBar from '../SearchBar/SearchBar';
import TypeFilter from '../TypeFilter/TypeFilter';
import { DiceIcon } from '../Icons/Icons';
import type { SubmitEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch, RootState } from '../../state/store';
import './CatalogToolbar.css';
import { fetchPokemonByName, resetSearch } from '../../state/pokemonApi/pokemonSearchSlice';

export default function CatalogToolbar() {
  const dispatch = useDispatch<Dispatch>();
  const isLoading = useSelector((state: RootState) => state.pokemonSearch.isLoading);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('pokemon-search') ?? '').trim();

    if (isLoading) return;

    if (!name) {
      dispatch(resetSearch());
      return;
    }

    void dispatch(fetchPokemonByName(name));
  }
  return (
    <form className="catalog-toolbar" onSubmit={handleSubmit}>
      <SearchBar isLoading={isLoading} />
      <TypeFilter />
      <button className="button button-random" type="button">
        <DiceIcon />
        Випадковий покемон
      </button>
    </form>
  );
}
