import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { openStore } from '../store.mjs';

test('preserva o estado entre aberturas e reverte uma alteração interrompida', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'circulo-db-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const filename = join(dir, 'nested', 'state.db');
  const init = () => ({ count: 0 });
  const first = openStore(filename, init);
  first.update(state => { state.count++; });
  first.close();
  const second = openStore(filename, init);
  try {
    assert.equal(second.read().count, 1);
    assert.throws(() => second.update(state => {
      state.count++;
      throw new Error('interrompido');
    }));
    assert.equal(second.read().count, 1);
  } finally {
    second.close();
  }
});
