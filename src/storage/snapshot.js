import AsyncStorage from '@react-native-async-storage/async-storage';

const snapshotKey = origin => 'circulo:estado:v1:' + origin;

export async function readSnapshot(origin) {
  const raw = await AsyncStorage.getItem(snapshotKey(origin));
  if (!raw) return null;
  try {
    const state = JSON.parse(raw);
    if (!Array.isArray(state?.contacts) || !Array.isArray(state.conversations)) return null;
    if (!['messages', 'profile', 'appearance', 'privacyPreferences', 'notificationPreferences']
      .every(key => state[key] && typeof state[key] === 'object' && !Array.isArray(state[key]))) return null;
    return state;
  } catch {
    return null;
  }
}

export function writeSnapshot(origin, state) {
  return AsyncStorage.setItem(snapshotKey(origin), JSON.stringify(state));
}
