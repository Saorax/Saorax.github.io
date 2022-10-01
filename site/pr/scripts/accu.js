const data = require("./data.json");
const prTemp = require("./prTemp.json");
const recency = require("./lol.json");
let regions = ["na", "eu", "sa", "sea", "aus"];
let gamemodes = ['1v1', '2v2'];
let years = [
    "2020",
    "2021",
    "2022"
];
let day = 1000 * 60 * 60 * 24;
let prRankings = [
    [
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        [],
        []
    ],
    [
        [],
        []
    ]
];
let bannedPlayers = [1363312, 249544, 216236, 1865176];
let combines = [{
    id: 544695,
    with: [1890840],
    name: "Major"
}, {
    id: 991917,
    with: [1164959],
    name: "Amayze"
}];
console.log(bannedPlayers.includes(1363312))

function currentRecency(days) {
    return 1 / (1 + Math.pow((0.9585 * 2.718281828459045), (1 / 35 * (days) - 5.21))) + 0.006765;
    //return (-1.08 / Math.PI) * Math.atan((days - 180) / 40) + 0.54
};

function returnText(input) {
    input = input.replaceAll(" -  ", " - ");
    input = input.replaceAll("Brawlhalla Championship ", "")
    input = input.replaceAll("Brawlhalla ", "")
    input = input.replaceAll(".json", "")
    let obj = {
        gamemode: "",
        name: "",
        region: ""
    };
    if (input.includes("(NA)") || input.includes("North America")) {
        obj.region = "NA";
        input = input.replaceAll(" (NA)", "");
    } else if (input.includes("(EU)") || input.includes("Europe")) {
        obj.region = "EU";
        input = input.replaceAll(" (EU)", "");
    } else if (input.includes("(SA)") || input.includes("South America")) {
        obj.region = "SA";
        input = input.replaceAll(" (SA)", "");
    } else if (input.includes("(SEA)") || input.includes("Southeast Asia")) {
        obj.region = "SEA";
        input = input.replaceAll(" (SEA)", "");
    } else if (input.includes("(AUS)") || input.includes("Australia")) {
        obj.region = "AUS";
        input = input.replaceAll(" (AUS)", "");
    };
    input = input.split(` - `);
    obj.gamemode = input[2] ? input[2] : input[1];
    obj.name = input[2] ? input[1] : input[0];
    return obj
};

function tourneyL1() {
    let temp = [];
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

    for (var i = years.length; i--;) {
        for (var d = 0; d < tempDates[i].length; d++) {
            if (tempDates[i][d].title.includes("CEO Dreamland ONLINE") !== true && tempDates[i][d].title.includes("Brawlhalla Midseason Championship") !== true) {
                let ff = false;
                for (var f = 0; f < temp.length; f++) {
                    if (temp[f].name === returnText(tempDates[i][d].title).name) {
                        ff = true
                    }
                };
                if (ff === true) {
                    for (var f = 0; f < temp.length; f++) {
                        if (temp[f].name === returnText(tempDates[i][d].title).name) {
                            if (temp[f].regions.includes(returnText(tempDates[i][d].title).region) === false) {
                                temp[f].regions.push(returnText(tempDates[i][d].title).region);

                            };
                            if (temp[f].gamemode.includes(returnText(tempDates[i][d].title).gamemode) === false) {
                                temp[f].gamemode.push(returnText(tempDates[i][d].title).gamemode)
                            };
                            if (returnText(tempDates[i][d].title).gamemode === "1v1") {
                                temp[f].files1.push({
                                    region: returnText(tempDates[i][d].title).region,
                                    file: tempDates[i][d].title
                                });
                            } else {
                                temp[f].files2.push({
                                    region: returnText(tempDates[i][d].title).region,
                                    file: tempDates[i][d].title
                                });
                            };
                        }
                    };
                } else {
                    let tem = {
                        gamemode: [],
                        year: years[i],
                        name: returnText(tempDates[i][d].title).name,
                        files1: [],
                        files2: [],
                        regions: [],
                        slug: (returnText(tempDates[i][d].title).name.replaceAll(" ", '-') + '-' + returnText(tempDates[i][d].title).gamemode).toLocaleLowerCase()
                    };
                    tem.regions.push(returnText(tempDates[i][d].title).region);
                    tem.gamemode.push(returnText(tempDates[i][d].title).gamemode);
                    if (returnText(tempDates[i][d].title).gamemode === "1v1") {
                        tem.files1.push({
                            region: returnText(tempDates[i][d].title).region,
                            file: tempDates[i][d].title
                        })
                    } else {
                        tem.files2.push({
                            region: returnText(tempDates[i][d].title).region,
                            file: tempDates[i][d].title
                        })
                    };
                    //console.log(tem)
                    temp.push(tem);
                }
            }
        }
    };
    return temp;
};

function getAccu() {
    let regi = tourneyL1();
    let time = 0
    let isStart = null;
    for (var g = 0; g < gamemodes.length; g++) {
        for (var i = 0; i < data.dates[1].list.length; i++) {
            let tempTourney = regi.filter(u => u.name === data.dates[1].list[i])[0];
            let gamemode = g === 0 ? tempTourney.files1 : tempTourney.files2;
            for (var r = 0; r < regions.length; r++) {
                let entrants = [];

                let tempRegion = gamemode.filter(u => u.region.toLocaleLowerCase() === regions[r])[0];
                if (tempRegion !== undefined) {
                    let file = require(`./pr-rankings/${tempTourney.year}/${tempRegion.file}`);

                    if (time === 0) {
                        time = file.tourneyStart * 1000;
                        isStart = true;
                    };
                    for (var b = 0; b < file.entrants.length; b++) {
                        let rece = recency[Math.round((time - file.tourneyStart * 1000) / day)];
                        if (rece === undefined || rece === 0) {
                            rece = currentRecency(Math.round((time - file.tourneyStart * 1000) / day));
                        };
                        if (g === 1) {
                            for (var n = 0; n < file.entrants[b].socials.length; n++) {
                                let tempd = {
                                    id: file.entrants[b].socials[n].smash_id,
                                    name: file.entrants[b].socials[n].name,
                                    played: 1,
                                    placeArr: [file.entrants[b].entity.placement],
                                    placement: file.entrants[b].entity.placement,
                                    total: rece * file.multiplier * file.entrants[b].total
                                };
                                if (tempd.id === 1890840) {
                                    tempd = {
                                        id: 544695,
                                        name: "Major",
                                        played: 1,
                                        placeArr: [file.entrants[b].entity.placement],
                                        placement: file.entrants[b].entity.placement,
                                        total: rece * file.multiplier * file.entrants[b].total
                                    };
                                }
                                if (tempd.id === 1164959) {
                                    tempd = {
                                        id: 991917,
                                        name: "Amayze",
                                        played: 1,
                                        placeArr: [file.entrants[b].entity.placement],
                                        placement: file.entrants[b].entity.placement,
                                        total: rece * file.multiplier * file.entrants[b].total
                                    }
                                }
                                if (!bannedPlayers.includes(tempd.id)) {
                                    if (tempd.total !== null) {
                                        entrants.push(tempd)
                                    }
                                }
                            }
                        } else {
                            let tempd = {
                                id: file.entrants[b].socials.smash_id,
                                name: file.entrants[b].socials.name,
                                played: 1,
                                placeArr: [file.entrants[b].entity.placement],
                                placement: file.entrants[b].entity.placement,
                                total: rece * file.multiplier * file.entrants[b].total
                            };
                            if (tempd.id === 1890840) {
                                tempd = {
                                    id: 544695,
                                    name: "Major",
                                    played: 1,
                                    placeArr: [file.entrants[b].entity.placement],
                                    placement: file.entrants[b].entity.placement,
                                    total: rece * file.multiplier * file.entrants[b].total
                                };
                            }
                            if (tempd.id === 1164959) {
                                tempd = {
                                    id: 991917,
                                    name: "Amayze",
                                    played: 1,
                                    placeArr: [file.entrants[b].entity.placement],
                                    placement: file.entrants[b].entity.placement,
                                    total: rece * file.multiplier * file.entrants[b].total
                                }
                            }
                            if (!bannedPlayers.includes(tempd.id)) {
                                if (tempd.total !== null) {
                                    entrants.push(tempd)
                                }
                            }
                        };
                    };
                    entrants = entrants.filter(function (name) {
                        return !(isNaN(name.total));
                    });
                    entrants.sort(function (a, b) {
                        return b.total - a.total;
                    });
                    prRankings[r][g] = [...prRankings[r][g], ...entrants]
                }
            }
        }
    }
};

function newBoard() {
    for (var i = 0; i < prRankings.length; i++) {
        for (var g = 0; g < prRankings[i].length; g++) {
            let board = [];
            for (var e = 0; e < prRankings[i][g].length; e++) {
                let sss = board.filter(u => u.id == prRankings[i][g][e].id);
                if (sss.length === 0) {
                    board.push(prRankings[i][g][e])
                } else {
                    for (var z = 0; z < board.length; z++) {
                        if (board[z].id === prRankings[i][g][e].id) {
                            board[z].total += prRankings[i][g][e].total;
                            board[z].placeArr.push(prRankings[i][g][e].placement)
                            board[z].played++;
                        }
                    }
                }
            }
            board = board.sort(function (a, b) {
                return b.total - a.total;
            });
            ///*
            board = [...board].map((e, i) => [e, i]).sort(function (a, b) {
                return b.played - a.played
            });
            let newBoard2 = [];
            for (var b = 0; b < board.length; b++) {
                const sum = board[b][0].placeArr.reduce((a, b) => a + b, 0);
                const avg = (sum / board[b][0].placeArr.length) || 0;
                newBoard2.push({
                    id: board[b][0].id,
                    name: board[b][0].name,
                    placements: board[b][0].placeArr,
                    placementAvg: avg,
                    total: board[b][0].total,
                });
            };
            board = [...newBoard2].map((e, i) => [e, i]).sort(function (a, b) {
                return b.placementAvg - a.placementAvg
            });
            newBoard2 = [];
            for (var b = 0; b < board.length; b++) {
                newBoard2.push(board[b][0]);
            };
            board = newBoard2
            //*/
            prRankings[i][g] = board
        }
    }
};

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
};

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    };
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};
async function compareOld() {
    for (var i = 0; i < gamemodes.length; i++) {
        for (var r = 0; r < regions.length; r++) {
            let file = await require(`./testing/temps/${regions[r]}${gamemodes[i]}.json`);
            let total = 0;
            let numAcc = 0;
            let inNumAcc = 0;
            let issNumAcc = false;
            let isNumAcc = false;
            let a = []
            for (var e = 0; e < file.length; e++) {
                total++;
                if (similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e].name.toLocaleLowerCase()) * 100 === 100) {
                    //console.log(`${e+1} ${file[e][3]} on point`);
                    a.filter(u => u.num === 0)[0] === undefined ? a.push({
                        num: 0,
                        total: 1
                    }) : a.filter(u => u.num === 0)[0].total++;
                    if (isNumAcc !== true) {
                        numAcc = e + 1
                    }
                } else {
                    isNumAcc = true;
                    if (e + 1 <= file.length && similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e + 1].name.toLocaleLowerCase()) * 100 === 100) {
                        //console.log(`${e+2}-${e+1} ${file[e][3]} off by 1 (+)`);
                        a.filter(u => u.num === 1)[0] === undefined ? a.push({
                            num: 1,
                            total: 1
                        }) : a.filter(u => u.num === 1)[0].total++;
                    } else if (e - 1 >= 0 && similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e - 1].name.toLocaleLowerCase()) * 100 === 100) {
                        //console.log(`${e}-${e+1} ${file[e][3]} off by 1 (-)`);
                        a.filter(u => u.num === 1)[0] === undefined ? a.push({
                            num: 1,
                            total: 1
                        }) : a.filter(u => u.num === 1)[0].total++;
                    } else if (e + 2 <= file.length && similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e + 2].name.toLocaleLowerCase()) * 100 === 100) {
                        //console.log(`${e+3}-${e+1} ${file[e][3]} off by 2 (+)`);
                        a.filter(u => u.num === 2)[0] === undefined ? a.push({
                            num: 2,
                            total: 1
                        }) : a.filter(u => u.num === 2)[0].total++;
                    } else if (e - 2 >= 0 && similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e - 2].name.toLocaleLowerCase()) * 100 === 100) {
                        //console.log(`${e-1}-${e+1} ${file[e][3]} off by 2 (-)`);
                        a.filter(u => u.num === 2)[0] === undefined ? a.push({
                            num: 2,
                            total: 1
                        }) : a.filter(u => u.num === 2)[0].total++;
                        if (isNumAcc !== true) {
                            numAcc = e - 2;
                            isNumAcc = true;
                        };
                    } else if (e + 3 <= file.length && similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e + 3].name.toLocaleLowerCase()) * 100 === 100) {
                        //console.log(`${e+4}-${e+1} ${file[e][3]} off by 3 (+)`);
                        a.filter(u => u.num === 3)[0] === undefined ? a.push({
                            num: 3,
                            total: 1
                        }) : a.filter(u => u.num === 3)[0].total++;
                        if (isNumAcc !== true) {
                            numAcc = e - 3;
                            isNumAcc = true;
                        };
                    } else if (e - 3 >= 0 && similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e - 3].name.toLocaleLowerCase()) * 100 === 100) {
                        //console.log(`${e-2}-${e+1} ${file[e][3]} off by 3 (-)`);
                        a.filter(u => u.num === 3)[0] === undefined ? a.push({
                            num: 3,
                            total: 1
                        }) : a.filter(u => u.num === 3)[0].total++;
                        if (isNumAcc !== true) {
                            numAcc = e - 3;
                            isNumAcc = true;
                        };
                    } else if (e + 4 <= file.length && similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e + 4].name.toLocaleLowerCase()) * 100 === 100) {
                        //console.log(`${e+5}-${e+1} ${file[e][3]} off by 4 (+)`);
                        a.filter(u => u.num === 4)[0] === undefined ? a.push({
                            num: 4,
                            total: 1
                        }) : a.filter(u => u.num === 4)[0].total++;
                        if (isNumAcc !== true) {
                            numAcc = e - 4;
                            isNumAcc = true;
                        };
                    } else if (e - 4 >= 0 && similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e - 4].name.toLocaleLowerCase()) * 100 === 100) {
                        //console.log(`${e-3}-${e+1} ${file[e][3]} off by 4 (-)`);
                        a.filter(u => u.num === 4)[0] === undefined ? a.push({
                            num: 4,
                            total: 1
                        }) : a.filter(u => u.num === 4)[0].total++;
                        if (isNumAcc !== true) {
                            numAcc = e - 4;
                            isNumAcc = true;
                        };
                    } else if (e + 5 <= file.length && similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e + 5].name.toLocaleLowerCase()) * 100 === 100) {
                        //console.log(`${e+6}-${e+1} ${file[e][3]} off by 5 (+)`);
                        a.filter(u => u.num === 5)[0] === undefined ? a.push({
                            num: 5,
                            total: 1
                        }) : a.filter(u => u.num === 5)[0].total++;
                        if (isNumAcc !== true) {
                            numAcc = e - 5;
                            isNumAcc = true;
                        };
                    } else if (e - 5 >= 0 && similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][e - 5].name.toLocaleLowerCase()) * 100 === 100) {
                        //console.log(`${e-4}-${e+1} ${file[e][3]} off by 5 (-)`);
                        a.filter(u => u.num === 5)[0] === undefined ? a.push({
                            num: 5,
                            total: 1
                        }) : a.filter(u => u.num === 5)[0].total++;
                        if (isNumAcc !== true) {
                            numAcc = e - 5;
                            isNumAcc = true;
                        };
                    } else {
                        for (var c = 0; c < prRankings[r][i].length; c++) {
                            if (similarity(file[e][3].toLocaleLowerCase(), prRankings[r][i][c].name.toLocaleLowerCase()) * 100 === 100) {
                                //console.log(`${c+1}-${e+1} ${file[e][3]} inaccurate (by ${(c-e)+1})`);
                                a.filter(u => u.num === (c > e ? c - e : e - c))[0] === undefined ? a.push({
                                    num: (c > e ? c - e : e - c),
                                    total: 1
                                }) : a.filter(u => u.num === (c > e ? c - e : e - c))[0].total++;
                                if (issNumAcc !== true) {
                                    inNumAcc = e + 1;
                                    issNumAcc = true
                                };
                                break;
                            }
                        };
                    }
                };
            };
            console.log(`${regions[r]} ${gamemodes[i]} summers 2022 (${total})`)
            let tex = "";
            let totalAcc = 0;
            let toTemp = 0;
            let oTemp = 0;
            let otherAcc = 0;
            a = a.sort(function (a, b) {
                return a.num - b.num;
            });
            for (var c = 0; c < a.length; c++) {
                if (a[c].num === 0) {
                    tex += `100% accurate: ${a[c].total < 10 ? ` ${a[c].total}` : a[c].total} ${Math.round(a[c].total/total*100) < 10 ? ` (${(a[c].total/total*100).toFixed(2)}%` : `(${(a[c].total/total*100).toFixed(2)}%`})\n`
                    toTemp += a[c].total;
                } else if (a[c].num <= 10) {
                    tex += `     off by ${a[c].num}: ${a[c].total < 10 && a[c].num < 10 ? ` ${a[c].total}` : a[c].total} ${Math.round(a[c].total/total*100) < 10 ? ` (${(a[c].total/total*100).toFixed(2)}%` : `(${(a[c].total/total*100).toFixed(2)}%`})\n`;
                    toTemp += a[c].total;
                } else {
                    oTemp += a[c].total;
                }
            };
            tex += `\ninaccuracy: starts at PR ${inNumAcc} (${(oTemp/total * 100).toFixed()}% inaccuracy)\n100% accurate until: PR ${numAcc}\ntotal accuracy: ${(toTemp/total*100).toFixed()}%\n\n`;
            console.log(tex);
        }
    }
};

(async () => {
    getAccu();
    newBoard();
    await compareOld();
    /*
    const fs = require('fs')
    fs.writeFileSync(`./testing/tehee.json`, JSON.stringify(prRankings[0][0]), function (err) {
        if (err) return console.log(err);
    });
    */
})();

//console.log(prRankings[0][0])