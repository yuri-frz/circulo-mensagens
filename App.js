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
import { initialNotificationPreferences, toggleConversationArchived, toggleConversationMuted, toggleNotificationPreference } from './src/state/conversationState';
import { initialProfile } from './src/state/profileState';
import { createInitialNavigation, goBack, navigateTo, openConversationDetails, replaceRoute } from './src/navigation/navigationState';
import { ConversationDetailsScreen } from './src/screens/ConversationDetailsScreen';

export default function App() {
  const [navigation, setNavigation] = useState(createInitialNavigation);
  const [profile, setProfile] = useState(initialProfile);
  const [notificationPreferences, setNotificationPreferences] = useState(initialNotificationPreferences);
  const [activeContactId, setActiveContactId] = useState(null);
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);

  function openChat(contactId) {
    setActiveContactId(contactId);
    setNavigation((current) => navigateTo(current, 'chat', { contactId }));
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
      {screen === 'contacts' && <ContactsScreen contacts={contacts} onBack={back} onOpenChat={openChat} />}
      {screen === 'profile' && <ProfileScreen profile={profile} onBack={back} onEdit={() => open('editProfile')} onOpenSettings={() => open('settings')} />}
      {screen === 'editProfile' && <EditProfileScreen profile={profile} onCancel={back} onSave={(nextProfile) => { setProfile(nextProfile); back(); }} />}
      {screen === 'settings' && <SettingsScreen notificationPreferences={notificationPreferences} onBack={back} onOpenNotifications={() => open('notifications')} />}
      {screen === 'notifications' && <NotificationSettingsScreen preferences={notificationPreferences} onBack={back} onToggle={(key) => setNotificationPreferences((current) => toggleNotificationPreference(current, key))} />}
      {screen === 'conversationDetails' && <ConversationDetailsScreen contact={contacts.find((item) => item.id === activeContactId)} conversation={conversations.find((item) => item.contactId === activeContactId)} onBack={back} onToggleMuted={() => setConversations((current) => toggleConversationMuted(current, activeContactId))} onToggleArchived={() => { setConversations((current) => toggleConversationArchived(current, activeContactId)); setNavigation((current) => replaceRoute(current, 'conversations')); }} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FB' }
});
