const fs = require('fs')
let years = [
    "2020",
    "2021",
    "2022"
];
let tourneys = [
    [],
    [],
    []
];
for (var i = 0; i < years.length; i++) {
    fs.readdirSync(`./pr-rankings/${years[i]}/`).forEach(function (file) {
        let aha = JSON.parse(fs.readFileSync(`${__dirname}/pr-rankings/${years[i]}/${file}`));
        tourneys[i].push({
            title: file,
            start: aha.tourneyStart
        })
    });
};
console.log(tourneys)