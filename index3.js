const chokidar = require('chokidar');

const log = console.log.bind(console);
const watcher = chokidar.watch('./my/', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    awaitWriteFinish: {
        stabilityThreshold: 100000
    }
  });

watcher
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('add', path => log(`file ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => { // internal
    log(event + 'Raw event info:', path);
  });