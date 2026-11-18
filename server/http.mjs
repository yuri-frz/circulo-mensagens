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

export function createApi({ store, allowedOrigin }) {
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
      send(res, 404, { error: 'Rota desconhecida.' });
    } catch (error) {
      console.error(error);
      send(res, 500, { error: 'Falha ao acessar os dados do aplicativo.' });
    }
  });
}
