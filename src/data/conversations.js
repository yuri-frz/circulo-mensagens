export const contacts = [
  { id: 'luna', name: 'Luna Martins', detail: 'Design e café', initials: 'LM', color: '#F6CACA', online: true },
  { id: 'caio', name: 'Caio Nunes', detail: 'Sempre em movimento', initials: 'CN', color: '#CDE8DD', online: false },
  { id: 'bia', name: 'Bia Rocha', detail: 'Clube do livro', initials: 'BR', color: '#D9D2FA', online: true },
  { id: 'davi', name: 'Davi Lima', detail: 'Fotos analógicas', initials: 'DL', color: '#F8DEB5', online: false },
  { id: 'nina', name: 'Nina Alves', detail: 'Projeto Aurora', initials: 'NA', color: '#BFE4ED', online: true }
];

export const initialConversations = [
  { contactId: 'luna', preview: 'A apresentação ficou linda!', time: '09:42', unread: 2, muted: false, archived: false },
  { contactId: 'caio', preview: 'Te encontro depois do almoço.', time: '08:15', unread: 0, muted: false, archived: false },
  { contactId: 'bia', preview: 'Já escolheu o próximo livro?', time: 'Ontem', unread: 0, muted: false, archived: false },
  { contactId: 'davi', preview: 'Vou revelar as fotos no sábado.', time: 'Sex', unread: 1, muted: false, archived: false }
];

export const initialMessages = {
  luna: [
    { id: 'l1', text: 'Bom dia! Você conseguiu finalizar os slides?', time: '09:35', mine: false },
    { id: 'l2', text: 'Consegui sim, acabei de enviar.', time: '09:39', mine: true },
    { id: 'l3', text: 'A apresentação ficou linda!', time: '09:42', mine: false }
  ],
  caio: [{ id: 'c1', text: 'Te encontro depois do almoço.', time: '08:15', mine: false }],
  bia: [{ id: 'b1', text: 'Já escolheu o próximo livro?', time: 'Ontem', mine: false }],
  davi: [{ id: 'd1', text: 'Vou revelar as fotos no sábado.', time: 'Sex', mine: false }],
  nina: []
};
