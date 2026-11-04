export async function searchPokemon(name: string) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name.toLowerCase())}`,
  );

  if (!response.ok) {
    throw new Error('Pokemon not found');
  }

  return response.json();
}
