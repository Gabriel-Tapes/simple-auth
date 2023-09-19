import { verifyJWT } from "../../utils/index.js";

export class AuthMiddlewareUseCase {
  constructor(sessionsRepository) {
    this._sessionsRepository = sessionsRepository;
  }

  async execute(jwt) {
    const [prefix, token] = jwt.split(' ');

    if (!prefix || !token) throw new Error('invalid token parts');

    if (prefix.toLowerCase() !== 'Bearer'.toLowerCase())
      throw new Error('invalid non-bearer token');

    const { id, userId, createdAt, expiresAt } = verifyJWT(token, process.env.JWT_SECRET);

    if (!id || !userId || !createdAt || !expiresAt)
      throw new Error('Invalid token payload');

    if (new Date(expiresAt).getTime() < new Date(createdAt).getTime())
      throw new Error('invalid session');

    if (new Date(expiresAt).getTime() <= Date.now())
      throw new Error('expired session');

    const session = this._sessionsRepository.getSession(id);

    if (!session) throw new Error('session not exists');

    return session;
  }
}
