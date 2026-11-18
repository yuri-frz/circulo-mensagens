import { contacts, initialConversations, initialMessages } from '../src/data/conversations.js';
import { initialProfile } from '../src/state/profileState.js';
import { initialAppearance, initialPrivacyPreferences } from '../src/state/appPreferences.js';
import { ensureConversation, initialNotificationPreferences } from '../src/state/conversationState.js';

export function createState() {
  return structuredClone({ contacts, conversations: initialConversations, messages: initialMessages, profile: initialProfile, appearance: initialAppearance, privacyPreferences: initialPrivacyPreferences, notificationPreferences: initialNotificationPreferences });
}

function fail(message, status = 400) {
  throw Object.assign(new Error(message), { status });
}

function record(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function fields(value, allowed) {
  if (!record(value) || Object.keys(value).some((key) => !allowed.includes(key))) fail('Campos inválidos.');
}

function contact(state, contactId) {
  if (typeof contactId !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,127}$/.test(contactId)) fail('Identificador de contato inválido.');
  if (!state.contacts.some((item) => item.id === contactId)) fail('Contato não encontrado.', 404);
}

export function applyAction(state, action) {
  if (!record(action)) fail('Ação inválida.');
  switch (action.type) {
    case 'open': {
      fields(action, ['type', 'contactId']);
      contact(state, action.contactId);
      state.conversations = ensureConversation(state.conversations, action.contactId);
      state.conversations.find((item) => item.contactId === action.contactId).unread = 0;
      break;
    }
    default: fail('Ação desconhecida.');
  }
  return state;
}
