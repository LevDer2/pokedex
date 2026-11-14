import { configureStore } from '@reduxjs/toolkit';
import pokemonSearchReducer from './pokemonApi/pokemonSearchSlice.ts';
import pokemonLoadMoreReducer from './pokemonApi/pokemonLoadMoreSlice.ts';
import favoritesReducer from './pokemonApi/favoritesSlice.ts';
import pokemonDetailsReducer from './pokemonModal/pokemonDetailsSlice.ts';

export const store = configureStore({
  reducer: {
    pokemonSearch: pokemonSearchReducer,
    pokemonLoadMore: pokemonLoadMoreReducer,
    favorite: favoritesReducer,
    details: pokemonDetailsReducer,
  },
});

store.subscribe(() => {
  const favorites = store.getState().favorite;
  localStorage.setItem('favorites', JSON.stringify(favorites));
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
