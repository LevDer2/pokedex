import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PokemonModalData } from '../../components/PokemonModal/PokemonModal.tsx';
import { getPokemonModalData } from '../../api/getPokemonModalData.ts';

interface PokemonModalDetails {
  pokemonDetailsModal: PokemonModalData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PokemonModalDetails = {
  pokemonDetailsModal: null,
  isLoading: false,
  error: null,
};

export const loadPokemonDetails = createAsyncThunk(
  'details/loadPokemonDetails',
  async (id: number | undefined) => {
    const pokemonId = id ?? Math.floor(Math.random() * 1025) + 1;

    return await getPokemonModalData(pokemonId);
  },
);

const pokemonDetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPokemonDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadPokemonDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pokemonDetailsModal = action.payload;
      })
      .addCase(loadPokemonDetails.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to load Pokémon. Please try again.';
      });
  },
});

export default pokemonDetailsSlice.reducer;
