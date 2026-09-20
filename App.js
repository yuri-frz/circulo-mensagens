import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ConversationsScreen } from './src/screens/ConversationsScreen';
import { initialConversations } from './src/data/conversations';

export default function App() {
  const [screen, setScreen] = useState('conversations');
  const [activeContactId, setActiveContactId] = useState(null);

  function openChat(contactId) {
    setActiveContactId(contactId);
    setScreen('chat');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {screen === 'conversations' && <ConversationsScreen conversations={initialConversations} onOpenChat={openChat} onOpenContacts={() => setScreen('contacts')} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FB' }
});
