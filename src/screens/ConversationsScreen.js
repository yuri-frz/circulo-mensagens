import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { ScreenHeader } from '../components/ScreenHeader';
import { contacts } from '../data/conversations';
import { theme } from '../styles/theme';
import { filterConversations } from '../state/conversationState';

function ConversationRow({ item, onOpen }) {
  const contact = contacts.find((entry) => entry.id === item.contactId);
  return (
    <Pressable onPress={() => onOpen(contact.id)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Avatar contact={contact} />
      <View style={styles.copy}>
        <View style={styles.nameLine}><Text style={styles.name}>{contact.name}</Text><Text style={styles.time}>{item.time}</Text></View>
        <View style={styles.previewLine}><Text numberOfLines={1} style={styles.preview}>{item.preview}</Text>{item.muted && <Text style={styles.muted}>sem som</Text>}{item.unread > 0 && <Text style={styles.badge}>{item.unread}</Text>}</View>
      </View>
    </Pressable>
  );
}

export function ConversationsScreen({ conversations, onOpenChat, onOpenContacts, onOpenProfile }) {
  const [mode, setMode] = useState('active');
  const visibleConversations = filterConversations(conversations, mode);
  return (
    <View style={styles.screen}>
      <ScreenHeader eyebrow="seu espaço" title="Círculo" right={<View style={styles.headerActions}><Pressable onPress={onOpenProfile} style={styles.profileButton}><Text style={styles.profileText}>PO</Text></Pressable><Pressable onPress={onOpenContacts} style={styles.peopleButton}><Text style={styles.peopleIcon}>⌁</Text><Text style={styles.peopleText}>Pessoas</Text></Pressable></View>} />
      <Text style={styles.intro}>Conversas que fazem bem ao dia.</Text>
      <View style={styles.filters}><Pressable onPress={() => setMode('active')} style={[styles.filter, mode === 'active' && styles.filterActive]}><Text style={[styles.filterText, mode === 'active' && styles.filterTextActive]}>Conversas</Text></Pressable><Pressable onPress={() => setMode('archived')} style={[styles.filter, mode === 'archived' && styles.filterActive]}><Text style={[styles.filterText, mode === 'archived' && styles.filterTextActive]}>Arquivadas</Text></Pressable></View>
      <FlatList
        contentContainerStyle={styles.list}
        data={visibleConversations}
        keyExtractor={(item) => item.contactId}
        renderItem={({ item }) => <ConversationRow item={item} onOpen={onOpenChat} />}
        ListEmptyComponent={<Text style={styles.empty}>{mode === 'archived' ? 'Nenhuma conversa arquivada.' : 'Ainda não há conversas por aqui.'}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.background, flex: 1 },
  headerActions: { alignItems: 'center', flexDirection: 'row', gap: 8 }, profileButton: { alignItems: 'center', backgroundColor: theme.colors.sent, borderRadius: 18, height: 36, justifyContent: 'center', width: 36 }, profileText: { color: theme.colors.primary, fontSize: 12, fontWeight: '900' },
  peopleButton: { alignItems: 'center', backgroundColor: theme.colors.primarySoft, borderRadius: theme.radius.pill, flexDirection: 'row', gap: 5, paddingHorizontal: 13, paddingVertical: 9 },
  peopleIcon: { color: theme.colors.primary, fontSize: 20, fontWeight: '800' }, peopleText: { color: theme.colors.primary, fontSize: 12, fontWeight: '800' },
  intro: { color: theme.colors.muted, fontSize: 15, marginHorizontal: theme.spacing.lg, marginTop: 7 },
  filters: { flexDirection: 'row', gap: 8, marginHorizontal: theme.spacing.lg, marginTop: 18 }, filter: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.pill, paddingHorizontal: 14, paddingVertical: 8 }, filterActive: { backgroundColor: theme.colors.primary }, filterText: { color: theme.colors.muted, fontSize: 12, fontWeight: '800' }, filterTextActive: { color: '#FFFFFF' },
  list: { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg },
  row: { alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, flexDirection: 'row', marginBottom: 10, padding: 13 },
  pressed: { opacity: 0.72 }, copy: { flex: 1, marginLeft: 12 }, nameLine: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: theme.colors.ink, fontSize: 16, fontWeight: '800' }, time: { color: theme.colors.muted, fontSize: 12 },
  previewLine: { alignItems: 'center', flexDirection: 'row', marginTop: 4 }, preview: { color: theme.colors.muted, flex: 1, fontSize: 14 },
  muted: { color: theme.colors.muted, fontSize: 10, fontWeight: '800', marginLeft: 8 }, badge: { backgroundColor: theme.colors.accent, borderRadius: 12, color: theme.colors.ink, fontSize: 11, fontWeight: '800', marginLeft: 8, minWidth: 21, overflow: 'hidden', paddingHorizontal: 6, paddingVertical: 3, textAlign: 'center' }, empty: { color: theme.colors.muted, marginTop: 32, textAlign: 'center' }
});
