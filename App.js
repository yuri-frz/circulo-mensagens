import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, View, Text, Pressable } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { ConversationsScreen } from './src/screens/ConversationsScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { ContactsScreen } from './src/screens/ContactsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { NotificationSettingsScreen } from './src/screens/NotificationSettingsScreen';
import { ConversationDetailsScreen } from './src/screens/ConversationDetailsScreen';
import { AppearanceScreen } from './src/screens/AppearanceScreen';
import { PrivacyScreen } from './src/screens/PrivacyScreen';
import { ConversationMediaScreen } from './src/screens/ConversationMediaScreen';
import { HelpScreen } from './src/screens/HelpScreen';
import { createInitialNavigation, goBack, navigateTo, openChatFromContacts, replaceRoute } from './src/navigation/navigationState';
import { createApiClient, resolveApiOrigin } from './src/api/client';
import { createSession } from './src/api/session';
import { readSnapshot, writeSnapshot } from './src/storage/snapshot';

export default function App() {
  const [navigation, setNavigation] = useState(createInitialNavigation);
  const [drafts, setDrafts] = useState({});
  const [profileDraft, setProfileDraft] = useState(null);
  const pendingSends = useRef({});
  const sessionRef = useRef(null);
  if (!sessionRef.current) {
    const origin = resolveApiOrigin({ configured: process.env.EXPO_PUBLIC_API_URL, hostname: globalThis.location?.hostname, hostUri: Constants.expoConfig?.hostUri });
    sessionRef.current = { origin, session: createSession(createApiClient(origin), (state) => writeSnapshot(origin, state)) };
  }
  const { origin, session } = sessionRef.current;
  const [connection, setConnection] = useState(session.get);
  useEffect(() => {
    let active = true;
    const unsubscribe = session.subscribe(setConnection);
    (async () => {
      try { const cached = await readSnapshot(origin); if (active) session.hydrate(cached); } catch { /* O servidor continua disponível sem cache. */ }
      if (active) await session.refresh();
    })();
    return () => { active = false; unsubscribe(); };
  }, [origin, session]);
  const screen = navigation.current.name;
  const contactId = navigation.current.params.contactId;
  const back = () => setNavigation((current) => goBack(current));
  const open = (name, params) => setNavigation((current) => navigateTo(current, name, params));
  const disabled = !connection.online || connection.busy;
  const state = connection.state;
  const contact = state?.contacts.find((item) => item.id === contactId);
  const conversation = state?.conversations.find((item) => item.contactId === contactId);
  function openChat(id, fromPeople = false) {
    setNavigation((current) => fromPeople ? openChatFromContacts(current, id) : navigateTo(current, 'chat', { contactId: id }));
    if (connection.online) session.act({ type: 'open', contactId: id });
  }
  async function sendMessage(text) {
    const id = contactId;
    const draftAtSend = drafts[id];
    let action = pendingSends.current[id];
    if (!action || action.text !== text) {
      action = { type: 'send', contactId: id, text, id: `${id}-${Date.now()}-${Math.random().toString(36).slice(2)}` };
      pendingSends.current[id] = action;
    }
    const success = await session.act(action);
    if (success) {
      delete pendingSends.current[id];
      setDrafts((current) => current[id] === draftAtSend ? { ...current, [id]: '' } : current);
    }
    return success;
  }
  function preference(group, key, value) { return session.act({ type: 'preference', group, key, value }); }
  async function saveProfile(profile) {
    const route = navigation.current;
    if (await session.act({ type: 'profile', profile })) {
      setProfileDraft(null);
      setNavigation((current) => current.current === route ? goBack(current) : current);
    }
  }
  async function archive() {
    const route = navigation.current;
    if (await session.act({ type: 'flags', contactId, archived: !conversation?.archived })) {
      setNavigation((current) => current.current === route ? replaceRoute(current, 'conversations') : current);
    }
  }
  return <SafeAreaView style={styles.container}>
    <StatusBar style="dark" />
    <View style={styles.connection}>
      <Text accessibilityLiveRegion="polite" style={styles.connectionText}>{connection.busy ? 'Conectando…' : connection.online ? 'Conectado · demonstração com perfil compartilhado' : state ? 'Offline · mostrando dados salvos' : 'Conecte ao servidor para começar'}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Reconectar ao servidor" accessibilityState={{ disabled: connection.busy }} disabled={connection.busy} onPress={() => session.refresh()} style={styles.retry}><Text style={styles.retryText}>Reconectar</Text></Pressable>
    </View>
    {!!connection.error && <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>{connection.error}</Text>}
    {!state && <View style={styles.loading}><Text>{connection.busy ? 'Carregando suas conversas…' : 'Não foi possível carregar. Confira o servidor e toque em Reconectar.'}</Text></View>}
    {state && <>
      {screen === 'conversations' && <ConversationsScreen contacts={state.contacts} conversations={state.conversations} onOpenChat={openChat} onOpenContacts={() => open('contacts')} onOpenProfile={() => open('profile')} />}
      {screen === 'contacts' && <ContactsScreen contacts={state.contacts} onBack={back} onOpenChat={(id) => openChat(id, true)} />}
      {screen === 'chat' && contact && <ChatScreen key={contactId} contact={contact} messages={state.messages[contactId] || []} onBack={back} onSend={sendMessage} draft={drafts[contactId] || ''} onDraftChange={(text) => setDrafts((current) => ({ ...current, [contactId]: text }))} disabled={disabled} sending={connection.busy} onOpenDetails={() => open('conversationDetails', { contactId })} />}
      {screen === 'profile' && <ProfileScreen profile={state.profile} onBack={back} onEdit={() => { if (!profileDraft) setProfileDraft(state.profile); open('editProfile'); }} onOpenSettings={() => open('settings')} />}
      {screen === 'editProfile' && <EditProfileScreen profile={state.profile} draft={profileDraft} onDraftChange={setProfileDraft} disabled={disabled} onCancel={() => { setProfileDraft(null); back(); }} onSave={saveProfile} />}
      {screen === 'settings' && <SettingsScreen notificationPreferences={state.notificationPreferences} appearance={state.appearance} onBack={back} onOpenNotifications={() => open('notifications')} onOpenAppearance={() => open('appearance')} onOpenPrivacy={() => open('privacy')} onOpenHelp={() => open('help')} />}
      {screen === 'notifications' && <NotificationSettingsScreen preferences={state.notificationPreferences} onBack={back} onToggle={(key) => preference('notificationPreferences', key, !state.notificationPreferences[key])} />}
      {screen === 'appearance' && <AppearanceScreen appearance={state.appearance} onBack={back} onSelectMode={(mode) => preference('appearance', 'mode', mode)} onToggleCompactList={() => preference('appearance', 'compactList', !state.appearance.compactList)} />}
      {screen === 'privacy' && <PrivacyScreen preferences={state.privacyPreferences} onBack={back} onToggle={(key) => preference('privacyPreferences', key, !state.privacyPreferences[key])} />}
      {screen === 'help' && <HelpScreen onBack={back} />}
      {screen === 'conversationDetails' && contact && <ConversationDetailsScreen contact={contact} conversation={conversation} onBack={back} onOpenMedia={() => open('conversationMedia', { contactId })} onToggleMuted={() => session.act({ type: 'flags', contactId, muted: !conversation?.muted })} onToggleArchived={archive} />}
      {screen === 'conversationMedia' && contact && <ConversationMediaScreen contact={contact} onBack={back} />}
    </>}
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FB' },
  connection: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 7, backgroundColor: '#EDE9F5' },
  connectionText: { flex: 1, fontSize: 12, color: '#44385C' }, retry: { minHeight: 44, justifyContent: 'center', paddingLeft: 10 }, retryText: { color: '#6040A0', fontWeight: '700' },
  error: { padding: 12, color: '#A72C42' }, loading: { padding: 24 },
});
