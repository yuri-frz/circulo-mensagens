import { createServer } from 'node:http';

function send(response, status, data) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(data));
}

function originAllowed(request, allowedOrigin) {
  const origin = request.headers.origin;
  if (!origin || origin === allowedOrigin) return true;
  try {
    const caller = new URL(origin);
    const api = new URL('http://' + request.headers.host);
    return ['http:', 'https:'].includes(caller.protocol) && caller.hostname === api.hostname;
  } catch {
    return false;
  }
}

function requestError(status, message) {
  return Object.assign(new Error(message), { status });
}

async function readAction(req) {
  if (req.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    throw requestError(415, 'Envie a ação em JSON.');
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req.iterator({ destroyOnReturn: false })) {
    size += chunk.length;
    if (size > 64 * 1024) {
      req.resume();
      throw requestError(413, 'A ação excede o tamanho permitido.');
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw requestError(400, 'O conteúdo JSON é inválido.');
  }
}

export function createApi({ store, applyAction, allowedOrigin }) {
  return createServer(async (req, res) => {
    try {
      if (!originAllowed(req, allowedOrigin)) return send(res, 403, { error: 'Origem sem acesso à API.' });
      if (req.headers.origin) {
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      }
      if (req.method === 'OPTIONS') {
        res.writeHead(204, {
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
        return res.end();
      }
      if (req.url === '/api/state' && req.method === 'GET') {
        return send(res, 200, store.read());
      }
      if (req.url === '/api/actions' && req.method === 'POST') {
        const action = await readAction(req);
        return send(res, 200, store.update(state => applyAction(state, action)));
      }
      send(res, 404, { error: 'Rota desconhecida.' });
    } catch (error) {
      if (error.status >= 400 && error.status < 500) {
        return send(res, error.status, { error: error.message });
      }
      console.error(error);
      send(res, 500, { error: 'Falha ao acessar os dados do aplicativo.' });
    }
  });
}
