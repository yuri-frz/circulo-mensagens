import { initialProfile } from './profileState';

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

