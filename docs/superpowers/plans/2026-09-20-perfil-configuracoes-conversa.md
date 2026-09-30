# Perfil, configurações e detalhes da conversa — Plano de implementação

> **Para agentes executores:** SKILL OBRIGATÓRIA: usar `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` para executar este plano tarefa por tarefa. Os passos usam caixas de seleção para acompanhamento.

**Objetivo:** Evoluir o mockup Expo com perfil, configurações, detalhes e ações de conversa em exatamente dez commits funcionais.

**Arquitetura:** `App.js` continuará como orquestrador, mas passará a consumir funções puras de estado e navegação mantidas em módulos testáveis. Telas receberão dados e callbacks; dados demonstrativos de anexos permanecerão separados da lógica mutável da sessão.

**Stack:** Expo 54, React 19, React Native 0.81, Jest/Jest Expo, React Native Testing Library.

**Especificação:** `docs/superpowers/specs/2026-09-20-perfil-configuracoes-conversa-design.md`

## Restrições globais

- O histórico final deve conter exatamente dez commits adicionais com as mensagens definidas em cada tarefa.
- Não adicionar backend, autenticação, persistência em disco, notificações reais, upload ou download.
- Preservar contatos, conversas, mensagens e fluxos existentes.
- Manter `App.js` como autoridade do estado local e usar callbacks explícitos nas telas.
- Cada commit deve passar pelos testes afetados e deixar a exportação Expo funcional.
- O documento de especificação e este plano serão incorporados ao primeiro commit funcional durante a normalização final do histórico.

## Estrutura de arquivos

- `App.js`: pilha de navegação e composição do estado local.
- `src/navigation/navigationState.js`: transições puras entre lista, chat, perfil, configurações e detalhes.
- `src/state/profileState.js`: perfil inicial, normalização e validação.
- `src/state/conversationState.js`: preferências e ações puras sobre conversas.
- `src/data/conversations.js`: contatos, conversas e mensagens existentes com metadados de estado.
- `src/data/sharedContent.js`: arquivos e mídias simulados por contato.
- `src/components/`: componentes visuais reutilizáveis e acessíveis.
- `src/screens/`: uma tela por responsabilidade.
- `src/**/*.test.js`: testes unitários e de componentes próximos ao código exercitado.

## Foco de revisão

- Nome de perfil vazio ou composto somente por espaços deve impedir salvamento sem perder a edição.
- Abrir detalhes a partir de um chat e voltar deve preservar o contato ativo e retornar ao chat.
- Arquivar deve remover a conversa da lista principal; desarquivar deve restaurá-la sem duplicação.
- Conversa sem mensagens, mídia ou arquivos deve renderizar estado vazio sem erro.
- Controles desabilitados, alternadores e botões de ícone devem expor nome, papel e estado acessíveis.

---

### Tarefa 1: Tela de perfil do usuário

**Arquivos:**
- Modificar: `package.json`
- Modificar: `package-lock.json`
- Modificar: `App.js`
- Modificar: `src/screens/ConversationsScreen.js`
- Criar: `src/state/profileState.js`
- Criar: `src/navigation/navigationState.js`
- Criar: `src/screens/ProfileScreen.js`
- Criar: `src/state/profileState.test.js`
- Criar: `src/navigation/navigationState.test.js`
- Incluir: `docs/superpowers/specs/2026-09-20-perfil-configuracoes-conversa-design.md`
- Incluir: `docs/superpowers/plans/2026-09-20-perfil-configuracoes-conversa.md`

**Interfaces:**
- Produz: `initialProfile`, `createInitialNavigation()`, `navigateTo(state, route, params)` e `goBack(state)`.
- Produz: rota `{ name: 'profile', params: {} }` e `ProfileScreen({ profile, onBack, onEdit, onOpenSettings })`.

- [ ] Escrever testes que exijam perfil inicial de Patrick e transição `conversations -> profile -> conversations`.
- [ ] Executar `npm test -- --runInBand src/state/profileState.test.js src/navigation/navigationState.test.js` e confirmar falhas por módulos ausentes.
- [ ] Instalar `jest@29.7.0`, `jest-expo@54.0.18`, `@testing-library/react-native@13.3.3` e `react-test-renderer@19.1.0` como dependências de desenvolvimento; configurar `preset: "jest-expo"`.
- [ ] Implementar os módulos mínimos, a tela de perfil e o botão de acesso no cabeçalho da lista.
- [ ] Executar os testes focados e `npx expo export --platform web --output-dir dist-codex`.
- [ ] Incorporar o commit temporário de documentação e criar o commit final `feat: cria tela de perfil do usuario`.

### Tarefa 2: Edição local do perfil

**Arquivos:**
- Modificar: `App.js`
- Modificar: `src/state/profileState.js`
- Modificar: `src/navigation/navigationState.js`
- Modificar: `src/screens/ProfileScreen.js`
- Criar: `src/screens/EditProfileScreen.js`
- Modificar: `src/state/profileState.test.js`
- Modificar: `src/navigation/navigationState.test.js`

**Interfaces:**
- Produz: `normalizeProfile(draft)` retornando campos aparados.
- Produz: `validateProfile(draft)` retornando `{ valid, errors }` com `errors.name` quando necessário.
- Produz: rota `editProfile`; salvar aplica o perfil e retorna, cancelar apenas retorna.

- [ ] Adicionar testes para aparar campos, rejeitar nome vazio, salvar sem perder campos e cancelar sem mutação.
- [ ] Executar os testes focados e confirmar falhas pelos novos comportamentos.
- [ ] Implementar formulário controlado, erro textual e callbacks de salvar/cancelar.
- [ ] Reexecutar os testes focados e a suíte completa.
- [ ] Criar o commit `feat: adiciona edicao local de perfil`.

### Tarefa 3: Tela de configurações

**Arquivos:**
- Modificar: `App.js`
- Modificar: `src/navigation/navigationState.js`
- Modificar: `src/screens/ProfileScreen.js`
- Criar: `src/screens/SettingsScreen.js`
- Criar: `src/components/SettingsRow.js`
- Modificar: `src/navigation/navigationState.test.js`

**Interfaces:**
- Produz: rota `settings` e retorno `settings -> profile`.
- Produz: `SettingsRow({ label, description, value, onPress, accessibilityLabel })`.

- [ ] Adicionar testes de navegação `profile -> settings -> profile` e teste de componente para a entrada “Notificações”.
- [ ] Executar testes focados e confirmar falha antes da implementação.
- [ ] Implementar a tela e o componente reutilizável sem preferências editáveis ainda.
- [ ] Reexecutar testes focados e a suíte completa.
- [ ] Criar o commit `feat: implementa tela de configuracoes`.

### Tarefa 4: Preferências locais de notificação

**Arquivos:**
- Modificar: `App.js`
- Modificar: `src/state/conversationState.js`
- Modificar: `src/navigation/navigationState.js`
- Modificar: `src/screens/SettingsScreen.js`
- Criar: `src/screens/NotificationSettingsScreen.js`
- Criar: `src/components/PreferenceSwitch.js`
- Criar: `src/state/conversationState.test.js`
- Modificar: `src/navigation/navigationState.test.js`

**Interfaces:**
- Produz: `initialNotificationPreferences` com `messages`, `mentions`, `sounds` e `vibration` booleanos.
- Produz: `toggleNotificationPreference(preferences, key)` sem mutar o objeto recebido.
- Produz: rota `notifications` e retorno para `settings`.

- [ ] Escrever testes de alternância imutável, chave desconhecida preservada e navegação de ida/volta.
- [ ] Executar testes focados e confirmar falhas esperadas.
- [ ] Implementar estado no `App`, alternadores acessíveis e resumo na tela de configurações.
- [ ] Reexecutar testes focados e a suíte completa.
- [ ] Criar o commit `feat: adiciona preferencias de notificacao locais`.

### Tarefa 5: Detalhes da conversa

**Arquivos:**
- Modificar: `App.js`
- Modificar: `src/navigation/navigationState.js`
- Modificar: `src/screens/ChatScreen.js`
- Criar: `src/screens/ConversationDetailsScreen.js`
- Modificar: `src/navigation/navigationState.test.js`

**Interfaces:**
- Produz: rota `{ name: 'conversationDetails', params: { contactId } }`.
- Produz: `ConversationDetailsScreen({ contact, conversation, onBack, onToggleMuted, onToggleArchived })`.

- [ ] Escrever testes que preservem `contactId` ao abrir detalhes e retornar ao chat.
- [ ] Executar teste focado e confirmar falha da rota ausente.
- [ ] Tornar o cabeçalho do chat acionável e implementar a tela de detalhes.
- [ ] Reexecutar testes focados, suíte completa e exportação web.
- [ ] Criar o commit `feat: cria tela de detalhes da conversa`.

### Tarefa 6: Arquivos e mídias da conversa

**Arquivos:**
- Criar: `src/data/sharedContent.js`
- Criar: `src/components/MediaPreview.js`
- Criar: `src/components/FileRow.js`
- Modificar: `src/screens/ConversationDetailsScreen.js`
- Criar: `src/data/sharedContent.test.js`

**Interfaces:**
- Produz: `getSharedContent(contactId)` retornando `{ media: [], files: [] }` inclusive para contato desconhecido.
- Cada mídia possui `id`, `label`, `color`, `date`; cada arquivo possui `id`, `name`, `type`, `size`, `date`.

- [ ] Escrever testes para conteúdo conhecido e retorno vazio seguro para contato desconhecido.
- [ ] Executar teste focado e confirmar falha pelo módulo ausente.
- [ ] Implementar dados simulados, grade visual local e lista de documentos.
- [ ] Reexecutar testes focados e suíte completa.
- [ ] Criar o commit `feat: exibe arquivos e midias da conversa`.

### Tarefa 7: Silenciar e arquivar conversa

**Arquivos:**
- Modificar: `App.js`
- Modificar: `src/data/conversations.js`
- Modificar: `src/state/conversationState.js`
- Modificar: `src/screens/ConversationsScreen.js`
- Modificar: `src/screens/ConversationDetailsScreen.js`
- Modificar: `src/state/conversationState.test.js`

**Interfaces:**
- Produz: `toggleConversationMuted(conversations, contactId)`.
- Produz: `toggleConversationArchived(conversations, contactId)`.
- Produz: `filterConversations(conversations, mode)` para `active` e `archived`.

- [ ] Escrever testes de imutabilidade, ID desconhecido, arquivar/desarquivar sem duplicar e filtros ativo/arquivado.
- [ ] Executar testes focados e confirmar falhas esperadas.
- [ ] Implementar indicadores, botões de ação e seletor entre conversas e arquivadas.
- [ ] Fazer arquivamento da conversa ativa retornar à lista principal.
- [ ] Reexecutar testes focados, suíte completa e criar `feat: adiciona acoes de silenciar e arquivar conversa`.

### Tarefa 8: Consistência visual das telas de Patrick

**Arquivos:**
- Modificar: `src/styles/theme.js`
- Criar: `src/components/IconButton.js`
- Criar: `src/components/SectionCard.js`
- Modificar: `src/components/Avatar.js`
- Modificar: `src/components/ScreenHeader.js`
- Modificar: `src/screens/ProfileScreen.js`
- Modificar: `src/screens/EditProfileScreen.js`
- Modificar: `src/screens/SettingsScreen.js`
- Modificar: `src/screens/NotificationSettingsScreen.js`
- Modificar: `src/screens/ConversationDetailsScreen.js`
- Criar: `src/components/components.test.js`

**Interfaces:**
- Produz: tokens `shadow`, `danger`, `success`, `text`, `caption` e componentes com estados pressionado/desabilitado coerentes.

- [ ] Escrever testes de renderização para título, seção e botão de ícone com rótulo acessível.
- [ ] Executar teste focado e confirmar falha pelos componentes ausentes.
- [ ] Extrair os padrões visuais, uniformizar cartões, títulos, ícones, tipografia e espaçamentos.
- [ ] Reexecutar suíte completa e exportação web.
- [ ] Criar o commit `style: aprimora consistencia visual das telas do Patrick`.

### Tarefa 9: Retorno entre detalhes e conversa

**Arquivos:**
- Modificar: `src/navigation/navigationState.js`
- Modificar: `App.js`
- Modificar: `src/navigation/navigationState.test.js`

**Interfaces:**
- Produz: pilha com `pushRoute`, `replaceRoute` e `goBack`; `goBack` no primeiro item mantém a rota inicial.
- Ao arquivar em detalhes, `replaceRoute` leva à lista; retornar de detalhes sem arquivar leva ao chat correto.

- [ ] Escrever regressões para duplo retorno, raiz sem histórico, troca entre contatos e arquivamento em detalhes.
- [ ] Executar teste focado e confirmar que pelo menos a regressão de pilha falha no código atual.
- [ ] Substituir transições ad hoc pela pilha mínima e preservar parâmetros da rota.
- [ ] Reexecutar teste focado, suíte completa e exportação web.
- [ ] Criar o commit `fix: corrige retorno entre detalhes e conversa`.

### Tarefa 10: Estados vazios e acessibilidade

**Arquivos:**
- Criar: `src/components/EmptyState.js`
- Modificar: `src/components/Avatar.js`
- Modificar: `src/components/IconButton.js`
- Modificar: `src/components/PreferenceSwitch.js`
- Modificar: `src/screens/ConversationsScreen.js`
- Modificar: `src/screens/ContactsScreen.js`
- Modificar: `src/screens/ChatScreen.js`
- Modificar: `src/screens/ConversationDetailsScreen.js`
- Criar: `src/components/accessibility.test.js`

**Interfaces:**
- Produz: `EmptyState({ title, description, actionLabel, onAction })`.
- Todos os controles expõem `accessibilityRole`, `accessibilityLabel` e `accessibilityState` quando aplicável.

- [ ] Escrever testes para listas vazias, mídia/arquivos vazios, busca sem resultado, botão enviar desabilitado e alternador com estado anunciado.
- [ ] Executar testes focados e confirmar falhas de semântica/estado vazio.
- [ ] Implementar estados vazios reutilizáveis, rótulos, papéis, estados e áreas de toque mínimas.
- [ ] Reexecutar testes focados, suíte completa e exportação web.
- [ ] Exercitar no navegador os fluxos de perfil, preferências, detalhes, silenciamento, arquivamento, retorno e estados vazios.
- [ ] Criar o commit `fix: melhora estados vazios e acessibilidade`.

## Verificação e normalização final

- [ ] Executar `npm test -- --runInBand` e registrar quantidade de suítes/testes.
- [ ] Executar `npx expo export --platform web --output-dir dist-codex` do zero e confirmar saída sem erro.
- [ ] Executar `git log --oneline a960e7a..HEAD` e confirmar exatamente dez commits, na ordem prevista.
- [ ] Executar `git status --short` e separar artefatos locais (`dist-codex`, `graphify-out`) do conteúdo versionado.
- [ ] Solicitar revisão independente do intervalo `a960e7a..HEAD`, corrigir achados importantes dentro do commit responsável e repetir as verificações afetadas.
