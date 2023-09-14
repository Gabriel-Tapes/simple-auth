import { AsyncDatabase } from "promised-sqlite3";

export async function migrate() {
  const errors = await Promise.all(
    createTablesQueries.map(async sql => {
      const { error } = await query(sql);

      return error;
    })
  );

  return errors;
}

export async function query(sql, params) {
  const db = await AsyncDatabase.open(process.env.DATABASE);

  let results = null;
  let error = null;
  await db.run("BEGIN");

  try {
    results = await db.all(sql, params);
    await db.run("COMMIT");
  } catch (err) {
    await db.run("ROLLBACK");

    error = err
  } finally {
    await db.close();
    return { results, error };
  }
}

const createTablesQueries = [
  `
    CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL
    );
`,
  `
    CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ NOT NULL,

    CONSTRAINT FK_USER
    FOREIGN KEY(user_id) 
    REFERENCES users(id)
    ON DELETE CASCADE
    );
`
]
