import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export function FileRow({ item }) {
  return <View accessibilityLabel={`${item.name}, ${item.size}`} style={styles.row}><View style={styles.icon}><Text style={styles.iconText}>{item.type}</Text></View><View style={styles.copy}><Text numberOfLines={1} style={styles.name}>{item.name}</Text><Text style={styles.meta}>{item.size} · {item.date}</Text></View></View>;
}
const styles = StyleSheet.create({ row: { alignItems: 'center', borderTopColor: theme.colors.line, borderTopWidth: 1, flexDirection: 'row', paddingVertical: 12 }, icon: { alignItems: 'center', backgroundColor: theme.colors.primarySoft, borderRadius: 9, justifyContent: 'center', minHeight: 38, minWidth: 46, paddingHorizontal: 6 }, iconText: { color: theme.colors.primary, fontSize: 9, fontWeight: '900' }, copy: { flex: 1, marginLeft: 11 }, name: { color: theme.colors.ink, fontSize: 14, fontWeight: '800' }, meta: { color: theme.colors.muted, fontSize: 11, marginTop: 3 } });
