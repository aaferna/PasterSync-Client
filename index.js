const chokidar = require('chokidar');

var c = require(__dirname,"/config.json"); 
var controller = require("./modules/controller"); 

let directorio = c.directorio
let server = c.server
let logDir = c.log

const watcher = chokidar.watch(directorio, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
  followSymlinks: false,
  disableGlobbing: true
});

watcher
.on('ready', () =>  console.log('Initial scan complete. Ready for changes'))
.on('add', (path) => { controller.validate(path, directorio, server, logDir) })