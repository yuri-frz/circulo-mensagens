import { StyleSheet, Text, View } from 'react-native';
import { PrintTexture } from './PrintTexture';
import { theme } from '../styles/theme';

export function ScreenHeader({ eyebrow, title, right, featured = false }) {
  return (
    <View style={[styles.header, featured && styles.cover]}>
      {featured && <PrintTexture dark />}
      <View>
        {eyebrow && <Text style={[styles.eyebrow, featured && styles.coverEyebrow]}>{eyebrow}</Text>}
        <Text style={[styles.title, featured && styles.coverTitle]}>{title}</Text>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md },
  cover: { backgroundColor: theme.colors.primary, overflow: 'hidden', minHeight: 112, paddingVertical: theme.spacing.md },
  coverEyebrow: { color: theme.colors.onPrimary },
  coverTitle: { color: theme.colors.onPrimary, fontSize: 40, fontStyle: 'italic', letterSpacing: -1 },
  eyebrow: { color: theme.colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  title: { color: theme.colors.ink, fontSize: 29, fontWeight: '800', marginTop: 2 }
});
