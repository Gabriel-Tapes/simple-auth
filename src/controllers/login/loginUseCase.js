import { Session } from "../../models/session.js";
import { signJWT } from "../../utils/index.js";

export class LoginUseCase {
  constructor(usersRepository, sessionsRepository) {
    this._usersRepository = usersRepository;
    this._sessionsRepository = sessionsRepository;
  }

  async execute({ email, password }) {
    const user = await this._usersRepository.getUserByEmail(email);

    if (!user) throw new Error('user not found');

    if (user.password !== password)
      throw new Error("non-matching password");

    const session = new Session({ userId: user.id, createdAt: new Date() });

    await this._sessionsRepository.createSession(session);

    const token = signJWT(session.toJSON(), process.env.JWT_SECRET, session.expiresAt);
    return token
  }
}
