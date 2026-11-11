import SearchBar from '../SearchBar/SearchBar';
import TypeFilter from '../TypeFilter/TypeFilter';
import { DiceIcon } from '../Icons/Icons';
import type { SubmitEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch, RootState } from '../../state/store';
import './CatalogToolbar.css';
import { fetchPokemonByName, resetSearch } from '../../state/pokemonApi/pokemonSearchSlice';

interface CatalogToolbarProps {
  onRandomPokemon: () => void;
}

export default function CatalogToolbar({ onRandomPokemon }: CatalogToolbarProps) {
  const dispatch = useDispatch<Dispatch>();
  const isLoading = useSelector((state: RootState) => state.pokemonSearch.isLoading);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('pokemon-search') ?? '').trim();
    const pokemonType = String(formData.get('pokemon-type') ?? 'all');

    if (isLoading) return;

    if (!name && pokemonType === 'all') {
      dispatch(resetSearch());
      return;
    }

    void dispatch(fetchPokemonByName({ name, pokemonType }));
  }
  return (
    <form className="catalog-toolbar" onSubmit={handleSubmit}>
      <SearchBar isLoading={isLoading} onClear={() => dispatch(resetSearch())}/>
      <TypeFilter />
      <button className="button button-random" type="button" onClick={onRandomPokemon}>
        <DiceIcon />
        Випадковий покемон
      </button>
    </form>
  );
}
