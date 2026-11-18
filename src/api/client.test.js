import { createApiClient, resolveApiOrigin } from './client';

it('resolve origem web, Expo Go e configuração explícita', () => {
  expect(resolveApiOrigin({ configured: 'https://example.com/', hostname: 'other' })).toBe('https://example.com');
  expect(resolveApiOrigin({ hostname: '192.168.1.2' })).toBe('http://192.168.1.2:3001');
  expect(resolveApiOrigin({ hostUri: '192.168.1.5:8081' })).toBe('http://192.168.1.5:3001');
});

it('envia ação sem modificar o identificador idempotente', async () => {
  const state = { contacts: [], conversations: [], messages: {}, profile: {}, appearance: {}, privacyPreferences: {}, notificationPreferences: {} };
  const fetcher = jest.fn().mockResolvedValue({ ok: true, json: async () => state });
  const client = createApiClient('http://localhost:3001', fetcher);
  const action = { type: 'send', contactId: 'luna', id: 'one', text: 'Olá' };
  expect(await client.action(action)).toEqual(state);
  expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual(action);
});

it('exibe erro retornado pelo servidor', async () => {
  const client = createApiClient('http://localhost:3001', async () => ({ ok: false, json: async () => ({ error: 'Contato inválido.' }) }));
  await expect(client.state()).rejects.toThrow('Contato inválido.');
});

it('encerra espera mesmo quando o transporte ignora cancelamento', async () => {
  jest.useFakeTimers();
  const client = createApiClient('http://localhost:3001', () => new Promise(() => {}), 100);
  const result = expect(client.state()).rejects.toThrow('A conexão demorou demais');
  jest.advanceTimersByTime(100);
  await result;
  jest.useRealTimers();
});
