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
    case 'send': {
      fields(action, ['type', 'contactId', 'id', 'text']);
      contact(state, action.contactId);
      if (typeof action.id !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,127}$/.test(action.id)) fail('Identificador da mensagem inválido.');
      if (typeof action.text !== 'string' || action.text.length > 4000 || !action.text.trim()) fail('Informe uma mensagem com até 4.000 caracteres.');
      const text = action.text.trim();
      for (const [contactId, messages] of Object.entries(state.messages)) {
        const existing = messages.find((message) => message.id === action.id);
        if (!existing) continue;
        if (contactId === action.contactId && existing.mine && existing.text === text) return state;
        fail('O identificador já pertence a outra mensagem.', 409);
      }
      const time = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date());
      state.conversations = ensureConversation(state.conversations, action.contactId);
      state.messages[action.contactId] ??= [];
      state.messages[action.contactId].push({ id: action.id, text, time, mine: true });
      Object.assign(state.conversations.find((item) => item.contactId === action.contactId), { preview: text, time, unread: 0 });
      break;
    }
    case 'flags': {
      fields(action, ['type', 'contactId', 'muted', 'archived']);
      contact(state, action.contactId);
      const keys = ['muted', 'archived'].filter((key) => Object.hasOwn(action, key));
      if (!keys.length || keys.some((key) => typeof action[key] !== 'boolean')) fail('Informe os sinalizadores como booleanos.');
      const conversation = state.conversations.find((item) => item.contactId === action.contactId);
      if (!conversation) fail('Conversa não encontrada.', 404);
      for (const key of keys) conversation[key] = action[key];
      break;
    }
    default: fail('Ação desconhecida.');
  }
  return state;
}
