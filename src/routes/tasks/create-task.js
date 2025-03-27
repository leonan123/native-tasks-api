import { db } from "../../db/index.js"
import { createTaskSchema } from "../../schemas/index.js"
import { buildRoutePath } from "../../utils/build-route-path.js"

export const createTask = {
  method: "POST",
  path: buildRoutePath("/tasks"),
  handler: (req, res) => {
    const data = createTaskSchema.parse(req.body)

    db.create("tasks", data)

    return res.writeHead(201).end()
  }
}
