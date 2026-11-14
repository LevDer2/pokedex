import { FaDownload } from 'react-icons/fa6';
import './LoadMore.css';
import type { Dispatch, RootState } from '../../state/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMorePokemon } from '../../state/pokemonApi/pokemonLoadMoreSlice.ts';

export default function LoadMore() {
  const dispatch = useDispatch<Dispatch>();
  const { isLoading, hasMore } = useSelector((state: RootState) => state.pokemonLoadMore);
  return (
    <div className="catalog-more">
      <button
        className="button button-primary load-more"
        type="button"
        disabled={isLoading || !hasMore}
        onClick={() => void dispatch(fetchMorePokemon())}
      >
        <FaDownload />
        {isLoading ? 'Loading…' : 'Load more'}
      </button>
    </div>
  );
}
