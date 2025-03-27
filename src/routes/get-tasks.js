import { db } from "../db/index.js"
import { buildRoutePath } from "../utils/build-route-path.js"

export const getTasks = {
  method: "GET",
  path: buildRoutePath("/tasks"),
  handler: (req, res) => {
    const { search } = req.query

    const tasks = db.select(
      "tasks",
      search && {
        title: search,
        description: search
      }
    )

    return res.end(JSON.stringify(tasks))
  }
}
