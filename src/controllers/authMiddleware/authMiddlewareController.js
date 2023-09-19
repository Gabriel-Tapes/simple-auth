export class AuthMiddlewareController {
  constructor(authMiddlewareUseCase) {
    this._authMiddlewareUseCase = authMiddlewareUseCase;
  }

  async handle(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
      response.writeHead(401, { "WWW-Authenticate": "Bearer" });
      response.write(JSON.stringify({ error: "authorizarion token not provided" }));
      return response.end();
    }

    try {
      const session = await this._authMiddlewareUseCase.execute(authorization);

      request.headers["session"] = JSON.stringify(session.toJSON())
      return next();
    } catch (err) {
      response.writeHead(401, { "WWW-Authenticate": "Bearer" });
      response.write(JSON.stringify({ error: err.message }))
      return response.end();
    }
  }
}
