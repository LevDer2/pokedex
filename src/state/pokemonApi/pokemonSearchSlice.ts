import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPokemonNames } from '../../api/pokemonApi.ts';

interface PokemonSearchState {
  query: string;
  matches: string[];
  allNames: string[];
  hasLoadedList: boolean;
  isLoading: boolean;
  error: string | null;
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
  string,
  { state: { pokemonSearch: PokemonSearchState }; rejectValue: string }
>(
  'pokemonSearch/fetchPokemonByName',
  async (name, { getState, rejectWithValue }) => {
    const query = name.trim().toLowerCase();
    const searchState = getState().pokemonSearch;

    try {
      const allNames = searchState.hasLoadedList ? searchState.allNames : await getPokemonNames();
      return {
        allNames,
        matches: allNames.filter((pokemonName) => pokemonName.toLowerCase().includes(query)),
      };
    } catch {
      return rejectWithValue("Can not download Pokemon's list");
    }
  },
  {
    condition: (name, { getState }) => {
      const query = name.trim().toLowerCase();
      const searchState = getState().pokemonSearch;

      if (!query || searchState.isLoading) return false;

      // Повтор успішного запиту ігноруємо, але після помилки дозволяємо спробувати знову.
      return query !== searchState.query || searchState.error !== null;
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
        state.query = action.meta.arg.trim().toLowerCase();
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
