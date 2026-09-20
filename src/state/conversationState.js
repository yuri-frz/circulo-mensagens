export const initialNotificationPreferences = { messages: true, mentions: true, sounds: true, vibration: false };

export function toggleNotificationPreference(preferences, key) {
  if (!Object.prototype.hasOwnProperty.call(preferences, key)) return preferences;
  return { ...preferences, [key]: !preferences[key] };
}

