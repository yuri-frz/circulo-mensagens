import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../components/IconButton';
import { ScreenHeader } from '../components/ScreenHeader';
import { theme } from '../styles/theme';

const questions = [
  ['Como inicio uma conversa?', 'Abra Pessoas, escolha um contato e escreva sua primeira mensagem.'],
  ['Onde encontro arquivos enviados?', 'Abra os detalhes de uma conversa para consultar as mídias e documentos compartilhados.'],
  ['As minhas escolhas ficam salvas?', 'Nesta versão acadêmica, as preferências funcionam durante a sessão atual.'],
  ['O que é o Círculo?', 'Um protótipo de mensagens criado para aproximar pessoas em conversas simples e acolhedoras.']
];

export function HelpScreen({ onBack }) {
  return <View style={styles.screen}><ScreenHeader eyebrow="precisa de uma mão?" title="Ajuda" right={<IconButton icon="‹" label="Voltar às configurações" onPress={onBack} />} /><ScrollView contentContainerStyle={styles.content}><Text style={styles.intro}>Encontre respostas rápidas sobre esta versão do Círculo.</Text>{questions.map(([question, answer]) => <View key={question} style={styles.card}><Text style={styles.question}>{question}</Text><Text style={styles.answer}>{answer}</Text></View>)}<View style={styles.footer}><Text style={styles.footerTitle}>Círculo</Text><Text style={styles.footerCopy}>Versão acadêmica • feita com Expo e React Native</Text></View></ScrollView></View>;
}

const styles = StyleSheet.create({ screen: { backgroundColor: theme.colors.background, flex: 1 }, content: { padding: theme.spacing.lg }, intro: { color: theme.colors.muted, fontSize: 14, lineHeight: 20, marginBottom: 16 }, card: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, marginBottom: 10, padding: theme.spacing.md }, question: { color: theme.colors.ink, fontSize: 15, fontWeight: '900' }, answer: { color: theme.colors.muted, fontSize: 13, lineHeight: 19, marginTop: 6 }, footer: { alignItems: 'center', marginTop: 16, padding: theme.spacing.lg }, footerTitle: { color: theme.colors.primary, fontSize: 20, fontWeight: '900' }, footerCopy: { color: theme.colors.muted, fontSize: 12, marginTop: 4, textAlign: 'center' } });
