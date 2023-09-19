import express from "express";
import { createUserController } from "./controllers/createUser/index.js";
import { loginController } from "./controllers/login/index.js";
import { authMiddlewareController } from "./controllers/authMiddleware/index.js";
import { getUserController } from "./controllers/getUser/index.js";

export const server = express();

server.use(express.json());

server.post("/create", (request, response) => createUserController.handle(request, response));
server.post("/login", (request, response) => loginController.handle(request, response));
server.use("/user", (request, response, next) => authMiddlewareController.handle(request, response, next));
server.get("/user", (request, response) => getUserController.handle(request, response));
