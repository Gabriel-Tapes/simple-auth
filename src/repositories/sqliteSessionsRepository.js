import { query } from "../infra/database/index.js";
import { Session } from "../models/session.js";

export class SqliteSessionsRepository {
  async createSession(session) {
    const { error } = await query(
      "INSERT INTO sessions (id, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
      [session.id, session.userId, session.createdAt, session.expiresAt]
    );

    return error;
  }

  async getSession(id) {
    const { results, error } = await query(
      "SELECT user_id, created_at, expires_at FROM sessions WHERE id = ? LIMIT 1",
      [id]
    );

    if (error) throw error;
    if (results.length === 0) return null;

    const { user_id: userId, created_at: createdAt, expires_at: expiresAt } = results[0]

    return new Session({ id, userId, createdAt, expiresAt })
  }
}
