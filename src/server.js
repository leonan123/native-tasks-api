import htpp from "node:http"
import { json } from "./middlewares/json.js"
import { createTask } from "./routes/tasks/create-task.js"
import { getTasks } from "./routes/tasks/get-tasks.js"

import { RouteHandler } from "./routes/index.js"
import { updateTask } from "./routes/tasks/update-task.js"
import { deleteTask } from "./routes/tasks/delete-task.js"
import { completeTask } from "./routes/tasks/complete-task.js"
import { TaskNotFoundError } from "./errors/task-not-found-error.js"

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
    let statusCode = 500
    let message = "Internal server error."

    if (err instanceof TaskNotFoundError) {
      statusCode = 404
      message = err.message
    }

    console.error(err)
    res.writeHead(statusCode).end(JSON.stringify({ message }))
  }
})

server.listen(3333)
