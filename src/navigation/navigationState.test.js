import { createInitialNavigation, goBack, navigateTo } from './navigationState';

describe('navegação local', () => {
  it('abre o perfil a partir das conversas e retorna à lista', () => {
    const initial = createInitialNavigation();
    const profile = navigateTo(initial, 'profile');

    expect(profile.current).toEqual({ name: 'profile', params: {} });
    expect(goBack(profile).current).toEqual({ name: 'conversations', params: {} });
  });
});

