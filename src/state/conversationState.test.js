import { initialNotificationPreferences, toggleNotificationPreference } from './conversationState';

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
