import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApi } from '../http.mjs';
import { openStore } from '../store.mjs';

export async function startTestApi(t, options) {
  const api = createApi(options);
  api.listen(0, '127.0.0.1');
  await once(api, 'listening');
  t.after(() => new Promise(resolve => api.close(resolve)));
  return 'http://127.0.0.1:' + api.address().port;
}

test('entrega o estado à página Expo no mesmo host e recusa outra origem', async (t) => {
  const state = { conversations: [] };
  const url = await startTestApi(t, { store: { read: () => state } });
  const origin = 'http://127.0.0.1:8081';
  const result = await fetch(url + '/api/state', { headers: { Origin: origin } });
  assert.deepEqual(await result.json(), state);
  assert.equal(result.headers.get('access-control-allow-origin'), origin);
  const denied = await fetch(url + '/api/state', { headers: { Origin: 'https://example.org' } });
  assert.equal(denied.status, 403);
});

test('confirma a gravação e rejeita formatos inválidos sem alterar o banco', async (t) => {
  const store = openStore(':memory:', () => ({ count: 0 }));
  t.after(() => store.close());
  const url = await startTestApi(t, {
    store,
    applyAction: (state, action) => { state.count += action.add; }
  });
  const post = (body, type = 'application/json') => fetch(url + '/api/actions', {
    method: 'POST', headers: { 'Content-Type': type }, body
  });
  const result = await post('{"add":2}');
  assert.deepEqual(await result.json(), { count: 2 });
  assert.equal((await post('incompleto')).status, 400);
  assert.equal((await post('{}', 'text/plain')).status, 415);
  assert.equal((await post('a'.repeat(70_000))).status, 413);
  assert.deepEqual(store.read(), { count: 2 });
});
