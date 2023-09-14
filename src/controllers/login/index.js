import { SqliteUsersRepository } from "../../repositories/sqliteUsersRepository.js";
import { SqliteSessionsRepository } from "../../repositories/sqliteSessionsRepository.js";
import { LoginUseCase } from "./loginUseCase.js";
import { LoginController } from "./loginController.js";

const usersRepository = new SqliteUsersRepository();
const sessionsRepository = new SqliteSessionsRepository();
const loginUseCase = new LoginUseCase(usersRepository, sessionsRepository);
const loginController = new LoginController(loginUseCase);

export { loginController };

