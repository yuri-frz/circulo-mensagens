import { fileURLToPath } from 'node:url';
import { openStore } from './store.mjs';
import { applyAction, createState } from './domain.mjs';
import { createApi } from './http.mjs';

const filename = process.env.CIRCULO_DATA_FILE || fileURLToPath(new URL('../.local/circulo.sqlite', import.meta.url));
const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST || '127.0.0.1';
const store = openStore(filename, createState);
const server = createApi({ store, applyAction, allowedOrigin: process.env.CIRCULO_WEB_ORIGIN });
server.listen(port, host, () => {
  console.log('API do Círculo disponível em http://' + host + ':' + server.address().port);
});
server.on('close', () => store.close());
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => server.close());
}
