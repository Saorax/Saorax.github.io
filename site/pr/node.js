var fs = require('fs');
var path = require('path');
async function folders() {
    const directoryPath = path.join(__dirname, '../../pr');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        };
        files.forEach(function (file) {
            const directoryPath1 = path.join(__dirname, `../../pr/${file}`);
            fs.readdir(directoryPath1, function (err, files1) {
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                };
                files1.forEach(function (file1) {
                    // do things here per file
                    let person = JSON.parse(fs.readFileSync(`${__dirname}../../pr/${file}/${file1}`));
                    console.log(person)
                    if (person.tourney.event.name.includes('1v1')) {
                        
                    } else if (person.tourney.event.name.includes('2v2')) {
                        
                    }
                });
            });
        });
    });
}
folders()