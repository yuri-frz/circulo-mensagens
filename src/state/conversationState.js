export const initialNotificationPreferences = { messages: true, mentions: true, sounds: true, vibration: false };

export function toggleNotificationPreference(preferences, key) {
  if (!Object.prototype.hasOwnProperty.call(preferences, key)) return preferences;
  return { ...preferences, [key]: !preferences[key] };
}

function toggleConversationFlag(conversations, contactId, flag) {
  if (!conversations.some((item) => item.contactId === contactId)) return conversations;
  return conversations.map((item) => item.contactId === contactId ? { ...item, [flag]: !item[flag] } : item);
}

export const toggleConversationMuted = (conversations, contactId) => toggleConversationFlag(conversations, contactId, 'muted');
export const toggleConversationArchived = (conversations, contactId) => toggleConversationFlag(conversations, contactId, 'archived');

export function filterConversations(conversations, mode = 'active') {
  return conversations.filter((item) => mode === 'archived' ? item.archived : !item.archived);
}
