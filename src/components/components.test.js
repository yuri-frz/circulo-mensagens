import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { IconButton } from './IconButton';
import { SectionCard } from './SectionCard';

it('aciona o botão de ícone por um nome acessível', () => {
  const onPress = jest.fn();
  const screen = render(<IconButton icon="‹" label="Voltar" onPress={onPress} />);
  fireEvent.press(screen.getByRole('button', { name: 'Voltar' }));
  expect(onPress).toHaveBeenCalledTimes(1);
});

it('apresenta título e conteúdo de uma seção', () => {
  const screen = render(<SectionCard title="Contato"><Text>E-mail</Text></SectionCard>);
  expect(screen.getByText('Contato')).toBeTruthy();
  expect(screen.getByText('E-mail')).toBeTruthy();
});
