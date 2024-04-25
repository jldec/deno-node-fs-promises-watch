import process from "node:process"
import fs from "node:fs/promises"

async function run() {
  const watcher = fs.watch(process.cwd(), { recursive: true })
  console.log(`Watching for file changes in ${process.cwd()}, press Ctrl+C to exit.`);

  for await (const event of watcher) {
    console.log(">>>> event", event)
  }
}

run()
