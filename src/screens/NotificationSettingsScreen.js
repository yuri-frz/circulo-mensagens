import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PreferenceSwitch } from '../components/PreferenceSwitch';
import { ScreenHeader } from '../components/ScreenHeader';
import { theme } from '../styles/theme';

const options = [
  ['messages', 'Novas mensagens', 'Avisar quando uma nova mensagem chegar.'],
  ['mentions', 'Menções', 'Destacar quando alguém mencionar você.'],
  ['sounds', 'Sons', 'Reproduzir um som para novos avisos.'],
  ['vibration', 'Vibração', 'Vibrar junto com os avisos.']
];

export function NotificationSettingsScreen({ preferences, onBack, onToggle }) {
  return <View style={styles.screen}><ScreenHeader eyebrow="preferências" title="Notificações" right={<Pressable accessibilityLabel="Voltar às configurações" accessibilityRole="button" onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>} /><View style={styles.content}><View style={styles.card}>{options.map(([key, label, description]) => <PreferenceSwitch key={key} label={label} description={description} value={preferences[key]} onToggle={() => onToggle(key)} />)}</View></View></View>;
}

const styles = StyleSheet.create({ screen: { backgroundColor: theme.colors.background, flex: 1 }, back: { alignItems: 'center', height: 44, justifyContent: 'center', width: 44 }, backText: { color: theme.colors.primary, fontSize: 36 }, content: { padding: theme.spacing.lg }, card: { borderRadius: theme.radius.md, overflow: 'hidden' } });
