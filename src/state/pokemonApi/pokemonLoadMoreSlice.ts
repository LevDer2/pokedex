import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPokemonDetails, getPokemonPage } from '../../api/pokemonApi';
import type { PokemonCardProps } from '../../components/PokemonCard/PokemonCard';

interface LoadMorePokemonState {
  isLoading: boolean;
  error: string | null;
  pages: number;
  pokemon: PokemonCardProps[];
  hasMore: boolean;
}

interface LoadMoreResult {
  pokemon: PokemonCardProps[];
  hasMore: boolean;
}

const initialState: LoadMorePokemonState = {
  isLoading: false,
  error: null,
  pages: 0,
  pokemon: [],
  hasMore: true,
};
export const fetchMorePokemon = createAsyncThunk<
  LoadMoreResult,
  void,
  {
    state: { pokemonLoadMore: LoadMorePokemonState };
    rejectValue: string;
  }
>(
  'pokemonLoadMore/fetchMorePokemon',
  async (_, { getState, rejectWithValue }) => {
    const { pages } = getState().pokemonLoadMore;
    const PAGE_SIZE = 20;
    const offset = pages * PAGE_SIZE;

    try {
      const page = await getPokemonPage(offset, PAGE_SIZE);
      const details = await getPokemonDetails(page.names);

      const pokemon: PokemonCardProps[] = details.map((item) => ({
        number: String(item.id).padStart(3, '0'),
        name: item.name,
        image:
          item.sprites.other?.['official-artwork']?.front_default ??
          item.sprites.front_default ??
          '',
      }));

      return {
        pokemon,
        hasMore: page.hasMore,
      };
    } catch {
      return rejectWithValue('Failed to load more Pokémon.');
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().pokemonLoadMore;
      return !state.isLoading && state.hasMore;
    },
  },
);

const pokemonLoadMoreSlice = createSlice({
  name: 'pokemonLoadMore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMorePokemon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMorePokemon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pages += 1;
        state.pokemon.push(...action.payload.pokemon);
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchMorePokemon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to load Pokémon.';
      });
  },
});

export default pokemonLoadMoreSlice.reducer;
