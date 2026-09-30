import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export function EmptyState({ title, description, actionLabel, onAction }) {
  return <View accessibilityLiveRegion="polite" style={styles.container}><Text style={styles.symbol}>○</Text><Text style={styles.title}>{title}</Text>{description && <Text style={styles.description}>{description}</Text>}{actionLabel && onAction && <Pressable accessibilityLabel={actionLabel} accessibilityRole="button" onPress={onAction} style={styles.action}><Text style={styles.actionText}>{actionLabel}</Text></Pressable>}</View>;
}
const styles = StyleSheet.create({ container: { alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, marginTop: 20, padding: theme.spacing.lg }, symbol: { color: theme.colors.primary, fontSize: 30 }, title: { color: theme.colors.ink, fontSize: 17, fontWeight: '900', marginTop: 8, textAlign: 'center' }, description: { color: theme.colors.muted, fontSize: 13, lineHeight: 19, marginTop: 6, textAlign: 'center' }, action: { backgroundColor: theme.colors.primarySoft, borderRadius: theme.radius.pill, marginTop: 14, minHeight: 44, paddingHorizontal: 18, paddingVertical: 12 }, actionText: { color: theme.colors.primary, fontWeight: '900' } });
