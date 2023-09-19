export class GetUserUseCase {
  constructor(usersRepository) {
    this._usersRepository = usersRepository;
  }

  async execute(userId) {
    return await this._usersRepository.getUserById(userId);
  }
}
