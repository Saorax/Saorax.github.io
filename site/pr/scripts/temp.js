const fs = require('fs');
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
const prTemp = require("./prTemp.json");
let siteData = [];
function prFiles() {
    for (var i = 0; i < years.length; i++) {
        fs.readdirSync(`./pr-rankings/${years[i]}/`).forEach(function (file) {
            let aha = JSON.parse(fs.readFileSync(`${__dirname}/pr-rankings/${years[i]}/${file}`));
            tourneys[i].push({
                title: file,
                start: aha.tourneyStart
            })
        });
    };
    fs.writeFileSync(`./prTemp.json`, JSON.stringify(tourneys), function (err) {
        if (err) return console.log(err);
    });
    console.log(tourneys)
};
async function getSiteData() {
    let tempDates = [
        prTemp[0].sort(function (a, b) {
            return b.start - a.start;
        }),
        prTemp[1].sort(function (a, b) {
            return b.start - a.start;
        }),
        prTemp[2].sort(function (a, b) {
            return b.start - a.start;
        })
    ];
    let playerArr = [];
    for (var i = years.length; i--;) {
        for (var d = 0; d < tempDates[i].length; d++) {
            playerArr.push({
                url: `./scripts/pr-rankings/${years[i]}/${tempDates[i][d].title}`
            })
        }
    };
    const promises = playerArr.map(async function (link) {
        const res =  JSON.parse(fs.readFileSync(link.url.replace("./scripts/", "./")));
        let data = {
            url: link.url,
            tourneyData: res
        };
        return data;
    });

    await Promise.all(promises).then(datasets => {
        for (var i = 0; i < datasets.length; i++) {
            siteData.push(datasets[i])
        };
    });
    fs.writeFileSync(`./siteData.json`, JSON.stringify(siteData), function (err) {
        if (err) return console.log(err);
    });
};

(async () => {
    prFiles();
    await getSiteData();
})();