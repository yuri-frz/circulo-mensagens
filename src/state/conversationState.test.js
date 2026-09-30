import { ensureConversation, filterConversations, initialNotificationPreferences, toggleConversationArchived, toggleConversationMuted, toggleNotificationPreference } from './conversationState';

describe('preferências de notificação', () => {
  it('alterna uma preferência sem mutar o estado anterior', () => {
    const before = { ...initialNotificationPreferences };
    const after = toggleNotificationPreference(before, 'sounds');
    expect(after.sounds).toBe(!before.sounds);
    expect(before).toEqual(initialNotificationPreferences);
  });

  it('preserva o estado quando a preferência não existe', () => {
    const before = { ...initialNotificationPreferences };
    expect(toggleNotificationPreference(before, 'unknown')).toBe(before);
  });
});

describe('ações da conversa', () => {
  const conversations = [{ contactId: 'luna', muted: false, archived: false }, { contactId: 'caio', muted: false, archived: true }];

  it('silencia somente a conversa escolhida sem mutar a lista', () => {
    const next = toggleConversationMuted(conversations, 'luna');
    expect(next[0].muted).toBe(true);
    expect(conversations[0].muted).toBe(false);
  });

  it('arquiva, desarquiva e filtra sem duplicar conversas', () => {
    const archived = toggleConversationArchived(conversations, 'luna');
    expect(filterConversations(archived, 'active')).toEqual([]);
    expect(filterConversations(archived, 'archived').map((item) => item.contactId)).toEqual(['luna', 'caio']);
    expect(toggleConversationArchived(archived, 'luna')).toHaveLength(2);
  });

  it('preserva a mesma lista quando o contato não existe', () => {
    expect(toggleConversationMuted(conversations, 'unknown')).toBe(conversations);
  });

  it('materializa uma conversa nova antes de permitir ações', () => {
    const next = ensureConversation(conversations, 'nina');
    expect(next).toHaveLength(3);
    expect(next[2]).toEqual({ contactId: 'nina', preview: 'Conversa iniciada', time: '', unread: 0, muted: false, archived: false });
    expect(ensureConversation(next, 'nina')).toBe(next);
  });
});
