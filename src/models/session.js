import { randomUUID } from "node:crypto";
import { sessionExpiresTime } from "../constants/index.js";

export class Session {
  constructor({ id, userId, createdAt, expiresAt }) {
    this._id = id ?? randomUUID();
    this._userId = userId;
    this._createdAt = createdAt ?? new Date();
    this._expiresAt = expiresAt ?? new Date(this._createdAt.getTime() + sessionExpiresTime);
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get createdAt() {
    return this._createdAt;
  }

  get expiresAt() {
    return this._expiresAt;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      createdAt: this.createdAt,
      expiresAt: this.expiresAt
    };
  }
}
