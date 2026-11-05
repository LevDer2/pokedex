import bulbasaur from '../assets/pokemon/1.png';
import ivysaur from '../assets/pokemon/2.png';
import venusaur from '../assets/pokemon/3.png';
import charmander from '../assets/pokemon/4.png';
import charmeleon from '../assets/pokemon/5.png';
import charizard from '../assets/pokemon/6.png';
import squirtle from '../assets/pokemon/7.png';
import wartortle from '../assets/pokemon/8.png';
import blastoise from '../assets/pokemon/9.png';
import caterpie from '../assets/pokemon/10.png';
import type { PokemonCardProps } from '../components/PokemonCard/PokemonCard';

// Статичні приклади для верстки, без API та завантаження даних.
export const demoPokemon: PokemonCardProps[] = [
  { number: '001', name: 'Бульбазавр', image: bulbasaur },
  { number: '002', name: 'Айвізавр', image: ivysaur },
  { number: '003', name: 'Венузавр', image: venusaur },
  { number: '004', name: 'Чармандер', image: charmander },
  { number: '005', name: 'Чармелеон', image: charmeleon },
  {
    number: '006',
    name: 'Чарізард',
    image: charizard,
  },
  { number: '007', name: 'Сквіртл', image: squirtle },
  { number: '008', name: 'Вартортл', image: wartortle },
  { number: '009', name: 'Бластойз', image: blastoise },
  {
    number: '010',
    name: 'Катерпі',
    image: caterpie,
  },
];
