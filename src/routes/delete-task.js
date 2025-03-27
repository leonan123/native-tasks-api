import { db } from "../db/index.js"
import { TaskNotFoundError } from "../errors/task-not-found-error.js"
import { buildRoutePath } from "../utils/build-route-path.js"

export const deleteTask = {
  method: "DELETE",
  path: buildRoutePath("/tasks/:id"),
  handler: (req, res) => {
    const { id } = req.params

    const task = db.select("tasks", { id })

    if (!task) {
      throw new TaskNotFoundError()
    }

    db.delete("tasks", id)

    return res.writeHead(204).end()
  }
}
