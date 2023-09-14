import { query } from "../infra/database/index.js";
import { User } from "../models/user.js";

export class SqliteUsersRepository {
  async createUser(user) {
    const { error } = await query(
      "INSERT INTO users (id, name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [user.id, user.name, user.lastName, user.email, user.password]
    );

    return error
  }

  async getUserById(id) {
    const { results, error } = await query(
      "SELECT name, last_name, email, password FROM users WHERE id = ? LIMIT 1",
      [id]
    );

    if (error) throw error;

    if (results.length === 0) return null;

    const { name, last_name: lastName, email, password } = results[0];
    return new User({ id, name, lastName, email, password });
  }

  async getUserByEmail(email) {
    const { results, error } = await query(
      "SELECT id, name, last_name, password FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (error) throw error;

    if (results.length === 0) return null;

    const { id, name, last_name: lastName, password } = results[0];
    return new User({ id, name, lastName, email, password });
  }
}
