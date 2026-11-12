import { Link } from 'react-router';
import { HeartIcon } from '../Icons/Icons';
import PokemonCard, { type PokemonCardProps } from '../PokemonCard/PokemonCard';
import './Favorite.css';

const artworkBase =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

const demoFavorites: readonly PokemonCardProps[] = [
  {
    number: '001',
    name: 'Бульбазавр',
    image: `${artworkBase}/1.png`,
    types: [
      { type: 'grass', label: 'Трав’яний' },
      { type: 'poison', label: 'Отруйний' },
    ],
  },
  {
    number: '004',
    name: 'Чармандер',
    image: `${artworkBase}/4.png`,
    types: [{ type: 'fire', label: 'Вогняний' }],
  },
  {
    number: '007',
    name: 'Сквіртл',
    image: `${artworkBase}/7.png`,
    types: [{ type: 'water', label: 'Водний' }],
  },
  {
    number: '025',
    name: 'Пікачу',
    image: `${artworkBase}/25.png`,
    types: [{ type: 'electric', label: 'Електричний' }],
  },
  {
    number: '133',
    name: 'Іві',
    image: `${artworkBase}/133.png`,
    types: [{ type: 'normal', label: 'Звичайний' }],
  },
  {
    number: '150',
    name: 'М’юту',
    image: `${artworkBase}/150.png`,
    types: [{ type: 'psychic', label: 'Психічний' }],
  },
  {
    number: '151',
    name: 'М’ю',
    image: `${artworkBase}/151.png`,
    types: [{ type: 'psychic', label: 'Психічний' }],
  },
];

interface FavoriteProps {
  pokemon?: readonly PokemonCardProps[];
}

export default function Favorite({ pokemon = demoFavorites }: FavoriteProps) {
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

      {pokemon.length > 0 ? (
        <>
          <div className="favorites-grid">
            {pokemon.map((item) => (
              <PokemonCard key={item.number} {...item} isFavorite />
            ))}
          </div>

          <div className="favorites-summary">
            <p>
              <span className="favorites-info-icon" aria-hidden="true">
                i
              </span>
              <span>
                Покемонів в обраному: <strong>{pokemon.length}</strong>
              </span>
            </p>
            <button className="button favorites-clear" type="button" disabled>
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
