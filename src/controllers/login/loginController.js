export class LoginController {
  constructor(loginUseCase) {
    this._loginUseCase = loginUseCase;
  }

  async handle(request, response) {
    const { email, password } = request.body;

    try {
      const token = await this._loginUseCase.execute({ email, password });

      return response.status(201).json({ token });
    } catch (err) {
      let statusCode = 500;

      if (err.message === "user not found")
        statusCode = 404;
      else if (err.message === "non-matching password")
        statusCode = 400;

      return response.status(statusCode).json({ error: err.message });
    }
  }
}
