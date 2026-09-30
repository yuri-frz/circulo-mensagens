import { render } from '@testing-library/react-native';
import { EmptyState } from './EmptyState';
import { PreferenceSwitch } from './PreferenceSwitch';
import { ChatScreen } from '../screens/ChatScreen';
import { ConversationToolbar } from './ConversationToolbar';

const contact = { id: 'nina', name: 'Nina Alves', detail: 'Projeto Aurora', initials: 'NA', color: '#BFE4ED', online: true };

it('explica um estado vazio e oferece ação nomeada', () => {
  const screen = render(<EmptyState title="Sem arquivos" description="Os arquivos compartilhados aparecerão aqui." actionLabel="Voltar" onAction={() => {}} />);
  expect(screen.getByText('Sem arquivos')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Voltar' })).toBeTruthy();
});

it('identifica filtros e acessos principais da lista de conversas', () => {
  const screen = render(<ConversationToolbar mode="active" onChangeMode={() => {}} onOpenContacts={() => {}} onOpenProfile={() => {}} />);
  expect(screen.getByRole('button', { name: 'Abrir perfil' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Abrir pessoas' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Conversas' }).props.accessibilityState).toEqual({ selected: true });
});

it('anuncia o estado atual da preferência', () => {
  const screen = render(<PreferenceSwitch label="Sons" description="Tocar som" value={false} onToggle={() => {}} />);
  expect(screen.getByRole('switch', { name: 'Sons' }).props.accessibilityState).toEqual({ checked: false });
});

it('desabilita o envio quando a mensagem está vazia', () => {
  const screen = render(<ChatScreen contact={contact} messages={[]} onBack={() => {}} onOpenDetails={() => {}} onSend={() => {}} />);
  expect(screen.getByRole('button', { name: 'Enviar mensagem' }).props.accessibilityState).toEqual({ disabled: true });
  expect(screen.getByText('Nenhuma mensagem ainda')).toBeTruthy();
});
