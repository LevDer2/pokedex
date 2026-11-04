import { ArrowDownIcon } from '../Icons/Icons';
import './LoadMore.css';

export default function LoadMore() {
  return (
    <div className="catalog-more">
      <button className="button button-primary load-more" type="button">
        <ArrowDownIcon />
        Завантажити ще
      </button>
      <p>Попереду ще стільки відкриттів!</p>
    </div>
  );
}
