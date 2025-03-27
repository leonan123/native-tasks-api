import fs from "node:fs"
import { parse } from "csv-parse"

const CSV_FILE_NAME = "csv-tasks.csv"
const DIRNAME = new URL(".", import.meta.url).pathname
const FULL_CSV_PATH = DIRNAME.concat(CSV_FILE_NAME)

const processFile = async () => {
  const parser = fs.createReadStream(FULL_CSV_PATH).pipe(
    parse({
      columns: true,
      delimiter: ",",
      skip_empty_lines: true
    })
  )

  for await (const record of parser) {
    const response = await fetch("http://localhost:3333/tasks", {
      method: "POST",
      body: JSON.stringify(record)
    })

    console.log(response.status)
  }
}

async function run() {
  await processFile()
}

run()
