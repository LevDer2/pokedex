import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import PokemonCatalog from './components/PokemonCatalog/PokemonCatalog';
import { demoPokemon } from './data/demoPokemon';
import './App.css';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? 'dark' : 'light';
  });

  function handleThemeToggle() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }

  return (
    <div className="pokedex-app" data-theme={theme}>
      <Header onThemeToggle={handleThemeToggle} />
      <main id="main-content">
        <Hero />
        <PokemonCatalog pokemon={demoPokemon} />
      </main>
    </div>
  );
}

export default App;
