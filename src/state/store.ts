import { configureStore } from '@reduxjs/toolkit';
import pokemonSearchReducer from './pokemonApi/pokemonSearchSlice.ts';

export const store = configureStore({
  reducer: {
    pokemonSearch: pokemonSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
