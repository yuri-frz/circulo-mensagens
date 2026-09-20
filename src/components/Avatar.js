import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export function Avatar({ contact, size = 48 }) {
  return (
    <View accessibilityLabel={`Avatar de ${contact.name}`} style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: contact.color }]}>
      <Text style={[styles.initials, { fontSize: size * 0.31 }]}>{contact.initials}</Text>
      {contact.online && <View style={styles.presence} />}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', justifyContent: 'center', position: 'relative' },
  initials: { color: theme.colors.ink, fontWeight: '800' },
  presence: { backgroundColor: '#51B68B', borderColor: theme.colors.surface, borderRadius: 8, borderWidth: 2, bottom: -1, height: 14, position: 'absolute', right: -1, width: 14 }
});
