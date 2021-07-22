const fs = require('fs');

exports.logger = (di, fi, data) => {
    const hoy = new Date();
    const today = hoy.toISOString().slice(0, 10);
    const time = hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds();
    let dataf = time+' > '+data+"\n";
    fs.access(di+fi+"-"+today+".bgt", fs.F_OK, (err) => {
        if (err) {
            fs.writeFile(di+fi+"-"+today+".bgt", dataf, function(err) {
                if(err) {console.log(err)};
            });
        } else {
            fs.appendFile(di+fi+"-"+today+".bgt", dataf, function (err) {
                if(err) {console.log(err)};
            });
        }
    })

    return dataf
    
}