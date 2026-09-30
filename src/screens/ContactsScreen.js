import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { ScreenHeader } from '../components/ScreenHeader';
import { theme } from '../styles/theme';
import { EmptyState } from '../components/EmptyState';

export function ContactsScreen({ contacts, onBack, onOpenChat }) {
  const [query, setQuery] = useState('');
  const visibleContacts = useMemo(() => contacts.filter((contact) => contact.name.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'))), [contacts, query]);
  return (
    <View style={styles.screen}>
      <ScreenHeader eyebrow="comece uma conversa" title="Pessoas" right={<Pressable accessibilityLabel="Voltar às conversas" accessibilityRole="button" onPress={onBack} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable>} />
      <View style={styles.searchBox}><Text style={styles.searchIcon}>⌕</Text><TextInput accessibilityLabel="Buscar pessoas" value={query} onChangeText={setQuery} placeholder="Buscar no seu círculo" placeholderTextColor={theme.colors.muted} style={styles.search} /></View>
      <Text style={styles.count}>{visibleContacts.length} pessoas no seu círculo</Text>
      <FlatList contentContainerStyle={styles.list} data={visibleContacts} keyExtractor={(item) => item.id} renderItem={({ item }) => <Pressable accessibilityLabel={`Conversar com ${item.name}`} accessibilityRole="button" onPress={() => onOpenChat(item.id)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}><Avatar contact={item} /><View style={styles.copy}><Text style={styles.name}>{item.name}</Text><Text style={styles.detail}>{item.detail}</Text></View><Text style={styles.arrow}>›</Text></Pressable>} ListEmptyComponent={<EmptyState title="Nenhuma pessoa encontrada" description="Tente buscar por outro nome." />} />
    </View>
  );
}

const styles = StyleSheet.create({
    screen: { backgroundColor: theme.colors.background, flex: 1 }, close: { alignItems: 'center', backgroundColor: theme.colors.primarySoft, borderRadius: theme.radius.pill, height: 44, justifyContent: 'center', width: 44 }, closeText: { color: theme.colors.primary, fontSize: 27, fontWeight: '300', marginTop: -2 },
  searchBox: { alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.line, borderRadius: theme.radius.md, borderWidth: 1, flexDirection: 'row', marginHorizontal: theme.spacing.lg, marginTop: theme.spacing.lg, paddingHorizontal: 13 }, searchIcon: { color: theme.colors.primary, fontSize: 25, marginRight: 6 }, search: { color: theme.colors.ink, flex: 1, fontSize: 15, height: 48 }, count: { color: theme.colors.muted, fontSize: 13, marginHorizontal: theme.spacing.lg, marginTop: 14 },
  list: { paddingHorizontal: theme.spacing.lg, paddingTop: 10 }, row: { alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, flexDirection: 'row', marginBottom: 9, padding: 12 }, copy: { flex: 1, marginLeft: 12 }, name: { color: theme.colors.ink, fontSize: 16, fontWeight: '800' }, detail: { color: theme.colors.muted, fontSize: 13, marginTop: 4 }, arrow: { color: theme.colors.primary, fontSize: 26 }, pressed: { opacity: 0.7 }, empty: { color: theme.colors.muted, marginTop: 30, textAlign: 'center' }
});
