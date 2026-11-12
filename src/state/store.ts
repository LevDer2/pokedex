import { configureStore } from '@reduxjs/toolkit';
import pokemonSearchReducer from './pokemonApi/pokemonSearchSlice.ts';
import pokemonLoadMoreReducer from './pokemonApi/pokemonLoadMoreSlice.ts';

export const store = configureStore({
  reducer: {
    pokemonSearch: pokemonSearchReducer,
    pokemonLoadMore: pokemonLoadMoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
