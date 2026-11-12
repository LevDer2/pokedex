import { MoonIcon, SunIcon } from '../Icons/Icons';
import './Header.css';
import { NavLink } from 'react-router';

interface HeaderProps {
  onThemeToggle: () => void;
}

export default function Header({ onThemeToggle }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Перейти до вмісту
      </a>
      <div className="brand" aria-label="Pokedex">
        <span className="pokeball-logo" aria-hidden="true" />
        <span>Pokedex</span>
      </div>
      <nav className="main-nav" aria-label="Основна навігація">
        <NavLink
          className={({ isActive }) => (isActive ? 'nav-item is-active' : 'nav-item')}
          to="/"
          end
        >
          Головна
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? 'nav-item is-active' : 'nav-item')}
          to="/favorites"
        >
          Обране
        </NavLink>
      </nav>
      <button
        className="theme-toggle"
        onClick={onThemeToggle}
        type="button"
        aria-label="Змінити тему"
        title="Змінити тему"
      >
        <span className="theme-icon-moon">
          <MoonIcon />
        </span>
        <span className="theme-icon-sun">
          <SunIcon />
        </span>
      </button>
    </header>
  );
}
