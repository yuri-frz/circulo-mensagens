import { StyleSheet, Text, View } from 'react-native';
import { palette, theme } from '../styles/theme';

// A cor exibida também vale para contatos já salvos no banco ou no cache.
const avatarColors = { luna: palette.lilac, caio: palette.heather, bia: palette.mauve, davi: palette.mist, nina: palette.lavender };

export function Avatar({ contact, size = 48 }) {
  return (
    <View accessibilityLabel={`Avatar de ${contact.name}`} style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: avatarColors[contact.id] || palette.lilac }]}>
      <Text style={[styles.initials, { fontSize: size * 0.31 }]}>{contact.initials}</Text>
      {contact.online && <View style={styles.presence} />}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', justifyContent: 'center', position: 'relative' },
  initials: { color: theme.colors.ink, fontWeight: '800' },
  presence: { backgroundColor: palette.violet, borderColor: theme.colors.surface, borderRadius: 8, borderWidth: 2, bottom: -1, height: 14, position: 'absolute', right: -1, width: 14 }
});
