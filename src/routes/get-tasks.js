import { db } from "../db/index.js"

export const getTasks = {
  method: "GET",
  url: "/tasks",
  handler: (req, res) => {
    const tasks = db.select("tasks")
    return res.end(JSON.stringify(tasks))
  }
}
