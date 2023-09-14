import { SqliteUsersRepository } from "../../repositories/sqliteUsersRepository.js";
import { CreateUserUseCase } from "./createUserUseCase.js";
import { CreateUserController } from "./createUserController.js";

const usersRepository = new SqliteUsersRepository();
const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
