import { db } from "../db/index.js"
import { buildRoutePath } from "../utils/build-route-path.js"

export const completeTask = {
  method: "PATCH",
  url: buildRoutePath("/tasks/:id/complete"),
  handler: (req, res) => {
    const { id } = req.params

    const task = db.selectById("tasks", id)

    if (!task) {
      return res.writeHead(404).end(
        JSON.stringify({
          message: "task not found."
        })
      )
    }

    db.update("tasks", {
      ...task,
      updated_at: new Date().toISOString(),
      completed_at: new Date().toISOString()
    })

    return res.writeHead(204).end()
  }
}
