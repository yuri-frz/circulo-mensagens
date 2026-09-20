import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { ScreenHeader } from '../components/ScreenHeader';
import { contacts } from '../data/conversations';
import { theme } from '../styles/theme';

function ConversationRow({ item, onOpen }) {
  const contact = contacts.find((entry) => entry.id === item.contactId);
  return (
    <Pressable onPress={() => onOpen(contact.id)} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <Avatar contact={contact} />
      <View style={styles.copy}>
        <View style={styles.nameLine}><Text style={styles.name}>{contact.name}</Text><Text style={styles.time}>{item.time}</Text></View>
        <View style={styles.previewLine}><Text numberOfLines={1} style={styles.preview}>{item.preview}</Text>{item.unread > 0 && <Text style={styles.badge}>{item.unread}</Text>}</View>
      </View>
    </Pressable>
  );
}

export function ConversationsScreen({ conversations, onOpenChat, onOpenContacts, onOpenProfile }) {
  return (
    <View style={styles.screen}>
      <ScreenHeader eyebrow="seu espaço" title="Círculo" right={<View style={styles.headerActions}><Pressable onPress={onOpenProfile} style={styles.profileButton}><Text style={styles.profileText}>PO</Text></Pressable><Pressable onPress={onOpenContacts} style={styles.peopleButton}><Text style={styles.peopleIcon}>⌁</Text><Text style={styles.peopleText}>Pessoas</Text></Pressable></View>} />
      <Text style={styles.intro}>Conversas que fazem bem ao dia.</Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={conversations}
        keyExtractor={(item) => item.contactId}
        renderItem={({ item }) => <ConversationRow item={item} onOpen={onOpenChat} />}
        ListEmptyComponent={<Text style={styles.empty}>Ainda não há conversas por aqui.</Text>}
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
  list: { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.lg },
  row: { alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, flexDirection: 'row', marginBottom: 10, padding: 13 },
  pressed: { opacity: 0.72 }, copy: { flex: 1, marginLeft: 12 }, nameLine: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: theme.colors.ink, fontSize: 16, fontWeight: '800' }, time: { color: theme.colors.muted, fontSize: 12 },
  previewLine: { alignItems: 'center', flexDirection: 'row', marginTop: 4 }, preview: { color: theme.colors.muted, flex: 1, fontSize: 14 },
  badge: { backgroundColor: theme.colors.accent, borderRadius: 12, color: theme.colors.ink, fontSize: 11, fontWeight: '800', marginLeft: 8, minWidth: 21, overflow: 'hidden', paddingHorizontal: 6, paddingVertical: 3, textAlign: 'center' }, empty: { color: theme.colors.muted, textAlign: 'center' }
});
