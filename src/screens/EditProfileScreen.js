import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScreenHeader } from '../components/ScreenHeader';
import { normalizeProfile, validateProfile } from '../state/profileState';
import { theme } from '../styles/theme';

const fields = [
  ['name', 'Nome'], ['username', 'Usuário'], ['bio', 'Sobre você'], ['email', 'E-mail'], ['phone', 'Telefone']
];

export function EditProfileScreen({ profile, onCancel, onSave }) {
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState({});
  function submit() {
    const result = validateProfile(draft);
    setErrors(result.errors);
    if (result.valid) onSave(normalizeProfile(draft));
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
      <ScreenHeader eyebrow="seu perfil" title="Editar" right={<Pressable accessibilityLabel="Cancelar edição" accessibilityRole="button" onPress={onCancel} style={styles.cancel}><Text style={styles.cancelText}>Cancelar</Text></Pressable>} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {fields.map(([key, label]) => <View key={key} style={styles.field}><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} multiline={key === 'bio'} onChangeText={(value) => setDraft((current) => ({ ...current, [key]: value }))} style={[styles.input, key === 'bio' && styles.multiline, errors[key] && styles.invalid]} value={draft[key]} />{errors[key] && <Text accessibilityLiveRegion="polite" style={styles.error}>{errors[key]}</Text>}</View>)}
        <Pressable accessibilityLabel="Salvar alterações" accessibilityRole="button" onPress={submit} style={styles.save}><Text style={styles.saveText}>Salvar alterações</Text></Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: theme.colors.background, flex: 1 }, content: { padding: theme.spacing.lg },
  cancel: { justifyContent: 'center', minHeight: 44, paddingHorizontal: 8, paddingVertical: 10 }, cancelText: { color: theme.colors.primary, fontWeight: '800' },
  field: { marginBottom: 16 }, label: { color: theme.colors.ink, fontSize: 13, fontWeight: '800', marginBottom: 7 },
  input: { backgroundColor: theme.colors.surface, borderColor: theme.colors.line, borderRadius: theme.radius.sm, borderWidth: 1, color: theme.colors.ink, fontSize: 15, minHeight: 48, padding: 13 },
  multiline: { minHeight: 90, textAlignVertical: 'top' }, invalid: { borderColor: '#C43B52' }, error: { color: '#A72C42', fontSize: 12, marginTop: 5 },
  save: { alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.radius.pill, marginTop: 6, padding: 14 }, saveText: { color: '#FFFFFF', fontWeight: '900' }
});
