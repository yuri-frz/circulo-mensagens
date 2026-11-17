import { initialAppearance, selectAppearance, togglePreference } from './appPreferences';

describe('preferências da experiência', () => {
  it('seleciona uma aparência sem perder a lista compacta', () => {
    expect(selectAppearance({ ...initialAppearance, compactList: true }, 'crepusculo')).toEqual({ mode: 'crepusculo', compactList: true });
  });

  it('alterna uma preferência de privacidade', () => {
    expect(togglePreference({ onlineStatus: true }, 'onlineStatus')).toEqual({ onlineStatus: false });
  });
});
