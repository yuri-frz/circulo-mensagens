import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export function ScreenHeader({ eyebrow, title, right }) {
  return (
    <View style={styles.header}>
      <View>
        {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
        <Text style={styles.title}>{title}</Text>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.md },
  eyebrow: { color: theme.colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  title: { color: theme.colors.ink, fontSize: 29, fontWeight: '800', marginTop: 2 }
});
