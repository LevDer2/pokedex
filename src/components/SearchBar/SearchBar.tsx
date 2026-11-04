import { SearchIcon } from '../Icons/Icons';
import './SearchBar.css';

export default function SearchBar() {
  return (
    <div className="search-bar" role="search" aria-label="Пошук покемонів">
      <div className="search-field">
        <label className="visually-hidden" htmlFor="pokemon-search">
          Пошук покемона за ім’ям
        </label>
        <SearchIcon />
        <input
          id="pokemon-search"
          name="pokemon-search"
          type="search"
          placeholder="Пошук за ім’ям…"
          autoComplete="off"
        />
      </div>
      <button className="button button-primary search-button" type="button">
        Знайти
      </button>
    </div>
  );
}
