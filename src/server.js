import htpp from "node:http"
import { json } from "./middlewares/json.js"
import { createTask } from "./routes/create-task.js"
import { getTasks } from "./routes/get-tasks.js"

import { RouteHandler } from "./routes/index.js"

const routes = new RouteHandler()

routes.register(createTask)
routes.register(getTasks)

const server = htpp.createServer(async (req, res) => {
  await json(req, res)

  try {
    return routes.exec(req, res)
  } catch (err) {
    console.err(err)
    res.writeHead(500).end()
  }
})

server.listen(3333)
