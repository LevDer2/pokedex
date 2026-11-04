import assert from 'node:assert/strict';
import test from 'node:test';
import { configureStore } from '@reduxjs/toolkit';
import pokemonSearchReducer, {
  fetchPokemonByName,
  resetSearch,
} from '../src/state/pokemonApi/pokemonSearchSlice.ts';

function createTestStore() {
  return configureStore({ reducer: { pokemonSearch: pokemonSearchReducer } });
}

function listPage(names: string[], next: string | null = null) {
  return Response.json({
    next,
    results: names.map((name) => ({ name })),
  });
}

test('searches all pages, normalizes the query and reuses the cached names', async (t) => {
  const nextPage = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=1000';
  const fetchMock = t.mock.method(globalThis, 'fetch', async (url: string) => {
    return url === nextPage
      ? listPage(['charizard', 'squirtle'])
      : listPage(['charmander', 'pikachu'], nextPage);
  });
  const store = createTestStore();

  await store.dispatch(fetchPokemonByName('  CHAR  '));

  assert.equal(store.getState().pokemonSearch.query, 'char');
  assert.deepEqual(store.getState().pokemonSearch.matches, ['charmander', 'charizard']);
  assert.equal(store.getState().pokemonSearch.allNames.length, 4);
  assert.equal(fetchMock.mock.callCount(), 2);

  await store.dispatch(fetchPokemonByName('squirt'));

  assert.deepEqual(store.getState().pokemonSearch.matches, ['squirtle']);
  assert.equal(fetchMock.mock.callCount(), 2);

  store.dispatch(resetSearch());
  assert.equal(store.getState().pokemonSearch.query, '');
  assert.equal(store.getState().pokemonSearch.hasLoadedList, true);
  await store.dispatch(fetchPokemonByName('pika'));
  assert.deepEqual(store.getState().pokemonSearch.matches, ['pikachu']);
  assert.equal(fetchMock.mock.callCount(), 2);
});

test('an unknown fragment is an empty result; a blank query does not request the API', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => listPage(['pikachu']));
  const store = createTestStore();

  await store.dispatch(fetchPokemonByName('   '));
  assert.equal(fetchMock.mock.callCount(), 0);
  assert.equal(store.getState().pokemonSearch.query, '');

  await store.dispatch(fetchPokemonByName('no-such-pokemon'));
  assert.deepEqual(store.getState().pokemonSearch.matches, []);
  assert.equal(store.getState().pokemonSearch.error, null);
  assert.equal(store.getState().pokemonSearch.isLoading, false);
});

test('failed requests leave loading state and can be retried', async (t) => {
  let failRequest = true;
  t.mock.method(globalThis, 'fetch', async () => {
    return failRequest ? new Response(null, { status: 503 }) : listPage(['pikachu']);
  });
  const store = createTestStore();

  await store.dispatch(fetchPokemonByName('pika'));
  assert.equal(store.getState().pokemonSearch.isLoading, false);
  assert.equal(store.getState().pokemonSearch.hasLoadedList, false);
  assert.ok(store.getState().pokemonSearch.error);

  failRequest = false;
  await store.dispatch(fetchPokemonByName('pika'));
  assert.equal(store.getState().pokemonSearch.error, null);
  assert.deepEqual(store.getState().pokemonSearch.matches, ['pikachu']);
});

test('a second submission cannot start another request while the list is loading', async (t) => {
  let releaseRequest!: () => void;
  const requestGate = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => {
    await requestGate;
    return listPage(['pikachu', 'charizard']);
  });
  const store = createTestStore();

  const firstSearch = store.dispatch(fetchPokemonByName('pika'));
  assert.equal(store.getState().pokemonSearch.isLoading, true);
  const secondSearch = await store.dispatch(fetchPokemonByName('char'));
  assert.equal(secondSearch.type, fetchPokemonByName.rejected.type);
  assert.equal(fetchMock.mock.callCount(), 1);

  releaseRequest();
  await firstSearch;
  assert.equal(store.getState().pokemonSearch.query, 'pika');
  assert.deepEqual(store.getState().pokemonSearch.matches, ['pikachu']);
});
