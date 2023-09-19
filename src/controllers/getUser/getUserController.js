export class GetUserController {
  constructor(getUserUseCase) {
    this._getUserUseCase = getUserUseCase;
  }

  async handle(request, response) {
    const session = JSON.parse(request.headers["session"]);

    if (!session) {
      response.statusCode = 403;
      response.write(JSON.stringify({ error: "user is not authenticated" }));
      return response.end();
    }

    const user = await this._getUserUseCase.execute(session.userId);

    if (!user) {
      response.statusCode = 404;
      response.write(JSON.stringify({ error: "user not found" }));
      return response.end();
    }

    response.statusCode = 200;
    response.write(JSON.stringify({ user: user.toJSON() }));
    return response.end();
  }
}
