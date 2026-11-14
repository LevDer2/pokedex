import { IoIosSearch } from 'react-icons/io';
import './SearchBar.css';

interface SearchBarProps {
  isLoading: boolean;
  onClear: () => void;
}

export default function SearchBar({ isLoading, onClear }: SearchBarProps) {
  return (
    <div className="search-bar" role="search">
      <div className="search-field">
        <label className="visually-hidden" htmlFor="pokemon-search">
          Search Pokémon by name
        </label>
        <IoIosSearch />
        <input
          id="pokemon-search"
          name="pokemon-search"
          type="search"
          placeholder="Search by name…"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          disabled={isLoading}
          onChange={(event) => {
            if (event.currentTarget.value === '') {
              onClear();
            }
          }}
        />
      </div>
      <button className="button button-primary search-button" type="submit" disabled={isLoading}>
        {isLoading ? 'Searching…' : 'Search'}
      </button>
    </div>
  );
}
