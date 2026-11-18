import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

async function boot(filename, t) {
  const child = spawn(process.execPath, [fileURLToPath(new URL('../index.mjs', import.meta.url))], {
    env: { ...process.env, HOST: '127.0.0.1', PORT: '0', CIRCULO_DATA_FILE: filename },
    stdio: ['ignore', 'pipe', 'inherit']
  });
  const exited = once(child, 'exit');
  const stop = async () => {
    if (child.exitCode === null && !child.killed) child.kill();
    await exited;
  };
  t.after(stop);
  const lines = createInterface({ input: child.stdout });
  try {
    for await (const line of lines) {
      const origin = line.match(/http:\/\/127\.0\.0\.1:\d+$/)?.[0];
      if (origin) return { origin, stop };
    }
    throw new Error('API encerrou antes de informar seu endereço.');
  } finally {
    lines.close();
  }
}

test('reabrir a API e repetir um envio conserva histórico, ordem e preferências', { timeout: 15000 }, async t => {
  const dir = await mkdtemp(join(tmpdir(), 'circulo-restart-'));
  try {
    const filename = join(dir, 'state.sqlite');
    const first = await boot(filename, t);
    const action = { type: 'send', contactId: 'nina', id: 'envio-repetido', text: 'Até sábado!' };
    const post = async (origin, command) => {
      const result = await fetch(origin + '/api/actions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(command)
      });
      assert.equal(result.status, 200);
      return result.json();
    };
    try {
      await post(first.origin, action);
      await post(first.origin, { type: 'flags', contactId: 'nina', muted: true });
    } finally {
      await first.stop();
    }
    const second = await boot(filename, t);
    try {
      const state = await post(second.origin, action);
      assert.equal(state.messages.nina.length, 1);
      assert.equal(state.messages.nina[0].text, action.text);
      assert.equal(state.conversations[0].contactId, 'nina');
      assert.equal(state.conversations[0].muted, true);
      const read = await fetch(second.origin + '/api/state');
      assert.deepEqual(await read.json(), state);
    } finally {
      await second.stop();
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
