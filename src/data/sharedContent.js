import { palette } from '../styles/theme';

const contentByContact = {
  luna: {
    media: [
      { id: 'm1', label: 'Café da manhã', color: palette.lilac, date: 'Hoje' },
      { id: 'm2', label: 'Paleta do projeto', color: palette.mist, date: 'Ontem' },
      { id: 'm3', label: 'Mesa de trabalho', color: palette.heather, date: '12 set' }
    ],
    files: [
      { id: 'f1', name: 'Apresentação Círculo.pdf', type: 'PDF', size: '2,4 MB', date: 'Hoje' },
      { id: 'f2', name: 'Notas da reunião.docx', type: 'DOCX', size: '380 KB', date: 'Ontem' }
    ]
  },
  caio: { media: [], files: [{ id: 'f3', name: 'Roteiro do encontro.pdf', type: 'PDF', size: '820 KB', date: '8 set' }] }
};

export function getSharedContent(contactId) {
  return contentByContact[contactId] || { media: [], files: [] };
}

