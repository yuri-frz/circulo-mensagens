import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../components/IconButton';
import { PreferenceSwitch } from '../components/PreferenceSwitch';
import { ScreenHeader } from '../components/ScreenHeader';
import { theme } from '../styles/theme';

const options = [
  ['readReceipts', 'Confirmações de leitura', 'Exibe quando você leu uma mensagem.'],
  ['onlineStatus', 'Status online', 'Permite que contatos vejam quando você está disponível.'],
  ['profilePhoto', 'Foto de perfil', 'Mantém a sua representação visível para contatos.']
];

export function PrivacyScreen({ preferences, onBack, onToggle, disabled = false }) {
  return <View style={styles.screen}><ScreenHeader eyebrow="sua conta" title="Privacidade" right={<IconButton icon="‹" label="Voltar às configurações" onPress={onBack} />} /><ScrollView contentContainerStyle={styles.content}><Text style={styles.intro}>Controle o que o seu círculo pode perceber sobre você.</Text><View style={styles.card}>{options.map(([key, label, description]) => <PreferenceSwitch disabled={disabled} key={key} label={label} description={description} value={preferences[key]} onToggle={() => onToggle(key)} />)}</View><View style={styles.tip}><Text style={styles.tipTitle}>Um espaço seguro</Text><Text style={styles.tipCopy}>Estas escolhas são demonstrativas e ficam salvas no servidor. Elas não alteram a visibilidade real entre usuários.</Text></View></ScrollView></View>;
}

const styles = StyleSheet.create({ screen: { flex: 1 }, content: { padding: theme.spacing.lg }, intro: { color: theme.colors.muted, fontSize: 14, lineHeight: 20, marginBottom: 16 }, card: { borderRadius: theme.radius.md, overflow: 'hidden' }, tip: { backgroundColor: theme.colors.primarySoft, borderRadius: theme.radius.md, marginTop: 18, padding: theme.spacing.md }, tipTitle: { color: theme.colors.primary, fontSize: 14, fontWeight: '900' }, tipCopy: { color: theme.colors.ink, fontSize: 13, lineHeight: 18, marginTop: 4 } });
