import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../components/IconButton';
import { PreferenceChoice } from '../components/PreferenceChoice';
import { ScreenHeader } from '../components/ScreenHeader';
import { PreferenceSwitch } from '../components/PreferenceSwitch';
import { theme } from '../styles/theme';

const modes = [
  { id: 'claro', title: 'Claro', description: 'Fundo claro e contraste suave.', swatches: ['#F7F7FB', '#6246A8', '#F29D49'] },
  { id: 'crepusculo', title: 'Crepúsculo', description: 'Uma paleta mais calma para a noite.', swatches: ['#28233A', '#A999E9', '#F29D49'] },
  { id: 'contraste', title: 'Alto contraste', description: 'Textos e ações com maior destaque.', swatches: ['#FFFFFF', '#28233A', '#6246A8'] }
];

export function AppearanceScreen({ appearance, onBack, onSelectMode, onToggleCompactList }) {
  return <View style={styles.screen}><ScreenHeader eyebrow="do seu jeito" title="Aparência" right={<IconButton icon="‹" label="Voltar às configurações" onPress={onBack} />} /><ScrollView contentContainerStyle={styles.content}><Text style={styles.intro}>Escolha como o seu Círculo aparece nesta sessão.</Text>{modes.map((mode) => <PreferenceChoice key={mode.id} {...mode} selected={appearance.mode === mode.id} onPress={() => onSelectMode(mode.id)} />)}<Text style={styles.section}>LISTA DE CONVERSAS</Text><View style={styles.card}><PreferenceSwitch label="Lista compacta" description="Mostra mais conversas na tela inicial." value={appearance.compactList} onToggle={onToggleCompactList} /></View></ScrollView></View>;
}

const styles = StyleSheet.create({ screen: { backgroundColor: theme.colors.background, flex: 1 }, content: { padding: theme.spacing.lg }, intro: { color: theme.colors.muted, fontSize: 14, lineHeight: 20, marginBottom: 16 }, section: { color: theme.colors.muted, fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: 8, marginTop: 16 }, card: { borderRadius: theme.radius.md, overflow: 'hidden' } });
