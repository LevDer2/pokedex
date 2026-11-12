import { useState } from 'react';
import { Route, Routes } from 'react-router';

import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import Favorite from './components/Favorite/Favorite';

import './App.css';

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
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
