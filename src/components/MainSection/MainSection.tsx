import { useEffect, useRef, useState } from 'react';
import PokemonCatalog from '../PokemonCatalog/PokemonCatalog.tsx';
import Hero from '../Hero/Hero.tsx';
import PokemonModal, { type PokemonModalData } from '../PokemonModal/PokemonModal.tsx';
import { getPokemonModalData } from '../../api/getPokemonModalData.ts';

function MainSection() {
  const pokemonModalRef = useRef<HTMLDialogElement>(null);
  const [pokemonDetailsModal, setPokemonDetailsModal] = useState<PokemonModalData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pokemonDetailsModal && !pokemonModalRef.current?.open) {
      pokemonModalRef.current?.showModal();
    }
  }, [pokemonDetailsModal]);

  async function handleOpenPokemonModal(id?: number) {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const pokemonId = id ?? Math.floor(Math.random() * 1025) + 1;
      const result = await getPokemonModalData(pokemonId);
      setPokemonDetailsModal(result);
    } catch (error) {
      console.error(error);
      setError('Failed to load Pokémon. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Hero />
      <PokemonCatalog openPokemonModal={handleOpenPokemonModal} />
      {isLoading && <p role="status">Loading a random Pokémon...</p>}
      {error && <p role="alert">{error}</p>}
      {pokemonDetailsModal && <PokemonModal ref={pokemonModalRef} pokemon={pokemonDetailsModal} />}
    </>
  );
}

export default MainSection;
