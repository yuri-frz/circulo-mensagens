import { getSharedContent } from './sharedContent';

it('retorna mídias e arquivos da conversa conhecida', () => {
  const content = getSharedContent('luna');
  expect(content.media).toHaveLength(3);
  expect(content.files[0]).toMatchObject({ name: 'Apresentação Círculo.pdf', type: 'PDF' });
});

it('retorna coleções vazias para contato desconhecido', () => {
  expect(getSharedContent('unknown')).toEqual({ media: [], files: [] });
});
