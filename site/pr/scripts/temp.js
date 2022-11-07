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
const recency = require("./lol.json");
let siteData = [];

async function prFiles() {
    for (var i = 0; i < years.length; i++) {
        let b = [
            [],
            [],
            []
        ];
        const files = await fs.promises.readdir(`./pr-rankings/${years[i]}/`);
        for (const file of files) {
            let aha = await JSON.parse(fs.readFileSync(`${__dirname}/pr-rankings/${years[i]}/${file}`));
            tourneys[i].push({
                title: file,
                entrants: aha.entrants.length,
                start: aha.tourneyStart
            })
        };
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
        const res = JSON.parse(fs.readFileSync(link.url.replace("./scripts/", "./")));
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

function retReg(input) {
    if (input.includes("(NA)") || input.includes("North America")) {
        return 0;
    } else if (input.includes("(EU)") || input.includes("Europe")) {
        return 1;
    } else if (input.includes("(SA)") || input.includes("South America")) {
        return 2;
    } else if (input.includes("(SEA)") || input.includes("Southeast Asia")) {
        return 3;
    } else if (input.includes("(AUS)") || input.includes("Australia")) {
        return 4;
    } else return 5;
}
async function getPerRegion() {
    let regions = [
        [],
        [],
        [],
        [],
        []
    ];
    const res = JSON.parse(fs.readFileSync("./siteData.json"));
    for (var i = 0; i < res.length; i++) {
        if (retReg(res[i].url) !== 5) {
            if (res[i].url.includes("2021") || res[i].url.includes("2022") || res[i].url.includes("2020")) {
                for (var e = 0; e < res[i].tourneyData.entrants.length; e++) {
                    let entrant = res[i].tourneyData.entrants[e];
                    if (entrant.socials.smash_id) {
                        regions[retReg(res[i].url)].push(entrant.socials.smash_id)
                    } else {
                        for (var b = 0; b < entrant.socials.length; b++) {
                            regions[retReg(res[i].url)].push(entrant.socials[b].smash_id)
                        }
                    }
                }
            }
        }
    }
    for (var r = 0; r < regions.length; r++) {
        regions[r] = [...new Set(regions[r])]
    };
    fs.writeFileSync(`./regionIds.json`, JSON.stringify(regions), function (err) {
        if (err) return console.log(err);
    });
}

function recencyTesting() {
    let balls = 0;
    for (var i = 0; i < recency.length; i++) {
        if (recency[i] !== 0) balls++
        if (recency[i] !== 0 && recency[i] > (1 / (1 + Math.pow((0.9585 * 2.718281828459045), (((1 / 35) * i) - 5.21))) + 0.006765)) {
            console.log(`day ${i}\n${recency[i]}\n${1 / (1 + Math.pow((0.9585 * 2.718281828459045), (((1 / 35) * i) - 5.21))) + 0.006765}\n${recency[i] - (1 / (1 + Math.pow((0.9585 * 2.718281828459045), (((1 / 35) * i) - 5.21))) + 0.006765)}\n`);
        }
    };
    console.log(balls)
    console.log(balls / recency.length * 100)
}
(async () => {
    await prFiles();
    await getSiteData();
    await getPerRegion()
    //recencyTesting();
})();