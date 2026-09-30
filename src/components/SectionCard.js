import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export function SectionCard({ title, children, style }) {
  return <View style={[styles.wrapper, style]}>{title && <Text style={styles.title}>{title}</Text>}<View style={styles.card}>{children}</View></View>;
}
const styles = StyleSheet.create({ wrapper: { marginTop: theme.spacing.md }, title: { color: theme.colors.muted, fontSize: theme.text.caption, fontWeight: '900', letterSpacing: 0.8, marginBottom: 8, textTransform: 'uppercase' }, card: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, overflow: 'hidden', paddingHorizontal: theme.spacing.md, ...theme.shadow } });
