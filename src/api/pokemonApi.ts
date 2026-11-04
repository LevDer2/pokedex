export async function searchPokemon(name: string): Promise<{ name: string }> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name.toLowerCase())}`,
  );

  if (!response.ok) {
    throw new Error('Pokemon not found');
  }

  return response.json();
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
