import { createInitialNavigation, goBack, navigateTo, openConversationDetails } from './navigationState';

describe('navegação local', () => {
  it('abre o perfil a partir das conversas e retorna à lista', () => {
    const initial = createInitialNavigation();
    const profile = navigateTo(initial, 'profile');

    expect(profile.current).toEqual({ name: 'profile', params: {} });
    expect(goBack(profile).current).toEqual({ name: 'conversations', params: {} });
  });
});

it('preserva a conversa ativa ao abrir detalhes e voltar', () => {
  const chat = navigateTo(createInitialNavigation(), 'chat', { contactId: 'luna' });
  const details = openConversationDetails(chat, 'luna');
  expect(details.current).toEqual({ name: 'conversationDetails', params: { contactId: 'luna' } });
  expect(goBack(details).current).toEqual({ name: 'chat', params: { contactId: 'luna' } });
});
