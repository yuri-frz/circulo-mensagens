import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../components/IconButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { getSharedContent } from '../data/sharedContent';
import { theme } from '../styles/theme';

export function ConversationMediaScreen({ contact, onBack }) {
  const { media } = getSharedContent(contact.id);
  return <View style={styles.screen}><ScreenHeader eyebrow={contact.name} title="Mídias" right={<IconButton icon="‹" label="Voltar aos detalhes" onPress={onBack} />} /><ScrollView contentContainerStyle={styles.content}>{media.length ? <View style={styles.grid}>{media.map((item) => <Pressable key={item.id} accessibilityLabel={`${item.label}, enviada ${item.date}`} style={({ pressed }) => [styles.tile, { backgroundColor: item.color }, pressed && styles.pressed]}><Text style={styles.symbol}>◇</Text><View><Text style={styles.label}>{item.label}</Text><Text style={styles.date}>{item.date}</Text></View></Pressable>)}</View> : <View style={styles.empty}><Text style={styles.emptyTitle}>Ainda não há mídias</Text><Text style={styles.emptyCopy}>As imagens compartilhadas com {contact.name} aparecerão aqui.</Text></View>}</ScrollView></View>;
}

const styles = StyleSheet.create({ screen: { flex: 1 }, content: { padding: theme.spacing.lg }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, tile: { borderRadius: theme.radius.md, height: 158, justifyContent: 'space-between', padding: 14, width: '47%' }, symbol: { color: theme.colors.primary, fontSize: 31 }, label: { color: theme.colors.ink, fontSize: 14, fontWeight: '900' }, date: { color: theme.colors.muted, fontSize: 11, marginTop: 3 }, empty: { alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, marginTop: 10, padding: theme.spacing.xl }, emptyTitle: { color: theme.colors.ink, fontSize: 17, fontWeight: '900' }, emptyCopy: { color: theme.colors.muted, fontSize: 13, lineHeight: 19, marginTop: 7, textAlign: 'center' }, pressed: { opacity: 0.7 } });
