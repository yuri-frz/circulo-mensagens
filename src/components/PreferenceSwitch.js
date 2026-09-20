import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export function PreferenceSwitch({ label, description, value, onToggle }) {
  return <Pressable accessibilityLabel={label} accessibilityRole="switch" accessibilityState={{ checked: value }} onPress={onToggle} style={styles.row}><View style={styles.copy}><Text style={styles.label}>{label}</Text><Text style={styles.description}>{description}</Text></View><View style={[styles.track, value && styles.trackOn]}><View style={[styles.thumb, value && styles.thumbOn]} /></View></Pressable>;
}

const styles = StyleSheet.create({ row: { alignItems: 'center', backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.line, borderBottomWidth: 1, flexDirection: 'row', minHeight: 76, padding: theme.spacing.md }, copy: { flex: 1, paddingRight: 16 }, label: { color: theme.colors.ink, fontSize: 16, fontWeight: '800' }, description: { color: theme.colors.muted, fontSize: 12, lineHeight: 17, marginTop: 3 }, track: { backgroundColor: '#C9C4D2', borderRadius: 14, height: 28, justifyContent: 'center', padding: 3, width: 50 }, trackOn: { backgroundColor: theme.colors.primary }, thumb: { backgroundColor: '#FFFFFF', borderRadius: 11, height: 22, width: 22 }, thumbOn: { alignSelf: 'flex-end' } });
