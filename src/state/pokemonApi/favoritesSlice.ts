import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoritePokemon {
  number: string;
  name: string;
  image: string;
  types?: { type: string; label: string }[];
}

const loadFavorites = (): FavoritePokemon[] => {
  try {
    const saved = localStorage.getItem('favorites');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const initialState: FavoritePokemon[] = loadFavorites();

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FavoritePokemon>) => {
      const pokemon = action.payload;
      const isAlreadyFavorite = state.some((item) => item.number === pokemon.number);

      if (!isAlreadyFavorite) {
        state.push(pokemon);
      } else if (isAlreadyFavorite) {
        return state.filter((item) => item.number !== pokemon.number);
      }
    },
    deleteAllFavoritePokemon: (state) => {
      state.length = 0;
    },
  },
});

export const { addToFavorite, deleteAllFavoritePokemon } = favoriteSlice.actions;
export default favoriteSlice.reducer;
