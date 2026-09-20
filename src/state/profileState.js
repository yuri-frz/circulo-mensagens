export const initialProfile = {
  name: 'Patrick Oliveira',
  username: '@patrick',
  bio: 'Entre boas conversas, música e café.',
  email: 'patrick@circulo.app',
  phone: '(11) 98765-4321',
  initials: 'PO',
  color: '#D9D2FA'
};

export function normalizeProfile(profile) {
  return Object.fromEntries(Object.entries(profile).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
}

export function validateProfile(profile) {
  const normalized = normalizeProfile(profile);
  const errors = {};
  if (!normalized.name) errors.name = 'Informe seu nome.';
  return { valid: Object.keys(errors).length === 0, errors };
}
