import './Hero.css';
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 id="hero-title" className="display-title">
          Explore the world of <span>Pokémon</span>
        </h1>
        <p>Find Pokémon, discover their abilities, and save your favorites.</p>
      </div>
    </section>
  );
}
