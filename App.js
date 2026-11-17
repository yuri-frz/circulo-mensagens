import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ConversationsScreen } from './src/screens/ConversationsScreen';
import { initialConversations, initialMessages } from './src/data/conversations';
import { ChatScreen } from './src/screens/ChatScreen';
import { contacts } from './src/data/conversations';
import { ContactsScreen } from './src/screens/ContactsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { NotificationSettingsScreen } from './src/screens/NotificationSettingsScreen';
import { ensureConversation, initialNotificationPreferences, toggleConversationArchived, toggleConversationMuted, toggleNotificationPreference } from './src/state/conversationState';
import { initialProfile } from './src/state/profileState';
import { createInitialNavigation, goBack, navigateTo, openChatFromContacts, openConversationDetails, replaceRoute } from './src/navigation/navigationState';
import { ConversationDetailsScreen } from './src/screens/ConversationDetailsScreen';
import { AppearanceScreen } from './src/screens/AppearanceScreen';
import { PrivacyScreen } from './src/screens/PrivacyScreen';
import { ConversationMediaScreen } from './src/screens/ConversationMediaScreen';
import { HelpScreen } from './src/screens/HelpScreen';
import { initialAppearance, initialPrivacyPreferences, selectAppearance, togglePreference } from './src/state/appPreferences';
import { openConversationMedia, openSettingsSection } from './src/navigation/navigationState';

export default function App() {
  const [navigation, setNavigation] = useState(createInitialNavigation);
  const [profile, setProfile] = useState(initialProfile);
  const [appearance, setAppearance] = useState(initialAppearance);
  const [privacyPreferences, setPrivacyPreferences] = useState(initialPrivacyPreferences);
  const [notificationPreferences, setNotificationPreferences] = useState(initialNotificationPreferences);
  const [activeContactId, setActiveContactId] = useState(null);
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);

  function openChat(contactId) {
    setActiveContactId(contactId);
    setConversations((current) => ensureConversation(current, contactId));
    setNavigation((current) => navigateTo(current, 'chat', { contactId }));
  }

  function openChatFromPeople(contactId) {
    setActiveContactId(contactId);
    setConversations((current) => ensureConversation(current, contactId));
    setNavigation((current) => openChatFromContacts(current, contactId));
  }

  const screen = navigation.current.name;
  const back = () => setNavigation((current) => goBack(current));
  const open = (name, params) => setNavigation((current) => navigateTo(current, name, params));

  function sendMessage(text) {
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const newMessage = { id: `${activeContactId}-${Date.now()}`, text, time, mine: true };
    setMessages((current) => ({ ...current, [activeContactId]: [...(current[activeContactId] || []), newMessage] }));
    setConversations((current) => {
      const existing = current.find((item) => item.contactId === activeContactId);
      const currentConversation = { muted: false, archived: false, ...existing, contactId: activeContactId, preview: text, time, unread: 0 };
      return [currentConversation, ...current.filter((item) => item.contactId !== activeContactId)];
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {screen === 'conversations' && <ConversationsScreen conversations={conversations} onOpenChat={openChat} onOpenContacts={() => open('contacts')} onOpenProfile={() => open('profile')} />}
      {screen === 'chat' && <ChatScreen contact={contacts.find((item) => item.id === activeContactId)} messages={messages[activeContactId] || []} onBack={back} onSend={sendMessage} onOpenDetails={() => setNavigation((current) => openConversationDetails(current, activeContactId))} />}
      {screen === 'contacts' && <ContactsScreen contacts={contacts} onBack={back} onOpenChat={openChatFromPeople} />}
      {screen === 'profile' && <ProfileScreen profile={profile} onBack={back} onEdit={() => open('editProfile')} onOpenSettings={() => open('settings')} />}
      {screen === 'editProfile' && <EditProfileScreen profile={profile} onCancel={back} onSave={(nextProfile) => { setProfile(nextProfile); back(); }} />}
      {screen === 'settings' && <SettingsScreen notificationPreferences={notificationPreferences} appearance={appearance} onBack={back} onOpenNotifications={() => open('notifications')} onOpenAppearance={() => setNavigation((current) => openSettingsSection(current, 'appearance'))} onOpenPrivacy={() => setNavigation((current) => openSettingsSection(current, 'privacy'))} onOpenHelp={() => setNavigation((current) => openSettingsSection(current, 'help'))} />}
      {screen === 'notifications' && <NotificationSettingsScreen preferences={notificationPreferences} onBack={back} onToggle={(key) => setNotificationPreferences((current) => toggleNotificationPreference(current, key))} />}
      {screen === 'appearance' && <AppearanceScreen appearance={appearance} onBack={back} onSelectMode={(mode) => setAppearance((current) => selectAppearance(current, mode))} onToggleCompactList={() => setAppearance((current) => togglePreference(current, 'compactList'))} />}
      {screen === 'privacy' && <PrivacyScreen preferences={privacyPreferences} onBack={back} onToggle={(key) => setPrivacyPreferences((current) => togglePreference(current, key))} />}
      {screen === 'help' && <HelpScreen onBack={back} />}
      {screen === 'conversationDetails' && <ConversationDetailsScreen contact={contacts.find((item) => item.id === activeContactId)} conversation={conversations.find((item) => item.contactId === activeContactId)} onBack={back} onOpenMedia={() => setNavigation((current) => openConversationMedia(current, activeContactId))} onToggleMuted={() => setConversations((current) => toggleConversationMuted(current, activeContactId))} onToggleArchived={() => { setConversations((current) => toggleConversationArchived(current, activeContactId)); setNavigation((current) => replaceRoute(current, 'conversations')); }} />}
      {screen === 'conversationMedia' && <ConversationMediaScreen contact={contacts.find((item) => item.id === activeContactId)} onBack={back} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FB' }
});
