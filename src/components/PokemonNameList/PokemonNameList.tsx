import './PokemonNameList.css';

interface PokemonNameListProps {
  names: string[];
}

export default function PokemonNameList({ names }: PokemonNameListProps) {
  return (
    <ul className="pokemon-name-list" aria-label="Знайдені покемони">
      {names.map((name) => (
        <li className="pokemon-name-item" key={name}>
          {name}
        </li>
      ))}
    </ul>
  );
}
