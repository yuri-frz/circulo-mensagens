import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

// Cada comando lê e grava o estado do perfil dentro da mesma transação.
export function openStore(filename, createState) {
  if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true });
  const db = new DatabaseSync(filename);
  try {
    db.exec('PRAGMA busy_timeout = 5000');
    db.exec('CREATE TABLE IF NOT EXISTS app_state (id INTEGER PRIMARY KEY CHECK (id = 1), body TEXT NOT NULL)');
    const select = db.prepare('SELECT body FROM app_state WHERE id = 1');
    if (!select.get()) {
      db.prepare('INSERT OR IGNORE INTO app_state (id, body) VALUES (1, ?)').run(JSON.stringify(createState()));
    }
    const save = db.prepare('UPDATE app_state SET body = ? WHERE id = 1');
    const read = () => JSON.parse(select.get().body);
    return {
      read,
      update(change) {
        db.exec('BEGIN IMMEDIATE');
        try {
          const state = read();
          change(state);
          save.run(JSON.stringify(state));
          db.exec('COMMIT');
          return state;
        } catch (error) {
          db.exec('ROLLBACK');
          throw error;
        }
      },
      close: () => db.close()
    };
  } catch (error) {
    db.close();
    throw error;
  }
}
