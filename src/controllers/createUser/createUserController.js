export class CreateUserController {
  constructor(createUserUseCase) {
    this._createUserUseCase = createUserUseCase;
  }

  async handle(request, response) {
    const { name, lastName, email, password } = request.body;

    if (!(name, lastName, email, password)) {
      response.statusCode = 400;
      response.write(JSON.stringify({ error: "any required user fields are not provided" }));
      return response.end();
    }

    try {
      const user = await this._createUserUseCase.execute({ name, lastName, email, password });

      response.statusCode = 201;
      response.write(JSON.stringify(user.toJSON()));

      return response.end();
    } catch (err) {
      response.statusCode = 500;
      response.write(JSON.stringify({ error: err.message }));
      return response.end();
    }
  }
}
