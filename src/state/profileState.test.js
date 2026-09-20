import { initialProfile, normalizeProfile, validateProfile } from './profileState';

describe('perfil inicial', () => {
  it('oferece a identidade de Patrick para a tela de perfil', () => {
    expect(initialProfile).toEqual({
      name: 'Patrick Oliveira',
      username: '@patrick',
      bio: 'Entre boas conversas, música e café.',
      email: 'patrick@circulo.app',
      phone: '(11) 98765-4321',
      initials: 'PO',
      color: '#D9D2FA'
    });
  });
});

describe('edição do perfil', () => {
  it('apara os campos textuais antes de salvar', () => {
    expect(normalizeProfile({ ...initialProfile, name: '  Patrick Lima  ', bio: '  Olá  ' })).toMatchObject({ name: 'Patrick Lima', bio: 'Olá' });
  });

  it('rejeita um nome composto somente por espaços', () => {
    expect(validateProfile({ ...initialProfile, name: '   ' })).toEqual({ valid: false, errors: { name: 'Informe seu nome.' } });
  });
});
