var fs = require("fs"); 
const request = require('request');

exports.validate = (file, directorio) => {

    let sizeInit = 0
    var myVar = setInterval(() =>{
        
      try{
  
        var stats = fs.statSync(file)
  
        if (sizeInit === 0){ sizeInit = stats.mtimeMs } 
        else if (sizeInit === stats.mtimeMs){

            let preform = file.split(directorio)
  
          console.log(preform, "Archivo ", file," listo para subir", sizeInit, stats.mtimeMs)
  
          // Apago el Timer y hago Post
          timerClose()
         this.uploads(file)

  
        } else { sizeInit = stats.mtimeMs }
  
      } catch(err) {
  
        timerClose()
        console.log("Existe un inconveniente con la carga de ", file, err)
  
      }
      
    }, 5000);
  
    const timerClose = () =>{
      clearInterval(myVar);
    }
  
}


exports.uploads = (file) => {

    console.log("llego ", file)

    var r = request.post('http://localhost:3000/upload', function optionalCallback (err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
      })
      var form = r.form()
      form.append('data', fs.createReadStream(file))

}