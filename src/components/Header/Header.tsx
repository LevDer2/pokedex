import './Header.css';
import { NavLink } from 'react-router';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

interface HeaderProps {
  onThemeToggle: () => void;
}

export default function Header({ onThemeToggle }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="brand">
        <span className="pokeball-logo" aria-hidden="true" />
        <span>
          Poké<span className="brand-accent">dex</span>
        </span>
      </div>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink
          className={({ isActive }) => (isActive ? 'nav-item is-active' : 'nav-item')}
          to="/"
          end
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? 'nav-item is-active' : 'nav-item')}
          to="/favorites"
        >
          Favorites
        </NavLink>
      </nav>
      <button
        className="theme-toggle"
        onClick={onThemeToggle}
        type="button"
        aria-label="Toggle color theme"
        title="Toggle color theme"
      >
        <span className="theme-icon-moon">
          <IoMoonOutline />
        </span>
        <span className="theme-icon-sun">
          <IoSunnyOutline />
        </span>
      </button>
    </header>
  );
}
