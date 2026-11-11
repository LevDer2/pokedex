import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import PokemonCatalog from './components/PokemonCatalog/PokemonCatalog';
import { demoPokemon } from './data/demoPokemon';
import PokemonModal from './components/PokemonModal/PokemonModal';
import { demoPokemonDetails } from './data/demoPokemonDetails';
import './App.css';
import { useRef, useState } from 'react';

function App() {
  const pokemonModalRef = useRef<HTMLDialogElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? 'dark' : 'light';
  });

  function handleThemeToggle() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }

  function handleOpenPokemonModal() {
    pokemonModalRef.current?.showModal();
  }

  return (
    <div className="pokedex-app" data-theme={theme}>
      <Header onThemeToggle={handleThemeToggle} />
      <main id="main-content">
        <Hero />
        <PokemonCatalog pokemon={demoPokemon} onRandomPokemon={handleOpenPokemonModal} />
      </main>
      <PokemonModal ref={pokemonModalRef} pokemon={demoPokemonDetails} />
    </div>
  );
}

export default App;
