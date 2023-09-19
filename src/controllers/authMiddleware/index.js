import { SqliteSessionsRepository } from "../../repositories/sqliteSessionsRepository.js";
import { AuthMiddlewareUseCase } from "./authMiddlewareUseCase.js";
import { AuthMiddlewareController } from "./authMiddlewareController.js";

const sessionsRepository = new SqliteSessionsRepository();
const authMiddlewareUseCase = new AuthMiddlewareUseCase(sessionsRepository);
const authMiddlewareController = new AuthMiddlewareController(authMiddlewareUseCase);

export { authMiddlewareController };
