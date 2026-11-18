# Círculo Mensagens

O app Expo usa um perfil de demonstração compartilhado. As conversas, as mensagens, o perfil e as preferências ficam em um banco SQLite no computador que roda a API.

## Rodar no computador

Com o Docker Desktop aberto, execute `docker compose up --build -d` na pasta do projeto e abra [o Círculo no navegador](http://localhost:8081). A API atende na porta 3001 e o SQLite fica no volume `dados`. Para parar o projeto e manter as conversas, execute `docker compose down`.

### Rodar sem Docker

Use Node.js 22.22 ou superior. Na pasta do projeto, instale as dependências com `npm ci --legacy-peer-deps`. Abra dois terminais nessa mesma pasta.

1. No primeiro, execute `npm run api`. O endereço padrão é `http://127.0.0.1:3001`.
2. No segundo, execute `npm run web` e abra o endereço indicado pelo Expo. Use o mesmo nome de host em ambos. Para definir outro endereço da API, configure `EXPO_PUBLIC_API_URL` no terminal do Expo antes de iniciar.

## Usar um celular com Expo Go

Conecte o computador e o celular à mesma rede de confiança. No PowerShell do primeiro terminal, defina `$env:HOST = '0.0.0.0'` e execute `npm run api`. No segundo, execute `npm start` e leia o QR Code com uma versão do Expo Go compatível com o SDK 54. Se precisar configurar o endereço manualmente, use `$env:EXPO_PUBLIC_API_URL = 'http://IP-DO-COMPUTADOR:3001'` antes de iniciar o Expo. O firewall do computador deve permitir o acesso nessa rede.

## Dados e verificação

O servidor cria `.local/circulo.sqlite` no primeiro uso. Reiniciar a API conserva as alterações. Para usar um banco separado, indique seu caminho em `CIRCULO_DATA_FILE`. O app guarda a última consulta no dispositivo para leitura sem conexão.

A API foi feita para demonstração local com um único perfil. Qualquer pessoa com acesso ao serviço pode consultar e alterar seus dados.

Execute `npm run test:api` para verificar o backend e `npm test -- --runInBand` para verificar o app.
