async function run() {
  const watcher = Deno.watchFs(Deno.cwd());
  console.log(`Watching for file changes in ${Deno.cwd()}, press Ctrl+C to exit.`);
  for await (const event of watcher) {
     console.log(">>>> event", event);
  }
}

run();