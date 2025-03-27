import htpp from "node:http"
import { json } from "./middlewares/json.js"
import { createTask } from "./routes/create-task.js"
import { getTasks } from "./routes/get-tasks.js"

import { RouteHandler } from "./routes/index.js"
import { updateTask } from "./routes/update-task.js"
import { deleteTask } from "./routes/delete-task.js"
import { completeTask } from "./routes/complete-task.js"

const routes = new RouteHandler()

routes.register(createTask)
routes.register(getTasks)
routes.register(updateTask)
routes.register(deleteTask)
routes.register(completeTask)

const server = htpp.createServer(async (req, res) => {
  await json(req, res)

  try {
    return routes.exec(req, res)
  } catch (err) {
    console.error(err)
    res.writeHead(500).end()
  }
})

server.listen(3333)
