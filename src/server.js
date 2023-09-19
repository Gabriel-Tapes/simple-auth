import { createServer } from "node:http";
import { createUserController } from "./controllers/createUser/index.js";
import { loginController } from "./controllers/login/index.js";
import { authMiddlewareController } from "./controllers/authMiddleware/index.js";
import { getUserController } from "./controllers/getUser/index.js";

export const server = createServer(async (request, response) => {
  const { method, url } = request
  console.log(`${method} request received on ${url}`)

  if (method === "POST")
    request.body = await getJSONBody(request);

  const methodIsAllowed = !!routes[method];

  if (!methodIsAllowed) {
    response.statusCode = 405;
    response.write(JSON.stringify({ error: `HTTP method ${method} not allowed` }));
    return response.end();
  }

  const controller = routes[request.method][request.url];

  if (!controller) {
    response.statusCode = 400;
    response.write(JSON.stringify({ error: `No route found to ${method} ${url}` }));
    return response.end();
  }

  return await controller(request, response);
});

const routes = {
  "POST": {
    "/user": async (request, response) => await createUserController.handle(request, response),
    "/login": async (request, response) => await loginController.handle(request, response)
  },
  "GET": {
    "/user": async (request, response) =>
      await authMiddlewareController
        .handle(request, response, async () =>
          await getUserController
            .handle(request, response)),
  }
}

function getJSONBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    request
      .on("data", chunk => {
        chunks.push(chunk);
      })
      .on("end", () => {
        const data = Buffer.concat(chunks).toString();

        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      })
      .on("error", err => {
        reject(err);
      })
  })
}
