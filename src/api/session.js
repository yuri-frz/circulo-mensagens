// Uma sessão compartilha o bloqueio entre todas as telas e ações.
export function createSession(client, persist) {
  let value = { state: null, online: false, busy: false, error: '' };
  const listeners = new Set();
  function update(patch) {
    value = { ...value, ...patch };
    listeners.forEach((listener) => listener(value));
  }
  async function execute(operation) {
    if (value.busy) return false;
    update({ busy: true, error: '' });
    try {
      const state = await operation();
      update({ state, online: true });
      // Falha no cache não invalida a confirmação do servidor.
      try { await persist(state); } catch { /* A próxima confirmação tenta gravar novamente. */ }
      return true;
    } catch (error) {
      update({ error: error.message || 'Não foi possível conectar.', ...(!error.status ? { online: false } : {}) });
      return false;
    } finally {
      update({ busy: false });
    }
  }
  return {
    get: () => value,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    hydrate(state) { if (state && !value.state) update({ state }); },
    refresh: () => execute(() => client.state()),
    act(action) {
      if (!value.online) { update({ error: 'Você está offline. Reconecte para salvar alterações ou enviar mensagens.' }); return Promise.resolve(false); }
      return execute(() => client.action(action));
    },
  };
}
