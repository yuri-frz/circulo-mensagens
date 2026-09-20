import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Círculo</Text>
        <Text style={styles.subtitle}>Mensagens que aproximam.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FB' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#3E2A62', fontSize: 32, fontWeight: '800' },
  subtitle: { color: '#716B7E', fontSize: 16, marginTop: 8 }
});
