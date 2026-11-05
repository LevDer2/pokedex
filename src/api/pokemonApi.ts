export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
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

interface PokemonListResponse {
  next: string | null;
  results: { name: string }[];
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
