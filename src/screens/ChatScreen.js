import { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { theme } from '../styles/theme';
import { EmptyState } from '../components/EmptyState';

export function ChatScreen({ contact, messages, onBack, onSend, onOpenDetails }) {
  const [draft, setDraft] = useState('');
  const listRef = useRef(null);
  useEffect(() => listRef.current?.scrollToEnd({ animated: true }), [messages]);
  function submit() {
    const text = draft.trim();
    if (!text) return;
    onSend(text);
    setDraft('');
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
      <View style={styles.header}>
        <Pressable accessibilityLabel="Voltar para conversas" accessibilityRole="button" onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
        <Avatar contact={contact} size={40} />
        <Pressable accessibilityLabel={`Abrir detalhes da conversa com ${contact.name}`} accessibilityRole="button" onPress={onOpenDetails} style={styles.person}><Text style={styles.name}>{contact.name}</Text><Text style={styles.status}>{contact.online ? 'disponível agora' : contact.detail}</Text></Pressable>
      </View>
      <FlatList
        ref={listRef}
        contentContainerStyle={styles.messages}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View style={[styles.bubble, item.mine ? styles.mine : styles.received]}><Text style={styles.message}>{item.text}</Text><Text style={styles.time}>{item.time}</Text></View>}
        ListEmptyComponent={<EmptyState title="Nenhuma mensagem ainda" description="Envie uma mensagem para começar esta conversa." />}
      />
      <View style={styles.composer}>
        <TextInput accessibilityLabel="Mensagem" value={draft} onChangeText={setDraft} onSubmitEditing={submit} placeholder="Escreva uma mensagem" placeholderTextColor={theme.colors.muted} returnKeyType="send" style={styles.input} />
        <Pressable accessibilityLabel="Enviar mensagem" accessibilityRole="button" accessibilityState={{ disabled: !draft.trim() }} disabled={!draft.trim()} onPress={submit} style={({ pressed }) => [styles.send, !draft.trim() && styles.sendDisabled, pressed && styles.pressed]}><Text style={styles.sendText}>↑</Text></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.background, flex: 1 }, header: { alignItems: 'center', backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.line, borderBottomWidth: 1, flexDirection: 'row', padding: 13 },
  back: { alignItems: 'center', height: 44, justifyContent: 'center', marginRight: 4, width: 44 }, backText: { color: theme.colors.primary, fontSize: 37, fontWeight: '300', lineHeight: 40 }, person: { flex: 1, justifyContent: 'center', marginLeft: 6, minHeight: 44 }, name: { color: theme.colors.ink, fontSize: 16, fontWeight: '800' }, status: { color: theme.colors.muted, fontSize: 12, marginTop: 2 },
  messages: { padding: theme.spacing.md, paddingBottom: 24 }, bubble: { alignSelf: 'flex-start', borderRadius: theme.radius.md, marginBottom: 10, maxWidth: '80%', padding: 12 }, mine: { alignSelf: 'flex-end', backgroundColor: theme.colors.sent, borderBottomRightRadius: 4 }, received: { backgroundColor: theme.colors.received, borderBottomLeftRadius: 4 }, message: { color: theme.colors.ink, fontSize: 15, lineHeight: 20 }, time: { alignSelf: 'flex-end', color: theme.colors.muted, fontSize: 10, marginTop: 5 },
  composer: { alignItems: 'center', backgroundColor: theme.colors.surface, borderTopColor: theme.colors.line, borderTopWidth: 1, flexDirection: 'row', padding: 12 }, input: { backgroundColor: theme.colors.background, borderRadius: theme.radius.pill, color: theme.colors.ink, flex: 1, fontSize: 15, minHeight: 45, paddingHorizontal: 16 }, send: { alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: 23, height: 45, justifyContent: 'center', marginLeft: 9, width: 45 }, sendDisabled: { backgroundColor: '#B8B1C7' }, sendText: { color: '#FFFFFF', fontSize: 24, fontWeight: '700', marginTop: -3 }, pressed: { opacity: 0.75 }
});
