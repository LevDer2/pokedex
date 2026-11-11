import { getPokemonSpecies, searchPokemon } from './pokemonApi';
import type {
  PokemonBadge,
  PokemonElement,
  PokemonModalData,
} from '../components/PokemonModal/PokemonModal';
import type { PokemonEvolutionStage } from '../components/PokemonEvolution/PokemonEvolution';

interface NamedResource {
  name: string;
  url: string;
}

interface ApiPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  abilities: {
    is_hidden: boolean;
    ability: NamedResource;
  }[];
  types: {
    type: NamedResource;
  }[];
  stats: {
    base_stat: number;
    stat: NamedResource;
  }[];
}

interface ApiSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: NamedResource;
  }[];
  genera: {
    genus: string;
    language: NamedResource;
  }[];
  evolution_chain: {
    url: string;
  };
}

interface ApiAbility {
  effect_entries: {
    short_effect: string;
    language: NamedResource;
  }[];
}

interface ApiType {
  damage_relations: {
    double_damage_from: NamedResource[];
    half_damage_from: NamedResource[];
    no_damage_from: NamedResource[];
  };
}

interface EvolutionDetail {
  trigger: NamedResource;
  min_level: number | null;
  item: NamedResource | null;
  held_item: NamedResource | null;
  known_move: NamedResource | null;
  min_happiness: number | null;
  time_of_day: string;
}

interface EvolutionLink {
  species: NamedResource;
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionLink[];
}

const POKEMON_TYPES: PokemonElement[] = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

function isPokemonElement(value: string): value is PokemonElement {
  return POKEMON_TYPES.includes(value as PokemonElement);
}

function capitalize(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function makeBadge(type: PokemonElement): PokemonBadge {
  return {
    type,
    label: capitalize(type),
  };
}

function getBadges(pokemon: ApiPokemon): PokemonBadge[] {
  return pokemon.types
    .map((item) => item.type.name)
    .filter(isPokemonElement)
    .map(makeBadge);
}

function getImage(pokemon: ApiPokemon): string {
  return (
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default ??
    ''
  );
}

function cleanText(value: string): string {
  return value
    .replace(/[\n\f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load Pokémon data: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function getWeaknesses(pokemon: ApiPokemon): Promise<PokemonBadge[]> {
  const typeData = await Promise.all(pokemon.types.map((item) => getJson<ApiType>(item.type.url)));

  const multipliers = new Map<PokemonElement, number>(POKEMON_TYPES.map((type) => [type, 1]));

  function apply(types: NamedResource[], factor: number) {
    for (const item of types) {
      if (!isPokemonElement(item.name)) continue;

      multipliers.set(item.name, (multipliers.get(item.name) ?? 1) * factor);
    }
  }

  for (const data of typeData) {
    apply(data.damage_relations.double_damage_from, 2);
    apply(data.damage_relations.half_damage_from, 0.5);
    apply(data.damage_relations.no_damage_from, 0);
  }

  return POKEMON_TYPES.filter((type) => (multipliers.get(type) ?? 1) > 1)
    .sort((a, b) => (multipliers.get(b) ?? 1) - (multipliers.get(a) ?? 1))
    .map(makeBadge);
}

function getEvolutionCondition(details: EvolutionDetail[]): string | undefined {
  const detail = details[0];

  if (!detail) return undefined;

  const conditions: string[] = [];

  if (detail.trigger.name === 'trade') {
    conditions.push('Trade');
  }

  if (detail.item) {
    conditions.push(`Use ${capitalize(detail.item.name)}`);
  }

  if (detail.held_item) {
    conditions.push(`Hold ${capitalize(detail.held_item.name)}`);
  }

  if (detail.min_level !== null) {
    conditions.push(`Level ${detail.min_level}`);
  }

  if (detail.min_happiness !== null) {
    conditions.push(`Friendship ${detail.min_happiness}+`);
  }

  if (detail.known_move) {
    conditions.push(`Know ${capitalize(detail.known_move.name)}`);
  }

  if (detail.time_of_day) {
    conditions.push(capitalize(detail.time_of_day));
  }

  return conditions.join(', ') || capitalize(detail.trigger.name);
}

async function getEvolutionPaths(url: string): Promise<PokemonEvolutionStage[][]> {
  const data = await getJson<{ chain: EvolutionLink }>(url);

  async function walk(node: EvolutionLink): Promise<PokemonEvolutionStage[][]> {
    const id = node.species.url.match(/\/(\d+)\/?$/)?.[1];

    if (!id) {
      throw new Error('Invalid Pokémon species ID');
    }

    const pokemon = (await searchPokemon(id)) as ApiPokemon;

    const stage: PokemonEvolutionStage = {
      number: String(pokemon.id).padStart(3, '0'),
      name: capitalize(pokemon.name),
      image: getImage(pokemon),
      types: getBadges(pokemon),
      condition: getEvolutionCondition(node.evolution_details),
    };

    if (node.evolves_to.length === 0) {
      return [[stage]];
    }

    const branches = await Promise.all(node.evolves_to.map(walk));

    return branches.flatMap((paths) => paths.map((path) => [stage, ...path]));
  }

  return walk(data.chain);
}

export async function getPokemonModalData(id: number): Promise<PokemonModalData> {
  const [pokemon, species] = await Promise.all([
    searchPokemon(String(id)) as Promise<ApiPokemon>,
    getPokemonSpecies(String(id)) as Promise<ApiSpecies>,
  ]);

  const description =
    species.flavor_text_entries.find((entry) => entry.language.name === 'en')?.flavor_text ??
    'No description available.';

  const category = species.genera.find((entry) => entry.language.name === 'en')?.genus ?? 'Unknown';

  const selectedAbility = pokemon.abilities.find((item) => !item.is_hidden) ?? pokemon.abilities[0];

  const [abilityData, weaknesses, evolutionPaths] = await Promise.all([
    selectedAbility ? getJson<ApiAbility>(selectedAbility.ability.url) : Promise.resolve(null),
    getWeaknesses(pokemon),
    getEvolutionPaths(species.evolution_chain.url),
  ]);

  const abilityDescription = abilityData?.effect_entries.find(
    (entry) => entry.language.name === 'en',
  )?.short_effect;

  function getStat(name: string): number {
    return pokemon.stats.find((item) => item.stat.name === name)?.base_stat ?? 0;
  }

  return {
    number: String(pokemon.id).padStart(3, '0'),
    name: capitalize(pokemon.name),
    image: getImage(pokemon),
    description: cleanText(description),

    height: `${(pokemon.height / 10).toFixed(1)} m`,
    weight: `${(pokemon.weight / 10).toFixed(1)} kg`,

    category,
    ability: selectedAbility ? capitalize(selectedAbility.ability.name) : 'Unknown',
    abilityDescription: abilityDescription ? cleanText(abilityDescription) : undefined,

    evolutionPaths,
    types: getBadges(pokemon),
    weaknesses,

    stats: {
      hp: getStat('hp'),
      attack: getStat('attack'),
      defense: getStat('defense'),
      specialAttack: getStat('special-attack'),
      specialDefense: getStat('special-defense'),
      speed: getStat('speed'),
    },
  };
}
