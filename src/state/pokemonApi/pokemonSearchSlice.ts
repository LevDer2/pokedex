import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchPokemon } from '../../api/pokemonApi';

interface PokemonSearchState {
  name: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: PokemonSearchState = {
  name: '',
  isLoading: false,
  error: null,
};

export const fetchPokemonByName = createAsyncThunk<string, string>(
  'pokemonSearch/fetchByName',
  async (name) => {
    const pokemon = await searchPokemon(name.trim());
    return pokemon.name;
  },
);

const pokemonSearchSlice = createSlice({
  name: 'pokemonSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonByName.pending, (state) => {
        state.isLoading = true;
        state.name = '';
        state.error = null;
      })
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload;
      })
      .addCase(fetchPokemonByName.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Не вдалося знайти покемона. Перевір ім’я та підключення.';
      });
  },
});

export default pokemonSearchSlice.reducer;
