import bulbasaur from '../assets/pokemon/1.png';
import ivysaur from '../assets/pokemon/2.png';
import venusaur from '../assets/pokemon/3.png';
import type { PokemonModalData } from '../components/PokemonModal/PokemonModal';

// Приклад для верстки. Пізніше заміни його даними вибраного покемона з API.
export const demoPokemonDetails: PokemonModalData = {
  number: '001',
  name: 'Бульбазавр',
  image: bulbasaur,
  description:
    'На спині Бульбазавра росте насінина. Вона накопичує поживні речовини та зростає разом із ним, поступово перетворюючись на бутон.',
  height: '0,7 м',
  weight: '6,9 кг',
  category: 'Насіннєвий',
  ability: 'Буйний ріст',
  // Ручний переклад англійського effect_entries з /ability/overgrow/.
  abilityDescription:
    'Коли у покемона залишається третина максимального здоров’я або менше, його атаки трав’яного типу завдають у 1,5 раза більше шкоди.',
  // Підтверджено /evolution-chain/1/. Кожен масив — окрема гілка від початку до кінця.
  evolutionPaths: [
    [
      {
        number: '001',
        name: 'Бульбазавр',
        image: bulbasaur,
        types: [
          { type: 'grass', label: 'Трав’яний' },
          { type: 'poison', label: 'Отруйний' },
        ],
      },
      {
        number: '002',
        name: 'Айвізавр',
        image: ivysaur,
        condition: 'Рівень 16',
        types: [
          { type: 'grass', label: 'Трав’яний' },
          { type: 'poison', label: 'Отруйний' },
        ],
      },
      {
        number: '003',
        name: 'Венузавр',
        image: venusaur,
        condition: 'Рівень 32',
        types: [
          { type: 'grass', label: 'Трав’яний' },
          { type: 'poison', label: 'Отруйний' },
        ],
      },
    ],
  ],
  types: [
    { type: 'grass', label: 'Трав’яний' },
    { type: 'poison', label: 'Отруйний' },
  ],
  weaknesses: [
    { type: 'fire', label: 'Вогняний' },
    { type: 'flying', label: 'Літаючий' },
    { type: 'ice', label: 'Крижаний' },
    { type: 'psychic', label: 'Психічний' },
  ],
  stats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
};
