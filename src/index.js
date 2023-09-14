import { server } from "./server.js";

server.listen(3000)
server.on("listening", () => {
  console.log("Server listening at http://localhost:3000")
})
