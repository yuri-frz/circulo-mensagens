import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { SettingsRow } from '../components/SettingsRow';
import { theme } from '../styles/theme';

export function SettingsScreen({ onBack, onOpenNotifications }) {
  return <View style={styles.screen}><ScreenHeader eyebrow="do seu jeito" title="Configurações" right={<Pressable accessibilityLabel="Voltar ao perfil" accessibilityRole="button" onPress={onBack} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>} /><View style={styles.content}><Text style={styles.section}>Preferências</Text><View style={styles.card}><SettingsRow label="Notificações" description="Mensagens, menções, sons e vibração" value="Ativas" onPress={onOpenNotifications} /></View><Text style={styles.note}>As escolhas deste mockup ficam ativas durante esta sessão.</Text></View></View>;
}

const styles = StyleSheet.create({ screen: { backgroundColor: theme.colors.background, flex: 1 }, back: { alignItems: 'center', height: 44, justifyContent: 'center', width: 44 }, backText: { color: theme.colors.primary, fontSize: 36 }, content: { padding: theme.spacing.lg }, section: { color: theme.colors.muted, fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }, card: { borderRadius: theme.radius.md, overflow: 'hidden' }, note: { color: theme.colors.muted, fontSize: 13, lineHeight: 18, marginTop: 14 } });
