import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export function SettingsRow({ label, description, value, onPress, accessibilityLabel = `Abrir ${label.toLocaleLowerCase('pt-BR')}` }) {
  return <Pressable accessibilityLabel={accessibilityLabel} accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}><View style={styles.copy}><Text style={styles.label}>{label}</Text>{description && <Text style={styles.description}>{description}</Text>}</View>{value && <Text style={styles.value}>{value}</Text>}<Text style={styles.arrow}>›</Text></Pressable>;
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.line, borderBottomWidth: 1, flexDirection: 'row', minHeight: 68, paddingHorizontal: theme.spacing.md, paddingVertical: 12 },
  copy: { flex: 1 }, label: { color: theme.colors.ink, fontSize: 16, fontWeight: '800' }, description: { color: theme.colors.muted, fontSize: 12, marginTop: 3 }, value: { color: theme.colors.muted, fontSize: 12, marginRight: 8 }, arrow: { color: theme.colors.primary, fontSize: 26 }, pressed: { opacity: 0.68 }
});
