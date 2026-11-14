import { Link } from 'react-router';
import PokemonCard from '../PokemonCard/PokemonCard';
import './Favorite.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../state/store.ts';
import { deleteAllFavoritePokemon } from '../../state/pokemonApi/favoritesSlice.ts';
import { IoHeart } from 'react-icons/io5';
import { toast } from 'react-toastify';

interface FavoriteProps {
  openPokemonModal: (id?: number) => void;
}

export default function Favorite({ openPokemonModal }: FavoriteProps) {
  const favoritesPokemon = useSelector((state: RootState) => state.favorite);
  const dispatch = useDispatch();
  function deleteAllPokemonsFromFavorite() {
    dispatch(deleteAllFavoritePokemon());
    toast.error("You delete all Pokemon's from Favorite");
  }
  return (
    <section className="favorites" aria-labelledby="favorites-title">
      <header className="favorites-heading">
        <span className="favorites-heart">
          <IoHeart />
        </span>
        <div>
          <h1 id="favorites-title" className="display-title">
            My Favorites
          </h1>
          <p>Keep your favorite Pokémon in one place.</p>
        </div>
      </header>

      {favoritesPokemon.length > 0 ? (
        <>
          <div className="favorites-grid">
            {favoritesPokemon.map((item) => (
              <PokemonCard key={item.number} {...item} openPokemonModal={openPokemonModal} />
            ))}
          </div>

          <div className="favorites-summary">
            <p>
              <span className="favorites-info-icon" aria-hidden="true">
                i
              </span>
              <span>
                Saved Pokémon: <strong>{favoritesPokemon.length}</strong>
              </span>
            </p>
            <button
              className="button favorites-clear"
              type="button"
              onClick={() => deleteAllPokemonsFromFavorite()}
            >
              Clear all
            </button>
          </div>
        </>
      ) : (
        <div className="favorites-empty">
          <span className="favorites-heart">
            <IoHeart />
          </span>
          <h2>No favorites yet</h2>
          <p>Tap the heart on a Pokémon card to save it here.</p>
          <Link className="button button-primary" to="/">
            Browse Pokémon
          </Link>
        </div>
      )}
    </section>
  );
}
