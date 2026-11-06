import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPokemonNames, getPokemonNamesByType } from '../../api/pokemonApi.ts';

interface PokemonSearchState {
  query: string;
  matches: string[];
  allNames: string[];
  hasLoadedList: boolean;
  isLoading: boolean;
  error: string | null;
}

interface PokemonSearchParams {
  name: string;
  pokemonType: string;
}

const initialState: PokemonSearchState = {
  query: '',
  matches: [],
  allNames: [],
  hasLoadedList: false,
  isLoading: false,
  error: null,
};

interface PokemonSearchResult {
  allNames: string[];
  matches: string[];
}

export const fetchPokemonByName = createAsyncThunk<
  PokemonSearchResult,
  PokemonSearchParams,
  { state: { pokemonSearch: PokemonSearchState }; rejectValue: string }
>(
  'pokemonSearch/fetchPokemonByName',
  async ({ name, pokemonType }, { getState, rejectWithValue }) => {
    const query = name.trim().toLowerCase().replace(/\s+/g, '-');
    const searchState = getState().pokemonSearch;

    try {
      const allNames = searchState.hasLoadedList ? searchState.allNames : await getPokemonNames();
      const typeNames =
        pokemonType === 'all' ? null : new Set(await getPokemonNamesByType(pokemonType));

      const matches = allNames.filter((pokemonName) => {
        const matchesName = pokemonName.includes(query);

        const matchesType = typeNames === null || typeNames.has(pokemonName);

        return matchesName && matchesType;
      });

      return {
        allNames,
        matches,
      };
    } catch {
      return rejectWithValue("Can not download Pokemon's list");
    }
  },
  {
    condition: (_params, { getState }) => {
      const searchState = getState().pokemonSearch;
      return !searchState.isLoading;
    },
  },
);

const pokemonSearchSlice = createSlice({
  name: 'pokemonSearch',
  initialState,
  reducers: {
    resetSearch(state) {
      if (state.isLoading) return;

      state.query = '';
      state.matches = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonByName.pending, (state, action) => {
        state.isLoading = true;
        state.query = action.meta.arg.name.trim().toLowerCase().replace(/\s+/g, '-');
        state.matches = [];
        state.error = null;
      })
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allNames = action.payload.allNames;
        state.hasLoadedList = true;
        state.matches = action.payload.matches;
      })
      .addCase(fetchPokemonByName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Try search your Pokemon later';
      });
  },
});

export const { resetSearch } = pokemonSearchSlice.actions;
export default pokemonSearchSlice.reducer;
