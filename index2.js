// Setup video source folder observer for notifications of new files
var chokidar = require('chokidar');
var fs = require('fs');
const logger = console.log.bind(console);
var watcher = chokidar.watch('./my/', {
    persistent: true,
    followSymlinks: false,
    usePolling: true,
    depth: undefined,
    interval: 100,
    ignorePermissionErrors: false
});
let fileCopyDelaySeconds
watcher
    .on('ready', function() { logger('Initial scan complete. Ready for changes.'); })
    .on('unlink', function(path) { logger('File: ' + path + ', has been REMOVED'); })
    .on('error', function(err) {
        logger('Chokidar file watcher failed. ERR: ' + err.message);
    })
    .on('add', function(path) {
        logger('File', path, 'has been ADDED');

        fs.stat(path, function (err, stat) {

            if (err){
                logger('Error watching file for copy completion. ERR: ' + err.message);
                logger('Error file not processed. PATH: ' + path);
            } else {
                logger('File copy started...');
                setTimeout(checkFileCopyComplete, fileCopyDelaySeconds*1000, path, stat);
            }
        });
    });

// Makes sure that the file added to the directory, but may not have been completely copied yet by the
// Operating System, finishes being copied before it attempts to do anything with the file.
function checkFileCopyComplete(path, prev) {
    fs.stat(path, function (err, stat) {

        if (err) {
            throw err;
        }
        if (stat.mtime.getTime() === prev.mtime.getTime()) {
            logger('File copy complete => beginning processing');
            //------------------------------------- 
            // CALL A FUNCTION TO PROCESS FILE HERE
            //-------------------------------------
        }
        else {
            setTimeout(checkFileCopyComplete, fileCopyDelaySeconds*1000, path, stat);
        }
    });
}