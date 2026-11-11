import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import PokemonCatalog from './components/PokemonCatalog/PokemonCatalog';
import { demoPokemon } from './data/demoPokemon';
import PokemonModal, { type PokemonModalData } from './components/PokemonModal/PokemonModal';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { getPokemonModalData } from './api/getPokemonModalData';

function App() {
  const pokemonModalRef = useRef<HTMLDialogElement>(null);
  const [pokemonDetailsModal, setPokemonDetailsModal] = useState<PokemonModalData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? 'dark' : 'light';
  });

  function handleThemeToggle() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }

  useEffect(() => {
    if (pokemonDetailsModal && !pokemonModalRef.current?.open) {
      pokemonModalRef.current?.showModal();
    }
  }, [pokemonDetailsModal]);

  async function handleOpenPokemonModal() {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const randomId = Math.floor(Math.random() * 1025) + 1;

      const result = await getPokemonModalData(randomId);

      setPokemonDetailsModal(result);
    } catch (error) {
      console.error(error);
      setError('Failed to load Pokémon. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pokedex-app" data-theme={theme}>
      <Header onThemeToggle={handleThemeToggle} />

      <main id="main-content">
        <Hero />
        <PokemonCatalog pokemon={demoPokemon} onRandomPokemon={handleOpenPokemonModal} />
        {isLoading && <p role="status">Loading a random Pokémon...</p>}
        {error && <p role="alert">{error}</p>}
      </main>
      {pokemonDetailsModal && <PokemonModal ref={pokemonModalRef} pokemon={pokemonDetailsModal} />}
    </div>
  );
}

export default App;
