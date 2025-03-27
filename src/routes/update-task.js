import { db } from "../db/index.js"
import { buildRoutePath } from "../utils/build-route-path.js"

export const updateTask = {
  method: "PUT",
  url: buildRoutePath("/tasks/:id"),
  handler: (req, res) => {
    const { id } = req.params
    const data = req.body
    const task = db.selectById("tasks", id)

    if (!task) {
      return res.writeHead(404).end(
        JSON.stringify({
          message: "task not found."
        })
      )
    }

    db.update("tasks", { id, ...data })

    return res.writeHead(204).end()
  }
}
