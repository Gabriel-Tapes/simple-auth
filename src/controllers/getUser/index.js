import { SqliteUsersRepository } from "../../repositories/sqliteUsersRepository.js";
import { GetUserUseCase } from "./getUserUseCase.js";
import { GetUserController } from "./getUserController.js";

const usersRepository = new SqliteUsersRepository();
const getUserUseCase = new GetUserUseCase(usersRepository);
const getUserController = new GetUserController(getUserUseCase);

export { getUserController };
