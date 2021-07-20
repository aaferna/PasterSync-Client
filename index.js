const chokidar = require('chokidar');

// One-liner for current directory
chokidar.watch('./my/').on('add', (event, path, file) => {
  console.log(event, path);
});