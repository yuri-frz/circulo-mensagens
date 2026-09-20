import { fireEvent, render } from '@testing-library/react-native';
import { SettingsRow } from './SettingsRow';

it('abre a configuração selecionada pelo rótulo acessível', () => {
  const onPress = jest.fn();
  const screen = render(<SettingsRow label="Notificações" description="Mensagens e sons" onPress={onPress} />);
  fireEvent.press(screen.getByRole('button', { name: 'Abrir notificações' }));
  expect(onPress).toHaveBeenCalledTimes(1);
});
