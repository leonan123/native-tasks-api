import htpp from "node:http"
import { json } from "./middlewares/json.js"
import { createTask } from "./routes/tasks/create-task.js"
import { getTasks } from "./routes/tasks/get-tasks.js"

import { RouteHandler } from "./routes/index.js"
import { updateTask } from "./routes/tasks/update-task.js"
import { deleteTask } from "./routes/tasks/delete-task.js"
import { completeTask } from "./routes/tasks/complete-task.js"
import { TaskNotFoundError } from "./errors/task-not-found-error.js"
import { ZodError } from "zod"

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
  } catch (error) {
    let statusCode = 500
    let message = "Internal server error."

    if (error instanceof ZodError) {
      message = "Validation error"

      return res.writeHead(400).end(
        JSON.stringify({
          message,
          errors: error.flatten().fieldErrors
        })
      )
    }

    if (error instanceof TaskNotFoundError) {
      statusCode = 404
      message = error.message
    }

    console.error(error)
    res.writeHead(statusCode).end(JSON.stringify({ message }))
  }
})

server.listen(3333)
