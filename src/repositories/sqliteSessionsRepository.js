import { query } from "../infra/database/index.js";

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

    return { results, error };
  }
}
