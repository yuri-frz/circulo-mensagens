import { createInitialNavigation, goBack, navigateTo, openChatFromContacts, openConversationDetails, replaceRoute } from './navigationState';

describe('navegação local', () => {
  it('abre o perfil a partir das conversas e retorna à lista', () => {
    const initial = createInitialNavigation();
    const profile = navigateTo(initial, 'profile');

    expect(profile.current).toEqual({ name: 'profile', params: {} });
    expect(goBack(profile).current).toEqual({ name: 'conversations', params: {} });
  });
});

it('substitui Pessoas pelo chat para voltar diretamente às conversas', () => {
  const contacts = navigateTo(createInitialNavigation(), 'contacts');
  const chat = openChatFromContacts(contacts, 'nina');
  expect(chat.stack).toEqual([{ name: 'conversations', params: {} }, { name: 'chat', params: { contactId: 'nina' } }]);
  expect(goBack(chat).current.name).toBe('conversations');
});

it('mantém a raiz ao voltar sem histórico e substitui detalhes após arquivar', () => {
  const initial = createInitialNavigation();
  expect(goBack(initial)).toBe(initial);
  const details = openConversationDetails(navigateTo(initial, 'chat', { contactId: 'bia' }), 'bia');
  const replaced = replaceRoute(details, 'conversations');
  expect(replaced.current).toEqual({ name: 'conversations', params: {} });
  expect(replaced.stack).toEqual([{ name: 'conversations', params: {} }, { name: 'chat', params: { contactId: 'bia' } }, { name: 'conversations', params: {} }]);
});

it('preserva a conversa ativa ao abrir detalhes e voltar', () => {
  const chat = navigateTo(createInitialNavigation(), 'chat', { contactId: 'luna' });
  const details = openConversationDetails(chat, 'luna');
  expect(details.current).toEqual({ name: 'conversationDetails', params: { contactId: 'luna' } });
  expect(goBack(details).current).toEqual({ name: 'chat', params: { contactId: 'luna' } });
});
