import { User } from "../../models/user.js";

export class CreateUserUseCase {
  constructor(usersRepository) {
    this._usersRepository = usersRepository;
  }

  async execute({ name, lastName, email, password }) {
    const user = new User({ name, lastName, email, password });

    const error = await this._usersRepository.createUser(user);
    if (error) throw error;
    return user;
  }
}
