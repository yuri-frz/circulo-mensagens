import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export function PreferenceChoice({ title, description, selected, swatches, onPress, disabled = false }) {
  return <Pressable accessibilityRole="radio" {...(disabled ? { disabled: true } : {})} accessibilityState={{ selected, ...(disabled ? { disabled: true } : {}) }} onPress={onPress} style={({ pressed }) => [styles.card, selected && styles.selected, pressed && styles.pressed]}><View style={styles.copy}><Text style={styles.title}>{title}</Text><Text style={styles.description}>{description}</Text></View><View style={styles.right}><View style={styles.swatches}>{swatches.map((color) => <View key={color} style={[styles.swatch, { backgroundColor: color }]} />)}</View><View style={[styles.radio, selected && styles.radioSelected]}>{selected && <View style={styles.dot} />}</View></View></Pressable>;
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.line, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', marginBottom: 10, minHeight: 86, padding: theme.spacing.md },
  selected: { borderColor: theme.colors.primary, borderWidth: 2 }, copy: { flex: 1, paddingRight: 10 }, title: { color: theme.colors.ink, fontSize: 16, fontWeight: '900' }, description: { color: theme.colors.muted, fontSize: 12, lineHeight: 17, marginTop: 4 }, right: { alignItems: 'flex-end', gap: 9 }, swatches: { flexDirection: 'row' }, swatch: { borderColor: '#FFFFFF', borderRadius: 10, borderWidth: 2, height: 20, marginLeft: -5, width: 20 }, radio: { alignItems: 'center', borderColor: '#B9B2C7', borderRadius: 9, borderWidth: 2, height: 18, justifyContent: 'center', width: 18 }, radioSelected: { borderColor: theme.colors.primary }, dot: { backgroundColor: theme.colors.primary, borderRadius: 4, height: 8, width: 8 }, pressed: { opacity: 0.72 }
});
