import { db } from "../db/index.js"
import { buildRoutePath } from "../utils/build-route-path.js"

export const createTask = {
  method: "POST",
  url: buildRoutePath("/tasks"),
  handler: (req, res) => {
    const data = req.body

    db.create("tasks", data)

    return res.writeHead(201).end()
  }
}
