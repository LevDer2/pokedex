import { Link } from 'react-router';
import { HeartIcon } from '../Icons/Icons';
import PokemonCard from '../PokemonCard/PokemonCard';
import './Favorite.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../state/store.ts';
import { deleteAllFavoritePokemon } from '../../state/pokemonApi/favoritesSlice.ts';

export default function Favorite() {
  const favoritesPokemon = useSelector((state: RootState) => state.favorite);
  const dispatch = useDispatch();

  return (
    <section className="favorites" aria-labelledby="favorites-title">
      <header className="favorites-heading">
        <span className="favorites-heart">
          <HeartIcon />
        </span>
        <div>
          <h1 id="favorites-title">Моє обране</h1>
          <p>Тут зберігаються покемони, яких ти додав до обраного.</p>
        </div>
      </header>

      {favoritesPokemon.length > 0 ? (
        <>
          <div className="favorites-grid">
            {favoritesPokemon.map((item) => (
              <PokemonCard key={item.number} {...item} />
            ))}
          </div>

          <div className="favorites-summary">
            <p>
              <span className="favorites-info-icon" aria-hidden="true">
                i
              </span>
              <span>
                Покемонів в обраному: <strong>{favoritesPokemon.length}</strong>
              </span>
            </p>
            <button
              className="button favorites-clear"
              type="button"
              onClick={() => dispatch(deleteAllFavoritePokemon())}
            >
              Очистити все
            </button>
          </div>
        </>
      ) : (
        <div className="favorites-empty">
          <span className="favorites-heart">
            <HeartIcon />
          </span>
          <h2>Обране поки порожнє</h2>
          <p>Додай покемонів із каталогу, щоб бачити їх тут.</p>
          <Link className="button button-primary" to="/">
            До каталогу
          </Link>
        </div>
      )}
    </section>
  );
}
