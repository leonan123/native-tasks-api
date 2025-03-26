import { db } from "../db/index.js"

export const createTask = {
  method: "POST",
  url: "/tasks",
  handler: (req, res) => {
    const data = req.body

    db.create("tasks", data)

    return res.writeHead(201).end()
  }
}
