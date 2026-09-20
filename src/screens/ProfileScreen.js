import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../components/Avatar';
import { ScreenHeader } from '../components/ScreenHeader';
import { theme } from '../styles/theme';
import { IconButton } from '../components/IconButton';
import { SectionCard } from '../components/SectionCard';

export function ProfileScreen({ profile, onBack, onEdit, onOpenSettings }) {
  return (
    <View style={styles.screen}>
      <ScreenHeader eyebrow="seu espaço" title="Perfil" right={<IconButton icon="×" label="Voltar às conversas" onPress={onBack} />} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Avatar contact={profile} size={88} />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.username}>{profile.username}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          <Pressable onPress={onEdit} style={styles.primaryButton}><Text style={styles.primaryText}>Editar perfil</Text></Pressable>
        </View>
        <SectionCard title="Contato"><View style={styles.card}>
          <Text style={styles.label}>E-mail</Text><Text style={styles.value}>{profile.email}</Text>
          <View style={styles.divider} />
          <Text style={styles.label}>Telefone</Text><Text style={styles.value}>{profile.phone}</Text>
        </View></SectionCard>
        <Pressable onPress={onOpenSettings} style={styles.settings}><Text style={styles.settingsText}>Configurações</Text><Text style={styles.arrow}>›</Text></Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.background, flex: 1 },
  content: { padding: theme.spacing.lg },
  hero: { alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg, padding: theme.spacing.lg, ...theme.shadow },
  name: { color: theme.colors.ink, fontSize: 23, fontWeight: '800', marginTop: 14 },
  username: { color: theme.colors.primary, fontSize: 14, fontWeight: '700', marginTop: 3 },
  bio: { color: theme.colors.muted, fontSize: 15, lineHeight: 21, marginTop: 12, textAlign: 'center' },
  primaryButton: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.pill, marginTop: 20, paddingHorizontal: 24, paddingVertical: 12 },
  primaryText: { color: '#FFFFFF', fontWeight: '800' },
  card: { paddingVertical: theme.spacing.md },
  label: { color: theme.colors.muted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' }, value: { color: theme.colors.ink, fontSize: 15, marginTop: 5 },
  divider: { backgroundColor: theme.colors.line, height: 1, marginVertical: 14 },
  settings: { alignItems: 'center', backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, flexDirection: 'row', marginTop: 14, padding: theme.spacing.md },
  settingsText: { color: theme.colors.ink, flex: 1, fontSize: 16, fontWeight: '800' }, arrow: { color: theme.colors.primary, fontSize: 27 }
});
