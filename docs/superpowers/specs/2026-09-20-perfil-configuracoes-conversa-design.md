# Perfil, configurações e detalhes da conversa

## Objetivo

Completar a metade do mockup atribuída ao projeto com dez incrementos funcionais e visualmente coerentes: perfil, edição local, configurações, notificações, detalhes da conversa, arquivos e mídias, silenciamento, arquivamento, consistência visual, navegação corrigida, estados vazios e acessibilidade.

O resultado continua sendo um protótipo Expo local. Não haverá autenticação, backend, upload real, armazenamento persistente nem sincronização remota.

## Estado atual

O aplicativo possui três destinos controlados por `App.js`: conversas, chat e contatos. Contatos, conversas e mensagens vêm de `src/data/conversations.js`; as telas compartilham o tema de `src/styles/theme.js`.

O mapa produzido pelo Graphify contém 66 nós, 98 relações e seis comunidades. Ele identifica `App.js` como ponte entre estado, dados e telas. Por isso, a evolução manterá a orquestração no componente raiz, mas moverá apresentação e dados simulados para módulos próprios.

## Arquitetura

`App.js` manterá uma pilha de navegação local suficiente para representar a rota atual e o retorno correto. Também será a autoridade dos estados mutáveis da sessão: perfil, preferências de notificação e propriedades das conversas.

As telas não modificarão dados diretamente. Elas receberão valores e callbacks explícitos. Dados somente de demonstração, como mídia compartilhada e documentos, ficarão em um módulo de dados separado.

Componentes reutilizáveis de linha, seção, botão de ícone e estado vazio serão usados onde reduzirem duplicação real. O tema ganhará tokens adicionais para estados semânticos, sombras, tipografia e áreas de toque, sem substituir a identidade visual existente.

## Fluxos

### Perfil e edição

A lista de conversas oferecerá acesso ao perfil de Patrick. A tela mostrará avatar, nome, descrição e dados de contato. A edição ocorrerá em uma tela própria, com campos controlados. Salvar atualizará o estado em memória e retornará ao perfil; cancelar retornará sem modificar os dados.

Nome e descrição serão normalizados com `trim`. Nome vazio impedirá o salvamento e exibirá mensagem acessível. Os demais campos poderão ficar vazios no mockup.

### Configurações e notificações

O perfil dará acesso às configurações. A tela de configurações terá uma entrada para notificações e uma visão compacta do estado atual.

A tela de notificações permitirá alternar mensagens, menções, sons e vibração. As escolhas permanecerão durante a sessão e serão refletidas ao retornar às configurações.

### Detalhes da conversa

Tocar no cabeçalho do chat abrirá os detalhes da conversa ativa. A tela mostrará o contato, status da conversa, ações de silenciar e arquivar e uma seção de conteúdo compartilhado.

O retorno de detalhes sempre levará ao chat da mesma pessoa. O retorno do chat continuará levando à lista de conversas. Nenhuma rota dependerá apenas de trocar uma string sem registrar a origem.

### Arquivos e mídias

Mídias e arquivos serão cartões simulados associados ao identificador do contato. Imagens usarão blocos visuais locais para evitar rede instável; documentos apresentarão nome, tipo, tamanho e data. Quando não houver conteúdo, a tela exibirá um estado vazio específico.

### Silenciar e arquivar

Silenciar alternará `muted` na conversa e atualizará imediatamente o resumo e a tela de detalhes. Arquivar alternará `archived`; conversas arquivadas sairão da lista principal e poderão ser vistas por um filtro de arquivadas. Desarquivar as devolverá à lista principal.

Arquivar a conversa ativa retornará à lista após a atualização, evitando deixar o usuário em uma conversa que acabou de remover da visão principal.

## Acessibilidade e estados vazios

Todos os controles interativos terão `accessibilityRole`, rótulo descritivo e estado quando aplicável. Áreas de toque terão pelo menos 44 pontos. Botões desabilitados informarão `accessibilityState.disabled`.

Serão contemplados estados sem conversas, sem conversas arquivadas, sem mensagens, sem mídia, sem arquivos e sem resultados de busca. O texto não dependerá exclusivamente de cor ou símbolos para transmitir estado.

## Estratégia dos dez commits

1. Criar a tela de perfil e a navegação até ela.
2. Adicionar edição local validada do perfil.
3. Implementar a tela principal de configurações.
4. Adicionar preferências locais de notificação.
5. Criar os detalhes da conversa e sua navegação.
6. Exibir arquivos e mídias simulados por conversa.
7. Implementar silenciamento, arquivamento e filtro de arquivadas.
8. Unificar componentes, espaçamentos e identidade visual das telas de Patrick.
9. Corrigir e testar a pilha de retorno entre detalhes, chat e lista.
10. Completar estados vazios, semântica acessível e áreas de toque.

Cada commit deverá manter o projeto exportável e representar um incremento observável. O histórico final terá exatamente esses dez commits adicionais; documentos de projeto e infraestrutura de teste serão incorporados ao primeiro commit funcional que os exigir.

## Validação

As regras puras de perfil, preferências, arquivamento e navegação serão cobertas por testes unitários escritos antes da implementação. O projeto será verificado com a suíte completa e com a exportação web do Expo.

Os fluxos principais também serão exercitados no navegador: abrir e editar perfil, mudar preferências, abrir detalhes, alternar silenciamento, arquivar e desarquivar, navegar de volta e conferir estados vazios e rótulos acessíveis.

## Fora do escopo

- Persistência após encerrar ou recarregar o aplicativo.
- Integração com servidor, autenticação ou notificações reais.
- Upload, download ou visualização real de anexos.
- Reações, chamadas, grupos ou encaminhamento de mensagens.
- Alterações nas funcionalidades atribuídas ao outro integrante além dos pontos de integração necessários.
