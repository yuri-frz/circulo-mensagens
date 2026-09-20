import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ConversationsScreen } from './src/screens/ConversationsScreen';
import { initialConversations, initialMessages } from './src/data/conversations';
import { ChatScreen } from './src/screens/ChatScreen';
import { contacts } from './src/data/conversations';
import { ContactsScreen } from './src/screens/ContactsScreen';

export default function App() {
  const [screen, setScreen] = useState('conversations');
  const [activeContactId, setActiveContactId] = useState(null);
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);

  function openChat(contactId) {
    setActiveContactId(contactId);
    setScreen('chat');
  }

  function sendMessage(text) {
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const newMessage = { id: `${activeContactId}-${Date.now()}`, text, time, mine: true };
    setMessages((current) => ({ ...current, [activeContactId]: [...(current[activeContactId] || []), newMessage] }));
    setConversations((current) => {
      const currentConversation = { contactId: activeContactId, preview: text, time, unread: 0 };
      return [currentConversation, ...current.filter((item) => item.contactId !== activeContactId)];
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {screen === 'conversations' && <ConversationsScreen conversations={conversations} onOpenChat={openChat} onOpenContacts={() => setScreen('contacts')} />}
      {screen === 'chat' && <ChatScreen contact={contacts.find((item) => item.id === activeContactId)} messages={messages[activeContactId] || []} onBack={() => setScreen('conversations')} onSend={sendMessage} />}
      {screen === 'contacts' && <ContactsScreen contacts={contacts} onBack={() => setScreen('conversations')} onOpenChat={openChat} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FB' }
});
