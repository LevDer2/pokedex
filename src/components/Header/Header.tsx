import { MoonIcon, SunIcon } from '../Icons/Icons';
import './Header.css';

interface HeaderProps {
  onThemeToggle: () => void;
}

export default function Header({ onThemeToggle }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Перейти до вмісту
      </a>
      <div className="brand" aria-label="Покедекс">
        <span className="pokeball-logo" aria-hidden="true" />
        <span>Pokedex</span>
      </div>
      <nav className="main-nav" aria-label="Основна навігація">
        <button type="button" className="nav-item is-active" aria-current="page">
          Головна
        </button>
        <button type="button" className="nav-item">
          Обране
        </button>
        <button type="button" className="nav-item">
          Команда
        </button>
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
