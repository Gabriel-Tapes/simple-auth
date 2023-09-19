export class CreateUserController {
  constructor(createUserUseCase) {
    this._createUserUseCase = createUserUseCase;
  }

  async handle(request, response) {
    const { name, lastName, email, password } = request.body;

    if (!(name, lastName, email, password))
      return response.status(400).json({ error: "any required user fields are not provided" });

    try {
      const user = await this._createUserUseCase.execute({ name, lastName, email, password });

      return response.status(201).json({ user });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}
