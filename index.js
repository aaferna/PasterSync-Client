const chokidar = require('chokidar');
const path = require('path');
const deployPath = path.dirname(process.execPath);
const c = require(path.join(deployPath, 'config.json'));
// const c = require('./config.json');

const controller = require("./modules/controller"); 

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
.on('ready', () =>  console.log('Servicio inicializado, y mirando el directorio ' + directorio))
.on('add', (path) => { controller.validate(path, directorio, server, logDir) })