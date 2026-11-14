import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import Favorite from './components/Favorite/Favorite';
import PokemonModal from './components/PokemonModal/PokemonModal';

import { loadPokemonDetails } from './state/pokemonModal/pokemonDetailsSlice';
import type { Dispatch, RootState } from './state/store';

import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? 'dark' : 'light';
  });

  const pokemonModalRef = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const { pokemonDetailsModal, isLoading, error } = useSelector(
    (state: RootState) => state.details,
  );

  useEffect(() => {
    if (pokemonDetailsModal && !pokemonModalRef.current?.open) {
      pokemonModalRef.current?.showModal();
    }
  }, [pokemonDetailsModal]);

  function handleOpenPokemonModal(id?: number) {
    if (isLoading) return;
    dispatch(loadPokemonDetails(id));
  }

  function handleThemeToggle() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }

  return (
    <div className="pokedex-app" data-theme={theme}>
      <Header onThemeToggle={handleThemeToggle} />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<MainSection openPokemonModal={handleOpenPokemonModal} />} />
          <Route
            path="/favorites"
            element={<Favorite openPokemonModal={handleOpenPokemonModal} />}
          />
        </Routes>

        {isLoading && <p role="status">Loading Pokémon details…</p>}
        {error && <p role="alert">{error}</p>}
        {pokemonDetailsModal && (
          <PokemonModal ref={pokemonModalRef} pokemon={pokemonDetailsModal} />
        )}
      </main>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        theme={theme}
        limit={1}
      />
    </div>
  );
}

export default App;
