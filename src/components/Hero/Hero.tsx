import './Hero.css';
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <span className="hero-eyebrow">Твоя пригода починається тут</span>
        <h1 id="hero-title">Досліджуй світ покемонів!</h1>
        <p>Знаходь, вивчай і збирай своїх улюблених покемонів.</p>
      </div>
    </section>
  );
}
