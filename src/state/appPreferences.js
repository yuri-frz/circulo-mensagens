export const initialAppearance = {
  mode: 'claro',
  compactList: false
};

export const initialPrivacyPreferences = {
  readReceipts: true,
  onlineStatus: true,
  profilePhoto: true
};

export function selectAppearance(current, mode) {
  return { ...current, mode };
}

export function togglePreference(current, key) {
  return { ...current, [key]: !current[key] };
}
