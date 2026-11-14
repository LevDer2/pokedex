import PokemonCatalog from '../PokemonCatalog/PokemonCatalog';
import Hero from '../Hero/Hero';

interface MainSectionProps {
  openPokemonModal: (id?: number) => void;
}

function MainSection({ openPokemonModal }: MainSectionProps) {
  return (
    <>
      <Hero />
      <PokemonCatalog openPokemonModal={openPokemonModal} />
    </>
  );
}

export default MainSection;
