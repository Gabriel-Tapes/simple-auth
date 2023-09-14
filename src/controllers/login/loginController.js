export class LoginController {
  constructor(loginUseCase) {
    this._loginUseCase = loginUseCase;
  }

  async handle(request, response) {
    const { email, password } = request.body;

    try {
      const token = await this._loginUseCase.execute({ email, password });

      response.statusCode = 201;
      response.write(JSON.stringify({ token }));
    } catch (err) {
      response.statusCode = 500;

      if (err.message === "user not found")
        response.statusCode = 404;
      else if (err.message === "non-matching password")
        response.statusCode = 400;

      response.write(JSON.stringify({ error: err.message }));
    } finally {
      return response.end();
    }
  }
}
