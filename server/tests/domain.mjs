import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, applyAction } from '../domain.mjs';

function rejects(state, action, status = 400) {
  const before = structuredClone(state);
  assert.throws(() => applyAction(state, action), (error) => error.status === status);
  assert.deepEqual(state, before, 'Uma ação inválida não pode alterar o estado.');
}

test('estado usa defaults independentes e abre conversa zerando não lidas', () => {
  const state = createState();
  assert.equal(state.contacts.length, 5);
  assert.equal(state.profile.name, 'Patrick Oliveira');
  assert.equal(state.appearance.mode, 'claro');
  assert.equal(applyAction(state, { type: 'open', contactId: 'luna' }), state);
  assert.equal(state.conversations.find((item) => item.contactId === 'luna').unread, 0);
  applyAction(state, { type: 'open', contactId: 'nina' });
  applyAction(state, { type: 'open', contactId: 'nina' });
  assert.equal(state.conversations.filter((item) => item.contactId === 'nina').length, 1);
  assert.equal(createState().conversations[0].unread, 2);
  state.contacts[0].name = 'Alterado';
  assert.equal(createState().contacts[0].name, 'Luna Martins');
});

test('abertura rejeita contato inexistente e ações malformadas sem mutação', () => {
  const state = createState();
  rejects(state, { type: 'open', contactId: 'desconhecido' }, 404);
  for (const action of [null, [], {}, { type: 'inexistente' }, { type: 'open' }, { type: 'open', contactId: '__proto__' }, { type: 'open', contactId: 'luna', extra: true }]) rejects(state, action);
});

test('envio cria conversa, normaliza texto e mantém reenvio idempotente', () => {
  const state = createState();
  const action = { type: 'send', contactId: 'nina', id: 'client-1', text: '  Olá, Nina!  ' };
  applyAction(state, action);
  const beforeRetry = structuredClone(state);
  applyAction(state, action);
  assert.deepEqual(state, beforeRetry);
  assert.equal(state.messages.nina.length, 1);
  assert.equal(state.messages.nina[0].text, 'Olá, Nina!');
  assert.equal(state.messages.nina[0].mine, true);
  assert.match(state.messages.nina[0].time, /^\d{2}:\d{2}$/);
  assert.equal(state.conversations.find((item) => item.contactId === 'nina').preview, 'Olá, Nina!');
  rejects(state, { ...action, text: 'Outra mensagem' }, 409);
  rejects(state, { ...action, contactId: 'luna' }, 409);
  rejects(state, { ...action, id: 'l1', contactId: 'luna' }, 409);
});

test('envio rejeita conteúdo vazio, excessivo, ID inválido e contato ausente', () => {
  const state = createState();
  const action = { type: 'send', contactId: 'nina', id: 'client-1', text: 'Oi' };
  for (const change of [{ text: '   ' }, { text: 12 }, { text: 'a'.repeat(4001) }, { id: '' }, { id: '__proto__' }, { id: 'a'.repeat(129) }, { id: 1 }, { extra: true }]) rejects(state, { ...action, ...change });
  rejects(state, { ...action, contactId: 'ausente' }, 404);
});

test('sinalizadores absolutos suportam repetição e preservam não lidas', () => {
  const state = createState();
  const action = { type: 'flags', contactId: 'luna', muted: true, archived: true };
  applyAction(state, action);
  const expected = structuredClone(state);
  applyAction(state, action);
  assert.deepEqual(state, expected);
  assert.equal(state.conversations[0].unread, 2);
  applyAction(state, { ...action, muted: false, archived: false });
  assert.equal(state.conversations[0].muted, false);
  assert.equal(state.conversations[0].archived, false);
  rejects(state, { type: 'flags', contactId: 'nina', muted: true }, 404);
  rejects(state, { type: 'flags', contactId: 'ausente', archived: true }, 404);
  for (const change of [{}, { muted: 1 }, { archived: 'true' }, { muted: true, archived: null }, { muted: true, unread: 0 }]) rejects(state, { type: 'flags', contactId: 'luna', ...change });
});
