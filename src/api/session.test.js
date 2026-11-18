import { createSession } from './session';

const state = { contacts: [], conversations: [], messages: {}, profile: {}, appearance: {}, privacyPreferences: {}, notificationPreferences: {} };

it('bloqueia repetição concorrente e conserva estado confirmado após falha', async () => {
  let resolve;
  const client = { state: async () => state, action: jest.fn(() => new Promise((done) => { resolve = done; })) };
  const session = createSession(client, async () => {});
  await session.refresh();
  const first = session.act({ type: 'open', contactId: 'luna' });
  expect(await session.act({ type: 'open', contactId: 'luna' })).toBe(false);
  resolve(state);
  expect(await first).toBe(true);
  expect(client.action).toHaveBeenCalledTimes(1);
});

it('não envia ações offline e reconecta preservando o último estado', async () => {
  const client = { state: jest.fn().mockRejectedValueOnce(new Error('Sem conexão')).mockResolvedValue(state), action: jest.fn() };
  const session = createSession(client, async () => {});
  session.hydrate(state);
  expect(await session.refresh()).toBe(false);
  expect(await session.act({ type: 'send' })).toBe(false);
  expect(client.action).not.toHaveBeenCalled();
  expect(session.get().state).toEqual(state);
  expect(await session.refresh()).toBe(true);
  expect(session.get().online).toBe(true);
});
