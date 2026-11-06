export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
}

interface PokemonType {
  name: string;
  url: string;
}

interface PokemonTypesResponse {
  count: number;
  results: PokemonType[];
}

interface PokemonListResponse {
  next: string | null;
  results: { name: string }[];
}

interface PokemonTypeResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export const POKEMON_DETAILS_LIMIT = 20;

export async function searchPokemon(name: string, signal?: AbortSignal): Promise<PokemonDetails> {
  const query = name.trim().toLowerCase().replace(/\s+/g, '-');

  if (!query) {
    throw new Error('Вкажи ім’я покемона.');
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(
      response.status === 404 ? 'Покемона не знайдено.' : 'Не вдалося завантажити покемона.',
    );
  }

  return response.json();
}

export async function getPokemonDetails(
  names: string[],
  signal?: AbortSignal,
): Promise<PokemonDetails[]> {
  return Promise.all(
    names.slice(0, POKEMON_DETAILS_LIMIT).map((name) => searchPokemon(name, signal)),
  );
}

export async function getPokemonNames(): Promise<string[]> {
  const names: string[] = [];
  let nextUrl: string | null = 'https://pokeapi.co/api/v2/pokemon?limit=1000';

  while (nextUrl) {
    const response = await fetch(nextUrl);

    if (!response.ok) {
      throw new Error("Couldn't upload Pokemon's");
    }

    const data: PokemonListResponse = await response.json();
    names.push(...data.results.map((pokemon) => pokemon.name));
    nextUrl = data.next;
  }

  return names;
}

export async function getPokemonTypes(): Promise<PokemonType[]> {
  const response = await fetch('https://pokeapi.co/api/v2/type?limit=100');
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon types');
  }
  const data: PokemonTypesResponse = await response.json();
  return data.results;
}

export async function getPokemonNamesByType(type: string): Promise<string[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${encodeURIComponent(type)}`);

  if (!response.ok) {
    throw new Error('Failed to load Pokemon types');
  }

  const data: PokemonTypeResponse = await response.json();
  return data.pokemon.map((item) => item.pokemon.name);
}
