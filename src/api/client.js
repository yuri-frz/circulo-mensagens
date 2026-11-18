export function resolveApiOrigin({ configured, hostname, hostUri } = {}) {
  if (configured?.trim()) return configured.trim().replace(/\/+$/, '');
  const host = hostname || hostUri?.split(':')[0] || 'localhost';
  return `http://${host}:3001`;
}

export function createApiClient(origin, fetcher = fetch, timeout = 10000) {
  async function request(path, action) {
    const controller = new AbortController();
    let timer;
    try {
      const response = await Promise.race([
        fetcher(`${origin}/api/${path}`, {
          method: action ? 'POST' : 'GET',
          headers: { 'Content-Type': 'application/json' },
          ...(action ? { body: JSON.stringify(action) } : {}),
          signal: controller.signal,
        }),
        new Promise((_, reject) => {
          timer = setTimeout(() => {
            controller.abort();
            reject(new Error('A conexão demorou demais. Confira a conexão e tente novamente.'));
          }, timeout);
        }),
      ]);
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.error || 'Não foi possível concluir a operação.');
        error.status = response.status;
        throw error;
      }
      if (!Array.isArray(data.contacts) || !Array.isArray(data.conversations) || !data.messages || !data.profile || !data.appearance || !data.privacyPreferences || !data.notificationPreferences) {
        throw new Error('O servidor enviou uma resposta inválida.');
      }
      return data;
    } finally {
      clearTimeout(timer);
    }
  }
  return { state: () => request('state'), action: (action) => request('actions', action) };
}
