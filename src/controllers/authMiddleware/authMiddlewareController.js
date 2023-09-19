export class AuthMiddlewareController {
  constructor(authMiddlewareUseCase) {
    this._authMiddlewareUseCase = authMiddlewareUseCase;
  }

  async handle(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
      response.set("WWW-Authenticate", "Bearer");
      return response.status(401).json({ error: "authorization token not provided" });
    }

    try {
      const session = await this._authMiddlewareUseCase.execute(authorization);

      request.headers["session"] = JSON.stringify(session.toJSON());
      return next();
    } catch (err) {
      response.set("WWW-Authenticate", "Bearer");
      return response.status(401).json({ error: err.message });
    }
  }
}
