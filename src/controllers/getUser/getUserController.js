export class GetUserController {
  constructor(getUserUseCase) {
    this._getUserUseCase = getUserUseCase;
  }

  async handle(request, response) {
    const session = JSON.parse(request.header("session"));

    if (!session)
      return response.status(403).json({ error: "user is not authenticated" });

    try {
      const user = await this._getUserUseCase.execute(session.userId);
      if (!user)
        return response.status(404).json({ error: "user not found" });

      return response.status(200).json({ user });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  }
}
