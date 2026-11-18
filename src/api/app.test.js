import { fireEvent, render, waitFor } from '@testing-library/react-native';
import App from '../../App';
import { contacts, initialConversations, initialMessages } from '../data/conversations';
import { initialProfile } from '../state/profileState';
import { initialAppearance, initialPrivacyPreferences } from '../state/appPreferences';
import { initialNotificationPreferences } from '../state/conversationState';

jest.mock('../storage/snapshot', () => ({ readSnapshot: jest.fn(async () => null), writeSnapshot: jest.fn(async () => {}) }));
const state = { contacts, conversations: initialConversations, messages: initialMessages, profile: initialProfile, appearance: initialAppearance, privacyPreferences: initialPrivacyPreferences, notificationPreferences: initialNotificationPreferences };

it('carrega dados, preserva rascunho offline e repete envio com o mesmo id', async () => {
  const calls = [];
  let failSend = true;
  global.fetch = jest.fn(async (url, options) => {
    const action = options.body && JSON.parse(options.body);
    if (action?.type === 'send') {
      calls.push(action);
      if (failSend) throw new Error('Conexão perdida');
    }
    return { ok: true, json: async () => state };
  });
  const screen = render(<App />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  await waitFor(() => expect(screen.getByText(/Conectado/)).toBeTruthy());
  fireEvent.press(screen.getByRole('button', { name: 'Abrir conversa com Luna Martins' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Enviar mensagem' }).props.accessibilityState.disabled).toBe(true));
  fireEvent.changeText(screen.getByLabelText('Mensagem'), 'Olá API');
  await waitFor(() => expect(screen.getByRole('button', { name: 'Enviar mensagem' }).props.accessibilityState.disabled).toBe(false));
  fireEvent.press(screen.getByRole('button', { name: 'Enviar mensagem' }));
  await waitFor(() => expect(screen.getByText('Conexão perdida')).toBeTruthy());
  expect(screen.getByLabelText('Mensagem').props.value).toBe('Olá API');
  expect(screen.getByRole('button', { name: 'Enviar mensagem' }).props.accessibilityState.disabled).toBe(true);
  fireEvent.press(screen.getByRole('button', { name: 'Voltar para conversas' }));
  fireEvent.press(screen.getByRole('button', { name: 'Abrir conversa com Luna Martins' }));
  expect(screen.getByLabelText('Mensagem').props.value).toBe('Olá API');
  failSend = false;
  fireEvent.press(screen.getByRole('button', { name: 'Reconectar ao servidor' }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Enviar mensagem' }).props.accessibilityState.disabled).toBe(false));
  fireEvent.press(screen.getByRole('button', { name: 'Enviar mensagem' }));
  await waitFor(() => expect(screen.getByLabelText('Mensagem').props.value).toBe(''));
  expect(calls).toHaveLength(2);
  expect(calls[0].id).toBe(calls[1].id);
});


