import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createApi } from '../http.mjs';

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
