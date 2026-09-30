import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export function MediaPreview({ item }) {
  return <View accessibilityLabel={`${item.label}, ${item.date}`} style={[styles.preview, { backgroundColor: item.color }]}><Text style={styles.symbol}>◇</Text><Text numberOfLines={2} style={styles.label}>{item.label}</Text></View>;
}
const styles = StyleSheet.create({ preview: { borderRadius: theme.radius.sm, height: 104, justifyContent: 'flex-end', padding: 10, width: '31%' }, symbol: { color: theme.colors.primary, fontSize: 24 }, label: { color: theme.colors.ink, fontSize: 11, fontWeight: '800', marginTop: 4 } });
