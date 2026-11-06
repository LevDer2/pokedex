import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '../Icons/Icons';
import './TypeFilter.css';
import { getPokemonTypes } from '../../api/pokemonApi';

export default function TypeFilter() {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadTypes() {
      try {
        const data = await getPokemonTypes();
        const pokemonTypes = data.map((item) => item.name);
        if (!cancelled) {
          setTypes(pokemonTypes);
        }
      } catch (error) {
        console.error('Failed to load Pokemon types:', error);
      }
    }
    void loadTypes();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="type-filter">
      <label className="visually-hidden" htmlFor="pokemon-type">
        Pokemon type:
      </label>

      <select id="pokemon-type" name="pokemon-type" defaultValue="all">
        <option value="all">All types</option>

        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>

      <ChevronDownIcon />
    </div>
  );
}
