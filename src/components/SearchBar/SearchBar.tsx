import { SearchIcon } from '../Icons/Icons';
import './SearchBar.css';

interface SearchBarProps {
  isLoading: boolean;
}

export default function SearchBar({ isLoading }: SearchBarProps) {
  return (
    <div className="search-bar" role="search">
      <div className="search-field">
        <label className="visually-hidden" htmlFor="pokemon-search">
          Searching for name
        </label>
        <SearchIcon />
        <input
          id="pokemon-search"
          name="pokemon-search"
          type="search"
          placeholder="Пошук за ім’ям…"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          disabled={isLoading}
        />
      </div>
      <button className="button button-primary search-button" type="submit" disabled={isLoading}>
        {isLoading ? 'Search...' : 'Found'}
      </button>
    </div>
  );
}
