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
