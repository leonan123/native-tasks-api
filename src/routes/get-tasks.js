import { db } from "../db/index.js"
import { buildRoutePath } from "../utils/build-route-path.js"

export const getTasks = {
  method: "GET",
  url: buildRoutePath("/tasks"),
  handler: (_, res) => {
    const tasks = db.selectAll("tasks")
    return res.end(JSON.stringify(tasks))
  }
}
