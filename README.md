For https://github.com/denoland/deno/issues/23562

Version: Deno 1.42.4

The deno polyfill for `node fsPromises.watch()` does not appear to return an `AsyncIterator` [as documented](https://nodejs.org/docs/v20.12.1/api/fs.html#fspromiseswatchfilename-options) here for node.

With deno run, using the returned watcher with `for await` throws `TypeError: watcher is not async iterable`.
The same code works with node. 

```
$ deno run fswatch-node.js
✅ Granted read access to <CWD>.
Watching for file changes in /Users/jldec/opral/deno, press Ctrl+C to exit.
error: Uncaught (in promise) TypeError: watcher is not async iterable
  for await (const event of watcher) {
                            ^
    at run (file:///Users/jldec/opral/deno/fswatch-node.js:8:29)
    at file:///Users/jldec/opral/deno/fswatch-node.js:13:1
    
$ node fswatch-node.js 
Watching for file changes in /Users/jldec/opral/deno-node-fs-promises-watch, press Ctrl+C to exit.
>>>> event { eventType: 'rename', filename: 'foo.bar' }
```

## repro

**[fswatch-node.js](https://github.com/jldec/deno-node-fs-promises-watch/blob/main/fswatch-node.js)** from: https://github.com/jldec/deno-node-fs-promises-watch
```js
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
```

Ref: https://github.com/denoland/deno/blob/main/ext/node/polyfills/_fs/_fs_watch.ts#L126C5-L126C18

