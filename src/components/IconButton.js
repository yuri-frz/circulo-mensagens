import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../styles/theme';

export function IconButton({ icon, label, onPress, disabled = false }) {
  return <Pressable accessibilityLabel={label} accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} hitSlop={6} onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}><Text style={styles.icon}>{icon}</Text></Pressable>;
}
const styles = StyleSheet.create({ button: { alignItems: 'center', backgroundColor: theme.colors.primarySoft, borderRadius: 22, height: 44, justifyContent: 'center', width: 44 }, icon: { color: theme.colors.primary, fontSize: 29, lineHeight: 32 }, pressed: { opacity: 0.65 }, disabled: { opacity: 0.42 } });
