import SearchBar from '../SearchBar/SearchBar';
import TypeFilter from '../TypeFilter/TypeFilter';
import { DiceIcon } from '../Icons/Icons';
import './CatalogToolbar.css';

export default function CatalogToolbar() {
  return (
    <form className="catalog-toolbar" role="group" aria-label="Пошук і фільтрація покемонів">
      <SearchBar />
      <TypeFilter />
      <button className="button button-random" type="button">
        <DiceIcon />
        Випадковий покемон
      </button>
    </form>
  );
}
