import crypto from "node:crypto"
import fs from "node:fs/promises"

const DATABASE_URL = new URL("./db.json", import.meta.url)

export class Database {
  static instance = null
  #database = {
    tasks: []
  }

  constructor() {
    fs.readFile(DATABASE_URL, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => this.#persist())
  }

  static getOrCreateInstance() {
    if (!Database.instance) {
      const db = new Database()
      Database.instance = db
    }

    return Database.instance
  }

  #persist() {
    fs.writeFile(DATABASE_URL, JSON.stringify(this.#database))
  }

  create(table, data) {
    const task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      created_at: new Date().toISOString(),
      updated_at: null,
      completed_at: null
    }

    if (!this.#database[table]) {
      throw new Error("table not defined.")
    }

    this.#database[table].push(task)
    this.#persist()

    return task
  }

  select(table, search) {
    if (search) {
      return this.#database[table].filter((row) =>
        Object.entries(search).some(([key, value]) =>
          row[key].toLowerCase().includes(value.toLowerCase())
        )
      )
    }

    return this.#database[table] ?? []
  }

  update(table, updatedData) {
    const rowIndex = this.#database[table].findIndex(
      (row) => row.id === updatedData.id
    )

    if (rowIndex >= 0) {
      const row = this.#database[table][rowIndex]

      this.#database[table][rowIndex] = {
        ...row,
        ...updatedData,
        updated_at: new Date().toISOString()
      }

      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((data) => data.id === id)

    if (rowIndex >= 0) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}
