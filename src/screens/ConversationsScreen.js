import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { ConversationToolbar } from '../components/ConversationToolbar';
import { contacts } from '../data/conversations';
import { theme } from '../styles/theme';
import { filterConversations } from '../state/conversationState';
import { EmptyState } from '../components/EmptyState';

function ConversationRow({ item, onOpen }) {
  const contact = contacts.find((entry) => entry.id === item.contactId);
  return (
    <Pressable accessibilityLabel={`Abrir conversa com ${contact.name}`} accessibilityRole="button" onPress={() => onOpen(contact.id)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
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
      <ConversationToolbar mode={mode} onChangeMode={setMode} onOpenContacts={onOpenContacts} onOpenProfile={onOpenProfile} />
      <FlatList
        contentContainerStyle={styles.list}
        data={visibleConversations}
        keyExtractor={(item) => item.contactId}
        renderItem={({ item }) => <ConversationRow item={item} onOpen={onOpenChat} />}
        ListEmptyComponent={<EmptyState title={mode === 'archived' ? 'Nenhuma conversa arquivada' : 'Ainda não há conversas'} description={mode === 'archived' ? 'Quando você arquivar uma conversa, ela aparecerá aqui.' : 'Comece uma conversa com alguém do seu círculo.'} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.background, flex: 1 },
  list: { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg },
  row: { alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, flexDirection: 'row', marginBottom: 10, padding: 13 },
  pressed: { opacity: 0.72 }, copy: { flex: 1, marginLeft: 12 }, nameLine: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: theme.colors.ink, fontSize: 16, fontWeight: '800' }, time: { color: theme.colors.muted, fontSize: 12 },
  previewLine: { alignItems: 'center', flexDirection: 'row', marginTop: 4 }, preview: { color: theme.colors.muted, flex: 1, fontSize: 14 },
  muted: { color: theme.colors.muted, fontSize: 10, fontWeight: '800', marginLeft: 8 }, badge: { backgroundColor: theme.colors.accent, borderRadius: 12, color: theme.colors.ink, fontSize: 11, fontWeight: '800', marginLeft: 8, minWidth: 21, overflow: 'hidden', paddingHorizontal: 6, paddingVertical: 3, textAlign: 'center' }, empty: { color: theme.colors.muted, marginTop: 32, textAlign: 'center' }
});
