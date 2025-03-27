import { db } from "../db/index.js"
import { TaskNotFoundError } from "../errors/task-not-found-error.js"
import { buildRoutePath } from "../utils/build-route-path.js"

export const completeTask = {
  method: "PATCH",
  path: buildRoutePath("/tasks/:id/complete"),
  handler: (req, res) => {
    const { id } = req.params

    const task = db.select("tasks", { id })

    if (!task) {
      throw new TaskNotFoundError()
    }

    db.update("tasks", {
      ...task,
      updated_at: new Date().toISOString(),
      completed_at: new Date().toISOString()
    })

    return res.writeHead(204).end()
  }
}
