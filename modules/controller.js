var fs = require("fs"); 
const request = require('request');
const l = require("./logger")

exports.validate = (file, directorio, server, logDir) => {

    let sizeInit = 0
    var myVar = setInterval(() =>{
        
      try{
  
        var stats = fs.statSync(file)
  
        if (sizeInit === 0){ sizeInit = stats.mtimeMs } 
        else if (sizeInit === stats.mtimeMs){

            let preform = file.split(directorio)
            l.logger(logDir, "CLIENTE", "Archivo " + file + " listo para subir")
  
          // Apago el Timer y hago Post
          timerClose()
         this.uploads(file, server, logDir)

  
        } else { sizeInit = stats.mtimeMs }
  
      } catch(err) {
  
        timerClose()
        l.logger(logDir, "CLIENTE", "Existe un inconveniente con la carga de " + file + err)
  
      }
      
    }, 5000);
  
    const timerClose = () =>{
      clearInterval(myVar);
    }
  
}


exports.uploads = (file, server, logDir) => {

    var r = request.post(server, function optionalCallback (err, httpResponse, body) {
        if (err) {
          l.logger(logDir, "CLIENTE",'upload failed:' + err)
        }
        l.logger(logDir, "CLIENTE",'Upload successful!  Server responded with:' + body)
      })
      var form = r.form()
      form.append('data', fs.createReadStream(file))

}