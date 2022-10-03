let bigTourney;
let char;
let userTourneyData;
let currentPlay;
let phaseData = {};
let isOffline = false;
let radioButtons1;
let curTourn;
let currentSortedHistory = [];
var playerDiv = document.getElementsByClassName('showPlayers');
var players;

(async () => {
    await getTourneys();
    if (para.get('playerId')) {
        await loadPlayer(para.get("playerId"))
    }
})();

function copyLink(text) {
    navigator.clipboard.writeText(text);
}
$(document).ready(async function () {
    console.log("hi")
    $("#searchP").on("input", function (e) {
        playerDiv[0].innerHTML = "";
        playerDiv[0].style.display = "grid";
        let name = e.target.value;
        if (name !== "") {
            for (var i in players) {
                if (players[i].name !== null) {
                    if (players[i].name.toLocaleLowerCase() == name || players[i].alias.some(x => x.toLowerCase() == name.toLowerCase())) {
                        let tempAl = "";
                        if (players[i].alias.length !== 1) {
                            tempAl = players[i].alias.join(", ");
                            tempAl = tempAl.replace(`${players[i].name}, `, "")
                        } else {
                            tempAl = "none"
                        };
                        tempAl = `<span><strong>Aliases</strong>: ${tempAl}</span>`;
                        let totalTour = [0, 0, 0];
                        let img = "";
                        if (players[i].images.length !== 0 && players[i].images.some(x => x.type.toLowerCase() == "profile")) {
                            for (var t = 0; t < players[i].images.length; t++) {
                                if (players[i].images[t].type === "profile") {
                                    img = `<a href="javascript:void(0)" onclick="loadPlayer(${players[i].id})" class="playerImg1">
                                              <img alt="${players[i].name}" src="${players[i].images[t].url}" class="playerImg2">
                                           </a>`
                                }
                            }
                        } else {
                            img =
                                `<div class="playerImg1"><div class="playerLetter">${players[i].name.charAt(0)}</div></div>`
                        }
                        for (var p in players[i].tourneys) {
                            totalTour[0] += players[i].tourneys[p][0].length;
                            totalTour[1] += players[i].tourneys[p][1].length;
                            totalTour[2] += players[i].tourneys[p][2].length;
                        };
                        playerDiv[0].innerHTML += `<div style="visibility: visible; transform-origin: 50% 50% 0px;" class="player">
                        ${img}
                        <div class="playerData">
                            <a href="javascript:void(0)" class="nav-link2 link-secondary" onclick="loadPlayer(${players[i].id})">${players[i].name} (${players[i].smash.slug.replace("user/", "")})</a>
                            ${tempAl}
                            <span><strong>${totalTour[0]+totalTour[1]+totalTour[2]} tournaments played</strong></span>
                            <br>
                        </div>
                        `
                    }
                }
            }
        }
    });
});

async function getTourneys() {
    bigTourney = await fetch("./scripts/tourneys.json").then(function (response) {
        return response
    }).then(function (data) {
        return data.json()
    }).catch(function (err) {
        console.log('Fetch problem show: ' + err.message);
    });
    let bigs = [
        []
    ];
    let dat1 = await fetch("./scripts/official-players.json").then(function (response) {
        return response
    }).then(function (data) {
        return data.json()
    }).catch(function (err) {
        console.log('Fetch problem show: ' + err.message);
    });
    bigs[0] = dat1[0];
    let dat2 = await fetch("./scripts/community-players.json").then(function (response) {
        return response
    }).then(function (data) {
        return data.json()
    }).catch(function (err) {
        console.log('Fetch problem show: ' + err.message);
    });
    for (var com in dat2[0]) {
        if (!bigs[0][com]) {
            bigs[0][com] = dat2[0][com]
        } else {
            for (var tourn in dat2[0][com].tourneys) {
                for (var s = 0; s < dat2[0][com].tourneys[tourn].length; s++) {
                    for (var c = 0; c < dat2[0][com].tourneys[tourn][s].length; c++) {
                        bigs[0][com].tourneys[tourn][s].push(dat2[0][com].tourneys[tourn][s][c])
                    }
                }
            }
        }
    };
    players = bigs[0];
    char = await fetch(`./scripts/characters.json`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Opera GX\";v=\"84\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "none"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    }).then(res => res.json()).catch(err => {
        console.log(err);
    });
};

function createThrottle(max) {
    if (typeof max !== 'number') {
        throw new TypeError('`createThrottle` expects a valid Number')
    }

    let cur = 0
    const queue = []

    function throttle(fn) {
        return new Promise((resolve, reject) => {
            function handleFn() {
                if (cur < max) {
                    throttle.current = ++cur
                    fn()
                        .then(val => {
                            resolve(val)
                            throttle.current = --cur
                            if (queue.length > 0) {
                                queue.shift()()
                            }
                        })
                        .catch(err => {
                            reject(err)
                            throttle.current = --cur
                            if (queue.length > 0) {
                                queue.shift()()
                            }
                        })
                } else {
                    queue.push(handleFn)
                }
            }

            handleFn()
        })
    }

    // keep copies of the "state" for retrospection
    throttle.current = cur
    throttle.queue = queue

    return throttle
};
const throttle = createThrottle(30);
async function tourneyList(type) {
    let data;
    let typ = ["1v1", "2v2", "Other"];
    let temas = [`<hr style="max-width:33%; margin:1rem auto;"/>`, `<hr style="max-width:33%; margin:1rem auto;"/>`, ""]
    var tourneyList = document.getElementById('tourneyList');

    tourneyList.innerHTML = "";

    let typs = {};

    if (document.querySelector('input[name="btnradio3"]:checked').id.replace('btnradio', '') === "Offi") {
        for (var i in userTourneyData) {
            typs[i] = [
                [],
                [],
                []
            ];
            for (var s = 0; s < userTourneyData[i].length; s++) {
                typs[i][s] = userTourneyData[i][s].filter(u => u.type === 0);
            }
        }
    } else if (document.querySelector('input[name="btnradio3"]:checked').id.replace('btnradio', '') === "Comm") {
        for (var i in userTourneyData) {
            typs[i] = [
                [],
                [],
                []
            ];
            for (var s = 0; s < userTourneyData[i].length; s++) {
                typs[i][s] = userTourneyData[i][s].filter(u => u.type === 1)
            }
        }
    } else {
        for (var i in userTourneyData) {
            typs[i] = userTourneyData[i]
        }
    };
    if (type === "all") {
        for (var i in typs) {
            let tempData = `<h2 style="text-align:center">${i}</h2>`;
            //data = data.sort((a, b) => a.tourney_id - b.tourney_id);
            if (document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '') !== "Allv") {
                let tema = ``
                if (typs[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)].length === 0) {
                    tema += "No Tournaments Found"
                }
                tempData += `<h3>${tema}</h3>`;
                //typs[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)] = typs[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)].sort((a, b) => a.tourney_id - b.tourney_id);
                for (var t = 0; t < typs[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)].length; t++) {

                    let tourneyId = typs[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)][t].tourney_id;

                    let tourney = bigTourney[tourneyId];
                    let placement = typs[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)][t].data.main.placement;
                    let images = tourney.images.filter(u => u.type == "profile");
                    let tempImga = ""
                    if (tourney.images.length === 0) {
                        tempImga = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Feather-core-calendar.svg/1024px-Feather-core-calendar.svg.png" style="filter: invert(1);" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
            <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadTourneyData(${i}, ${Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)}, ${t})">Load Set Data</a>`
                    } else {
                        tempImga = `
            <img src="${tourney.images.filter(u=>u.type === "profile")[0].url}" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
            <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadTourneyData(${i}, ${Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)}, ${t})">Load Set Data</a>`
                    }
                    tempData +=
                        `<div class="card border-secondary text-bg-dark text-end mb-3 ms-auto">
                        <div class="row g-0">
                            <div class="col-md-4">
                                ${tempImga}
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <span>
                                        <span class="mui-thceyd-header20">${ordinal(placement)}</span>
                                        <span class="tss-zapqqm-body16">  of ${tourney.entrants}</span>
                                    </span>
                                    <h5 class="card-title" style="font-size: 1.15rem;">${tourney.event.tournament.name}</h5>
                                    <p class="card-text"><small class="text-muted">${getCreation(tourney.time.start)} @ ${getAMPM(tourney.time.start)}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>`;
                };
                tempData += `<hr/>`;
                tourneyList.innerHTML += tempData
            } else {
                let temData = ""
                let noCount = 0;
                for (var s = 0; s < typs[i].length; s++) {
                    let tema = `${typ[s]}`
                    if (typs[i][s].length === 0) {
                        noCount++
                        tema += " - No Tournaments Found"
                    }
                    temData += `<h2>${tema}</h2>`;
                    //typs[i][s] = typs[i][s].sort((a, b) => a.tourney_id - b.tourney_id);
                    for (var t = 0; t < typs[i][s].length; t++) {
                        let tourneyId = typs[i][s][t].tourney_id;

                        let tourney = bigTourney[tourneyId];
                        let placement = typs[i][s][t].data.main.placement;
                        let images = tourney.images.filter(u => u.type == "profile");
                        if (images.length === 0) {
                            images = `
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Feather-core-calendar.svg/1024px-Feather-core-calendar.svg.png" style="filter: invert(1);" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
                            <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadTourneyData(${i}, ${s}, ${t})">Load Data</a>`
                        } else {
                            images = `
                            <img src="${images[0].url}" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
                            <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadTourneyData(${i}, ${s}, ${t})">Load Data</a>`
                        }
                        temData +=
                            `<div class="card border-secondary text-bg-dark text-end mb-3 ms-auto">
                        <div class="row g-0">
                            <div class="col-md-4">
                                ${images}
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <span>
                                        <span class="mui-thceyd-header20">${ordinal(placement)}</span>
                                        <span class="tss-zapqqm-body16">  of ${tourney.entrants}</span>
                                    </span>
                                    <hr style="margin: 0.3rem 0;"/>
                                    <h5 class="card-title" style="font-size: 1.15rem;">${tourney.event.tournament.name}</h5>
                                    <p class="card-text"><small class="text-muted">${getCreation(tourney.time.start)} @ ${getAMPM(tourney.time.start)}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    }
                    temData += `${temas[s]}`;
                };
                if (noCount === 3) {
                    temData = "<h3>No Tournaments Found</h3>"
                };
                tempData += `${temData}<hr/>`;
                tourneyList.innerHTML += tempData
            }
        }
    } else {
        if (document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '') === "Allv") {
            for (var h = 0; h < typs[document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')].length; h++) {
                data = typs[document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')][h]
                let tema = `${typ[h]}`
                if (data.length === 0) {
                    tema += " - No Tournaments Found"
                }
                tourneyList.innerHTML += `<h2 style="text-align:center">${tema}</h2>`;
                //data = data.sort((a, b) => a.tourney_id - b.tourney_id);
                let prizing = 0;
                for (var i = 0; i < data.length; i++) {
                    let tourney = bigTourney[data[i].tourney_id];
                    let placement = data[i].data.main.placement;
                    if (data[i].data.main.prizing !== null) {
                        prizing += data[i].data.main.prizing
                    };
                    let images = tourney.images.filter(u => u.type == "profile");
                    let tempImga = ""
                    if (tourney.images.length === 0) {
                        tempImga = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Feather-core-calendar.svg/1024px-Feather-core-calendar.svg.png" style="filter: invert(1);" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
            <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadTourneyData(${document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')}, ${h}, ${i})">Load Data</a>`
                    } else {
                        tempImga = `
            <img src="${tourney.images.filter(u=>u.type === "profile")[0].url}" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
            <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadTourneyData(${document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')}, ${h}, ${i})">Load Data</a>`
                    };
                    tourneyList.innerHTML +=
                        `<div class="card border-secondary text-bg-dark text-end mb-3 ms-auto">
                        <div class="row g-0">
                            <div class="col-md-4">
                                ${tempImga}
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <span>
                                        <span class="mui-thceyd-header20">${ordinal(placement)}</span>
                                        <span class="tss-zapqqm-body16">  of ${tourney.entrants}</span>
                                    </span>
                                    <hr style="margin: 0.3rem 0;"/>
                                    <h5 class="card-title" style="font-size: 1.15rem;">${tourney.event.tournament.name}</h5>
                                    <p class="card-text"><small class="text-muted">${getCreation(tourney.time.start)} @ ${getAMPM(tourney.time.start)}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>`;
                };
                tourneyList.innerHTML += '<hr/>';
            }
        } else {
            data = typs[document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)]
            if (data.length === 0) {
                tourneyList.innerHTML = "<h3 style='text-align: center'>No Tournaments Found</h3>"
            };
            //data = data.sort((a, b) => a.tourney_id - b.tourney_id);
            for (var i = 0; i < data.length; i++) {
                let tourney = bigTourney[data[i].tourney_id];
                let placement = data[i].data.main.placement;
                let images = tourney.images.filter(u => u.type == "profile");
                let tempImga = ""
                if (tourney.images.length === 0) {
                    tempImga = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Feather-core-calendar.svg/1024px-Feather-core-calendar.svg.png" style="filter: invert(1);" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
            <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadTourneyData(${document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')}, ${Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)}, ${i})">Load Data</a>`
                } else {
                    tempImga = `
            <img src="${tourney.images.filter(u=>u.type === "profile")[0].url}" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
            <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadTourneyData(${document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')}, ${Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)}, ${i})">Load Data</a>`
                };
                tourneyList.innerHTML +=
                    `<div class="card border-secondary text-bg-dark text-end mb-3 ms-auto">
                    <div class="row g-0">
                        <div class="col-md-4">
                            ${tempImga}
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <span>
                                    <span class="mui-thceyd-header20">${ordinal(placement)}</span>
                                    <span class="tss-zapqqm-body16">  of ${tourney.entrants}</span>
                                </span>
                                <hr style="margin: 0.3rem 0;"/>
                                <h5 class="card-title" style="font-size: 1.15rem;">${tourney.event.tournament.name}</h5>
                                <p class="card-text"><small class="text-muted">${getCreation(tourney.time.start)} @ ${getAMPM(tourney.time.start)}</small></p>
                            </div>
                        </div>
                    </div>
                </div>`;
            };
        }
    }
};

function getAllCharStages(id) {
    let chars = {};
    let stages = [{}, {}, {}];
    let playe = players[id];
    let tempsss = [];
    let tyNum = [5, [5, 5, 5]];
    for (var i in userTourneyData) {
        for (var s = 0; s < userTourneyData[i].length; s++) {
            for (var g = 0; g < userTourneyData[i][s].length; g++) {
                for (var v = 0; v < userTourneyData[i][s][g].data.sets.nodes.length; v++) {
                    let tem = userTourneyData[i][s][g].data.sets.nodes[v];
                    if (tem.games !== null) {
                        for (var f = 0; f < tem.games.length; f++) {
                            if (tem.games[f].stage !== null) {
                                let wins = 0;
                                let loss = 0;
                                let ent = userTourneyData[i][s][g].data.main.entity;
                                if (tem.games[f].winnerId === ent) {
                                    wins++;
                                } else {
                                    loss++;
                                };
                                if (userTourneyData[i][s][g].type === 0) {
                                    if (stages[s][tem.games[f].stage.name]) {
                                        stages[s][tem.games[f].stage.name].officials.games++;
                                        if (tem.games[f].winnerId === ent) {
                                            stages[s][tem.games[f].stage.name].officials.wins++;
                                        } else {
                                            stages[s][tem.games[f].stage.name].officials.loss++;
                                        }
                                    } else {
                                        stages[s][tem.games[f].stage.name] = {
                                            officials: {
                                                games: 1,
                                                loss: loss,
                                                wins: wins
                                            },
                                            community: {
                                                games: 0,
                                                loss: 0,
                                                wins: 0
                                            }
                                        }
                                    }
                                } else {
                                    if (stages[s][tem.games[f].stage.name]) {
                                        stages[s][tem.games[f].stage.name].community.games++;
                                        if (tem.games[f].winnerId === ent) {
                                            stages[s][tem.games[f].stage.name].community.wins++;
                                        } else {
                                            stages[s][tem.games[f].stage.name].community.loss++;
                                        }
                                    } else {
                                        stages[s][tem.games[f].stage.name] = {
                                            officials: {
                                                games: 0,
                                                loss: 0,
                                                wins: 0
                                            },
                                            community: {
                                                games: 1,
                                                loss: loss,
                                                wins: wins
                                            }
                                        }
                                    }
                                }

                            };
                            if (tem.games[f].selections !== null) {
                                let te = tem.games[f].selections.filter(u => {
                                    let ret = ""
                                    for (var g = 0; g < playe.alias.length; g++) {
                                        if (u.entrant.name.includes(playe.alias[g])) {
                                            ret = u.entrant.name
                                        }
                                    };
                                    if (ret === "") {
                                        return u.entrant.name.includes(playe.name);
                                    } else {
                                        return ret;
                                    }
                                });
                                if (te.length !== 0) {
                                    let charNum = te[0].selectionValue;
                                    if (charNum === 1496) {
                                        charNum = 169
                                    };
                                    if (charNum === 1495) {
                                        charNum = 179
                                    };
                                    if (charNum === 1494) {
                                        charNum = 167
                                    };
                                    if (chars[charNum]) {
                                        chars[charNum].games++;
                                    } else {
                                        chars[charNum] = {
                                            games: 1,
                                            wins: 0,
                                            loss: 0,
                                            stages: {},
                                            opponent: {}
                                        };
                                    };
                                    if (userTourneyData[i][s][g].data.main.entity === tem.winnerId) {
                                        chars[charNum].wins++;
                                    } else {
                                        chars[charNum].loss++;
                                    };

                                    if (tem.games[f].stage !== null) {
                                        let ent = userTourneyData[i][s][g].data.main.entity;
                                        if (!chars[charNum].stages[tem.games[f].stage.name]) {
                                            chars[charNum].stages[tem.games[f].stage.name] = {
                                                wins: 0,
                                                loss: 0,
                                                games: 1,
                                            }
                                        } else {
                                            chars[charNum].stages[tem.games[f].stage.name].games++;
                                        }
                                        if (tem.games[f].winnerId === ent) {
                                            chars[charNum].stages[tem.games[f].stage.name].wins++;
                                        } else {
                                            chars[charNum].stages[tem.games[f].stage.name].loss++;
                                        }
                                    };
                                    let op = tem.games[f].selections.filter(u => u.entrant.name !== te[0].entrant.name);
                                    if (op.length !== 0) {
                                        let charNumOp = op[0].selectionValue;
                                        if (charNumOp === 1496) {
                                            charNumOp = 169
                                        };
                                        if (charNumOp === 1495) {
                                            charNumOp = 179
                                        };
                                        if (charNumOp === 1494) {
                                            charNumOp = 167
                                        };
                                        if (!chars[charNum].opponent[charNumOp]) {
                                            let img = char[charNumOp].images.filter(u => u.type === "myIcon2")[0].url;
                                            chars[charNum].opponent[charNumOp] = {
                                                gamesAgainst: 0,
                                                winsAgainst: 0,
                                                lossAgainst: 0,
                                                name: char[charNumOp].name,
                                                img: img
                                            }
                                        };
                                        chars[charNum].opponent[charNumOp].gamesAgainst++;
                                        if (userTourneyData[i][s][g].data.main.entity === tem.winnerId) {
                                            chars[charNum].opponent[charNumOp].winsAgainst++;
                                        } else {
                                            chars[charNum].opponent[charNumOp].lossAgainst++;
                                        }
                                    }
                                }
                            }
                        }
                    };
                }
            }
        }
    };
    for (var i in chars) {
        let img = char[i].images.filter(u => u.type === "myIcon2");
        let tempOpp = [];
        for (var f in chars[i].opponent) {
            tempOpp.push({
                gamesAgainst: chars[i].opponent[f].gamesAgainst,
                winsAgainst: chars[i].opponent[f].winsAgainst,
                lossAgainst: chars[i].opponent[f].lossAgainst,
                name: chars[i].opponent[f].name,
                img: chars[i].opponent[f].img
            })
        };
        let tempStage = [];
        for (var f in chars[i].stages) {
            tempStage.push({
                wins: chars[i].stages[f].wins,
                loss: chars[i].stages[f].loss,
                games: chars[i].stages[f].games,
                name: f
            })
        };
        tempsss.push({
            name: char[i].name,
            url: img[0].url,
            id: i,
            stages: tempStage.sort((a, b) => b.games - a.games),
            opponents: tempOpp.sort((a, b) => b.gamesAgainst - a.gamesAgainst),
            games: chars[i].games,
            wins: chars[i].wins,
            loss: chars[i].loss,
        })
    };
    tempsss = tempsss.sort((a, b) => b.games - a.games);
    if (tempsss.length < 3) {
        tyNum[0] = tempsss.length
    };
    chars = tempsss;
    tempsss = [];
    for (var f = 0; f < stages.length; f++) {
        let teya = [];
        for (var i in stages[f]) {
            teya.push({
                name: i,
                totalGames: stages[f][i].officials.games + stages[f][i].community.games,
                url: `https://saorax.github.io/images/brawlhalla/mapBg/${i.replace(/ /g, "-").toLowerCase()}.jpg`,
                officials: stages[f][i].officials,
                community: stages[f][i].community
            })
        };
        teya = teya.sort((a, b) => b.totalGames - a.totalGames);
        if (teya.length < 3) {
            tyNum[1][f] = teya.length
        };
        tempsss.push(teya);
    }
    stages = tempsss;
    return {
        stages: stages,
        legends: chars,
        spacing: tyNum
    }
};

async function loadCurrentSet(bracket, set) {
    var tourney = document.getElementById('tourneySetContent');
    tourney.innerHTML = "";
    let phaseSet = phaseData[bracket].sets[set];
    let ss;
    // https://www.twitch.tv/videos/1458853635?t=07h01m29s
    let stream = ''
    if (phaseSet.stream !== null) {
        ss = phaseSet.stream;

    };
    if (phaseData[bracket].name === "Bracket" || phaseData[bracket].name === "Pools") {
        tourney.innerHTML += `
        <div style="text-align: center">
            <h3>${phaseData[bracket].name} ${phaseData[bracket].display}</h3>
            <h4>${phaseSet.roundText}</h4>
            <h6>${getMatchLength(phaseSet.setLength)}</h6>
        </div>
        <br/>`
    } else {
        tourney.innerHTML += `
        <div style="text-align: center">
            <h3>${phaseData[bracket].name}</h3>
            <h4>${phaseSet.roundText}</h4>
            <h6>${getMatchLength(phaseSet.setLength)}</h6>
        </div>
        <br/>`
    }
    let tempRo = ''
    tempRo += `<div class="container" style="text-align: center"><div class="row row-cols-3" style="--bs-gutter-x: 0rem;">`
    if (phaseSet.games !== null) {
        let setTitle = [{
            name: phaseSet.self.slots.standing.entrant.name,
            score: phaseSet.self.slots.standing.stats.score.value
        }, {
            name: phaseSet.opponent.slots.standing.entrant.name,
            score: phaseSet.opponent.slots.standing.stats.score.value
        }];
        if (phaseSet.self.seed === 1) {
            setTitle[1] = {
                name: phaseSet.self.slots.standing.entrant.name,
                score: phaseSet.self.slots.standing.stats.score.value
            }
        }
        if (phaseSet.opponent.seed === 0) {
            setTitle[0] = {
                name: phaseSet.opponent.slots.standing.entrant.name,
                score: phaseSet.opponent.slots.standing.stats.score.value
            }
        };
        tempRo += `
                <h3 class="col pb-3">${setTitle[0].name.replace(" / ", " /<br>")}</h3>
                <h3 class="col pb-3">${setTitle[0].score}<text style="opacity: 0"> • </text>${setTitle[1].score}</h3>
                <h3 class="col pb-3">${setTitle[1].name.replace(" / ", " /<br>")}</h3>
                `
        for (var i = 0; i < phaseSet.games.length; i++) {
            let selfSet = '';
            let oppSet = '';
            let selfChar = '';
            let oppChar = '';
            let stage = '';
            if (phaseSet.games[i].stage !== null) {
                stage = `<div class="col mb-2"><h4>Game ${i+1}</h4>${phaseSet.games[i].stage.name}</div>`
            } else {
                stage = `<div class="col mb-2"><h4>Game ${i+1}</h4>No Stage</div>`
            }
            if (phaseSet.games[i].selections !== null) {
                for (var s = 0; s < phaseSet.games[i].selections.length; s++) {
                    let image = char[phaseSet.games[i].selections[s].selectionValue].images.filter(u => u.type == "icon");
                    if (phaseSet.games[i].selections[s].entrant.name === phaseSet.self.slots.standing.entrant.name && phaseSet.self.seed === 0) {
                        selfChar = `<img src=${image[0].url} width="40" height="40"></img>`;
                    } else if (phaseSet.games[i].selections[s].entrant.name === phaseSet.self.slots.standing.entrant.name && phaseSet.self.seed === 1) {
                        oppChar = `<img src=${image[0].url} width="40" height="40"></img>`;
                    } else if (phaseSet.games[i].selections[s].entrant.name !== phaseSet.self.slots.standing.entrant.name && phaseSet.self.seed === 1) {
                        selfChar = `<img src=${image[0].url} width="40" height="40"></img>`;
                    } else if (phaseSet.games[i].selections[s].entrant.name !== phaseSet.self.slots.standing.entrant.name && phaseSet.self.seed === 0) {
                        oppChar = `<img src=${image[0].url} width="40" height="40"></img>`;
                    }
                }
                if (phaseSet.self.seed === 0) {
                    if (phaseSet.games[i].winnerId === phaseSet.winner && phaseSet.winner === phaseSet.self.slots.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">${selfChar}<text style="opacity: 0">•</text>W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                    } else if (phaseSet.games[i].winnerId === phaseSet.winner && phaseSet.winner !== phaseSet.self.slots.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">${selfChar}<text style="opacity: 0">•</text>L</h4></div>`;
                    } else if (phaseSet.games[i].winnerId !== phaseSet.winner && phaseSet.winner === phaseSet.self.slots.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">${selfChar}<text style="opacity: 0">•</text>L</h4></div>`;
                    } else if (phaseSet.games[i].winnerId !== phaseSet.winner && phaseSet.winner !== phaseSet.self.slots.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">${selfChar}<text style="opacity: 0">•</text>W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                    }
                } else if (phaseSet.self.seed === 1) {
                    if (phaseSet.games[i].winnerId === phaseSet.winner && phaseSet.winner === phaseSet.self.slots.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">${selfChar}<text style="opacity: 0">•</text>L</h4></div>`;
                    } else if (phaseSet.games[i].winnerId === phaseSet.winner && phaseSet.winner !== phaseSet.self.slots.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">${selfChar}<text style="opacity: 0">•</text>W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                    } else if (phaseSet.games[i].winnerId !== phaseSet.winner && phaseSet.winner === phaseSet.self.slots.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">${selfChar}<text style="opacity: 0">•</text>W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                    } else if (phaseSet.games[i].winnerId !== phaseSet.winner && phaseSet.winner !== phaseSet.self.slots.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">${selfChar}<text style="opacity: 0">•</text>L</h4></div>`;
                    }
                }
                tempRo += `${selfSet}${stage}${oppSet}`
            } else {
                if (phaseSet.self.seed === 0) {
                    if (phaseSet.games[i].winnerId === phaseSet.winner && phaseSet.winner === phaseSet.self.slots.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L</h4></div>`;
                    } else if (phaseSet.games[i].winnerId === phaseSet.winner && phaseSet.winner !== phaseSet.self.slots.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">L</h4></div>`;
                    } else if (phaseSet.games[i].winnerId !== phaseSet.winner && phaseSet.winner === phaseSet.self.slots.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">L</h4></div>`;
                    } else if (phaseSet.games[i].winnerId !== phaseSet.winner && phaseSet.winner !== phaseSet.self.slots.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L</h4></div>`;
                    }
                } else if (phaseSet.self.seed === 1) {
                    if (phaseSet.games[i].winnerId === phaseSet.winner && phaseSet.winner === phaseSet.self.slots.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">L</h4></div>`;
                    } else if (phaseSet.games[i].winnerId === phaseSet.winner && phaseSet.winner !== phaseSet.self.slots.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L</h4></div>`;
                    } else if (phaseSet.games[i].winnerId !== phaseSet.winner && phaseSet.winner === phaseSet.self.slots.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L</h4></div>`;
                    } else if (phaseSet.games[i].winnerId !== phaseSet.winner && phaseSet.winner !== phaseSet.self.slots.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">L</h4></div>`;
                    }
                }
                tempRo += `${selfSet}${stage}${oppSet}`
            }
        }
        tempRo += `</div></div>`
        tourney.innerHTML += tempRo
    } else {
        if (phaseSet.games === null && phaseSet.displayScore === "DQ") {
            if (phaseSet.opponent.slots.standing.stats.score.value === -1) {
                tourney.innerHTML += "<h5>Opponent DQ'd, so there is no game data available</h5>"
            } else if (phaseSet.self.slots.standing.stats.score.value === -1) {
                tourney.innerHTML += "<h5>User DQ'd, so there is no game data available</h5>"
            }
        } else if (phaseSet.games === null && phaseSet.displayScore !== "DQ") {
            tourney.innerHTML += "<h5>No game data was reported for this set</h5>"
        }
    }
};

async function loadTourneyData(year, one, two) {
    var tourney = document.getElementById('tourneyContent');
    tourney.innerHTML = "";
    let typs = {};
    if (document.querySelector('input[name="btnradio3"]:checked').id.replace('btnradio', '') === "Offi") {
        for (var i in userTourneyData) {
            typs[i] = [
                [],
                [],
                []
            ];
            for (var s = 0; s < userTourneyData[i].length; s++) {
                typs[i][s] = userTourneyData[i][s].filter(u => u.type === 0);
            }
        }
    } else if (document.querySelector('input[name="btnradio3"]:checked').id.replace('btnradio', '') === "Comm") {
        for (var i in userTourneyData) {
            typs[i] = [
                [],
                [],
                []
            ];
            for (var s = 0; s < userTourneyData[i].length; s++) {
                typs[i][s] = userTourneyData[i][s].filter(u => u.type === 1)
            }
        }
    } else {
        for (var i in userTourneyData) {
            typs[i] = userTourneyData[i]
        }
    };
    curTourn = [year, one, two]
    let userData = typs[year][one][two].data;
    let teammate = '';
    let tourneyData = bigTourney[typs[year][one][two].tourney_id];
    let images = tourneyData.images.filter(u => u.type == "profile");
    let placementObj = {};
    let payout = 0;
    let twosPayoutText = "";
    for (var i = 0; i < tourneyData.prizing.prizing.length; i++) {
        placementObj[tourneyData.prizing.prizing[i].placement] = tourneyData.prizing.prizing[i]
    };
    if (one === 1) {
        teammate = `<h4 style="opacity: .70">Team: ${typs[year][one][two].team.teamname}</h4>`
    }
    if (placementObj[userData.main.placement]) {
        payout = userData.main.prizing / (one + 1)
        if (one === 1) {
            twosPayoutText = `<text style="opacity: .30"> •  </text>$ ${userData.main.prizing} pre-split`
        }
    }
    let setData = '';
    phaseData = {};
    let totalData = '';
    let stages = {};
    let chars = {};
    let totalGames = [
        [0, 0],
        [0, 0]
    ];
    let setNodes = userData.sets.nodes.sort((a, b) => b.completedAt - a.completedAt);
    if (one !== 0) {
        let wins = 0;
        let loss = 0;
        for (var i = setNodes.length - 1; i >= 0; i--) {
            let set = setNodes[i]
            let opponent = [];
            let oppSet = 0;
            let selfSet = 0;
            let selfImgs = []
            for (var s = 0; s < set.slots.length; s++) {
                if (set.slots[s].standing.entrant.id !== userData.main.entity) {
                    for (var d = 0; d < set.slots[s].standing.entrant.participants.length; d++) {
                        if (set.slots[s].standing.entrant.participants[d].user === null || !players[set.slots[s].standing.entrant.participants[d].user.id]) {
                            opponent.push({
                                "name": set.slots[s].standing.entrant.participants[d].player.gamerTag,
                                "images": []
                            });
                            selfImgs.push([]);
                            oppSet = s;
                        } else {
                            opponent.push(players[set.slots[s].standing.entrant.participants[d].user.id]);
                            selfImgs.push(players[set.slots[selfSet].standing.entrant.participants[0].user.id].images);
                            oppSet = s;
                        };
                    }
                } else {
                    selfSet = s
                };
            };
            if (!phaseData[`${set.phaseGroup.phase.name} ${set.phaseGroup.displayIdentifier}`]) {
                phaseData[`${set.phaseGroup.phase.name} ${set.phaseGroup.displayIdentifier}`] = {
                    name: set.phaseGroup.phase.name,
                    display: set.phaseGroup.displayIdentifier,
                    sets: []
                }
                phaseData[`${set.phaseGroup.phase.name} ${set.phaseGroup.displayIdentifier}`].sets.push({
                    winner: set.winnerId,
                    totalGames: set.totalGames,
                    games: set.games,
                    displayScore: set.displayScore,
                    roundText: set.fullRoundText,
                    startedAt: set.startedAt,
                    completedAt: set.completedAt,
                    setLength: set.completedAt - set.startedAt,
                    opponent: {
                        slots: set.slots[oppSet],
                        seed: oppSet,
                        data: opponent,
                        name: set.slots[oppSet].standing.entrant.name
                    },
                    self: {
                        slots: set.slots[selfSet],
                        image: selfImgs,
                        seed: selfSet,
                        name: set.slots[selfSet].standing.entrant.name
                    }
                });
            } else {
                phaseData[`${set.phaseGroup.phase.name} ${set.phaseGroup.displayIdentifier}`].sets.push({
                    winner: set.winnerId,
                    totalGames: set.totalGames,
                    games: set.games,
                    displayScore: set.displayScore,
                    roundText: set.fullRoundText,
                    startedAt: set.startedAt,
                    completedAt: set.completedAt,
                    setLength: set.completedAt - set.startedAt,
                    opponent: {
                        slots: set.slots[oppSet],
                        data: opponent,
                        seed: oppSet,
                        name: set.slots[oppSet].standing.entrant.name
                    },
                    self: {
                        slots: set.slots[selfSet],
                        image: selfImgs,
                        seed: selfSet,
                        name: set.slots[selfSet].standing.entrant.name
                    }
                })
            }
        };
        totalGames[0] = [setNodes.filter(u => u.winnerId === userData.main.entity).length, setNodes.filter(u => u.winnerId !== userData.main.entity).length];

        for (var i in phaseData) {
            var setData2 = '';
            if (phaseData[i].name === "Bracket" || phaseData[i].name === "Pools") {
                setData2 += `<h3 style="text-align: center">${phaseData[i].name} ${phaseData[i].display}</h3>`
            } else {
                setData2 += `<h3 style="text-align: center">${phaseData[i].name}</h3>`
            }
            for (var s = 0; s < phaseData[i].sets.length; s++) {
                let oppImg = '';
                let resuColor;
                let tempImg = []
                for (var g = 0; g < phaseData[i].sets[s].opponent.data.length; g++) {
                    if (phaseData[i].sets[s].opponent.data[g].images.length !== 0 && phaseData[i].sets[s].opponent.data[g].images.some(x => x.type.toLowerCase() == "profile")) {
                        for (var t = 0; t < phaseData[i].sets[s].opponent.data[g].images.length; t++) {
                            if (phaseData[i].sets[s].opponent.data[g].images[t].type === "profile") {
                                tempImg[g] = {
                                    name: phaseData[i].sets[s].opponent.data[g].name,
                                    url: phaseData[i].sets[s].opponent.data[g].images[t].url,
                                    letter: false
                                }
                            }
                        }
                    } else {
                        tempImg[g] = {
                            name: phaseData[i].sets[s].opponent.data[g].name,
                            letter: true
                        }
                    };
                };
                oppImg += `<div class="EntrantScore__icon"><div class="Player__avatar-container">`
                for (var g = 0; g < tempImg.length; g++) {
                    if (tempImg[g].letter !== true) {
                        oppImg += `
                        <div class="Player__avatar profile-thumb" aria-label="${tempImg[g].name}">
                            <img alt="${tempImg[g].name}" src="${tempImg[g].url}" class="playerImg2">
                        </div>`
                    } else {
                        oppImg += `
                        <div class="Player__avatar profile-thumb" aria-label="${tempImg[g].name}">
                            <div class="playerLetter">${tempImg[g].name.charAt(0)}</div>
                        </div>`
                    }
                }
                oppImg += `</div></div>`
                if (phaseData[i].sets[s].winner !== userData.main.entity) {
                    resuColor = "#d62c43";
                } else {
                    resuColor = "#7ab15b";
                }
                let scoreo;
                if (phaseData[i].sets[s].games === null && phaseData[i].sets[s].self.slots.standing.stats.score.value === -1 || phaseData[i].sets[s].opponent.slots.standing.stats.score.value === -1) {
                    scoreo = "DQ -";
                } else {
                    let tempWin = phaseData[i].sets[s].self.slots.standing.stats.score.value;
                    let tempLose = phaseData[i].sets[s].opponent.slots.standing.stats.score.value;
                    if (tempWin === null) {
                        if (phaseData[i].sets[s].winner !== userData.main.entity) {
                            tempWin = "L"
                        } else if (phaseData[i].sets[s].winner === userData.main.entity) {
                            tempWin = "W"
                        }
                    };
                    if (tempLose === null) {
                        if (phaseData[i].sets[s].winner === userData.main.entity) {
                            tempLose = "W"
                        } else if (phaseData[i].sets[s].winner !== userData.main.entity) {
                            tempLose = "L"
                        }
                    }
                    scoreo = `${tempWin} - ${tempLose}`;

                    if (phaseData[i].sets[s].opponent.slots.standing.stats.score.value !== -1) {
                        loss += phaseData[i].sets[s].opponent.slots.standing.stats.score.value;
                    };
                    if (phaseData[i].sets[s].self.slots.standing.stats.score.value !== -1) {
                        wins += phaseData[i].sets[s].self.slots.standing.stats.score.value;
                    }
                }
                let playerL = await fetch(`https://saorax-pl.github.io/players/pl/${phaseData[i].sets[s].opponent.data[0].id}.json`, {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "en-US,en;q=0.9",
                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Opera GX\";v=\"84\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "none"
                    },
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "omit"
                }).then(res => res.json()).catch(err => {
                    console.log(err);
                });
                let oppSeed;
                let oppPlacement;
                if (isOffline === true) {
                    playerL = await fetch(`http://localhost:3000/main.php?type=user&user=${phaseData[i].sets[s].opponent.data[0].id}`, {
                        "method": "GET",
                    }).then(res => res.json()).catch(err => {
                        console.log(err);
                    });
                };
                for (var v in playerL.tourneys) {
                    for (var b = 0; b < playerL.tourneys[v].length; b++) {
                        let gba = playerL.tourneys[v][b].filter(u => u.tourney_id === typs[year][one][two].tourney_id);
                        if (gba.length !== 0) {
                            oppSeed = gba[0].data.main.seed;
                            oppPlacement = gba[0].data.main.placement
                        };
                    }
                };
                if (oppPlacement === undefined) {

                };
                setData2 += `
            <div class="d-flex py-3">
                <div class="whoIs player align-items-center">
                    <div class="playerData me-2" style="text-align: center; width: 125px">
                        <text style="font-size: calc(1rem + .6vw); color: ${resuColor}">vs</text>
                        <text style="font-size: calc(0.7rem + .6vw);">${scoreo}</text>
                        <div style="opacity: 0.3" style="font-size: calc(0.5rem + .6vw);"><span class="mui-thceyd-header20" style="font-size: calc(0.3rem + .6vw);">Seed: ${oppSeed}</span></div>
                        <div style="opacity: 0.3" style="font-size: calc(0.5rem + .6vw);"><span class="mui-thceyd-header20" style="font-size: calc(0.3rem + .6vw);">Placed: ${ordinal(oppPlacement)}</span></div>
                    </div>${oppImg}
                    <div class="playerData">
                        <a href="javascript:void(0)" onclick="loadCurrentSet('${i}', ${s})" class="text-light" style="font-size: calc(0.6rem + .6vw); text-decoration: none; color: currentColor!important">${phaseData[i].sets[s].opponent.name}</a>
                        <div style="opacity: 0.3" style="font-size: calc(0.5rem + .6vw);"><span class="mui-thceyd-header20" style="font-size: calc(0.5rem + .6vw);">${phaseData[i].sets[s].roundText}</span></div>
                    </div>
                </div>
            </div>
            `
            }
            setData2 += `<hr/>`
            setData += setData2
            for (var d = 0; d < phaseData[i].sets.length; d++) {
                if (phaseData[i].sets[d].games !== null) {
                    for (var g = 0; g < phaseData[i].sets[d].games.length; g++) {
                        if (phaseData[i].sets[d].games[g].stage !== null) {
                            if (stages[phaseData[i].sets[d].games[g].stage.name]) {
                                stages[phaseData[i].sets[d].games[g].stage.name].games++
                            } else {
                                stages[phaseData[i].sets[d].games[g].stage.name] = {
                                    games: 1
                                }
                            }
                        };
                        if (phaseData[i].sets[d].games[g].selections !== null) {
                            let te = phaseData[i].sets[d].games[g].selections.filter(u => u.entrant.name === phaseData[i].sets[d].self.name);
                            if (te.length !== 0) {
                                if (chars[te[0].selectionValue]) {
                                    chars[te[0].selectionValue].games++
                                } else {
                                    chars[te[0].selectionValue] = {
                                        games: 1
                                    }
                                }
                            }
                        }
                    }
                }
            };
        };
        totalGames[1] = [wins, loss]
        let stagesPlayed = '';
        let teNum = 3;
        let tempsss = []

        for (var i in stages) {
            tempsss.push({
                name: i,
                url: `https://saorax.github.io/images/brawlhalla/mapBg/${i.replace(/ /g, "-").toLowerCase()}.jpg`,
                games: stages[i].games
            })
        };
        tempsss = tempsss.sort((a, b) => b.games - a.games);
        if (tempsss.length < 3) {
            teNum = tempsss.length
        }
        for (var i = 0; i < tempsss.length; i++) {
            stagesPlayed += `
            <div class="col" style="padding: unset">
                <div class="card text-white" style="border: none;">
                    <img src="${tempsss[i].url}" class="card-img" alt="${tempsss[i].name}" width="128" height="128" style="filter: brightness(30%)">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${tempsss[i].name}</h5>
                        <p class="card-text"></p>
                        <p class="card-text">Games: ${tempsss[i].games}</p>
                    </div>
                </div>
             </div>`
        }
        totalData += `
            <div class="d-flex">
                <div>
                    <h4>Stages Played</h4>
                    <br>
                    <div class="row row-cols-1 row-cols-md-${teNum}" style="overflow: auto; max-height:440px">
                        ${stagesPlayed}
                    </div>
                </div>
            </div>`
    } else {
        let wins = 0;
        let loss = 0;
        for (var i = setNodes.length - 1; i >= 0; i--) {
            let set = setNodes[i]
            let opponent;
            let oppSet = 0;
            let selfSet = 0;
            for (var s = 0; s < set.slots.length; s++) {
                if (set.slots[s].standing.entrant.id !== userData.main.entity) {
                    if (set.slots[s].standing.entrant.participants[0].user === null) {
                        opponent = {
                            "name": set.slots[s].standing.entrant.name,
                            "images": []
                        }
                        oppSet = s;
                    } else {
                        opponent = players[set.slots[s].standing.entrant.participants[0].user.id];
                        oppSet = s;
                    }
                } else {
                    selfSet = s
                };
            };
            if (!phaseData[`${set.phaseGroup.phase.name} ${set.phaseGroup.displayIdentifier}`]) {
                phaseData[`${set.phaseGroup.phase.name} ${set.phaseGroup.displayIdentifier}`] = {
                    name: set.phaseGroup.phase.name,
                    display: set.phaseGroup.displayIdentifier,
                    sets: []
                }
                phaseData[`${set.phaseGroup.phase.name} ${set.phaseGroup.displayIdentifier}`].sets.push({
                    winner: set.winnerId,
                    totalGames: set.totalGames,
                    games: set.games,
                    roundText: set.fullRoundText,
                    startedAt: set.startedAt,
                    completedAt: set.completedAt,
                    setLength: set.completedAt - set.startedAt,
                    opponent: {
                        slots: set.slots[oppSet],
                        seed: oppSet,
                        data: opponent,
                        name: set.slots[oppSet].standing.entrant.name
                    },
                    self: {
                        slots: set.slots[selfSet],
                        image: players[set.slots[selfSet].standing.entrant.participants[0].user.id].images,
                        seed: selfSet,
                        name: set.slots[selfSet].standing.entrant.name
                    }
                })
            } else {
                phaseData[`${set.phaseGroup.phase.name} ${set.phaseGroup.displayIdentifier}`].sets.push({
                    winner: set.winnerId,
                    totalGames: set.totalGames,
                    games: set.games,
                    roundText: set.fullRoundText,
                    startedAt: set.startedAt,
                    completedAt: set.completedAt,
                    setLength: set.completedAt - set.startedAt,
                    opponent: {
                        slots: set.slots[oppSet],
                        data: opponent,
                        seed: oppSet,
                        name: set.slots[oppSet].standing.entrant.name
                    },
                    self: {
                        slots: set.slots[selfSet],
                        image: players[set.slots[selfSet].standing.entrant.participants[0].user.id].images,
                        seed: selfSet,
                        name: set.slots[selfSet].standing.entrant.name
                    }
                })
            }
        };
        totalGames[0] = [
            setNodes.filter(u => u.winnerId === userData.main.entity).length,
            setNodes.filter(u => u.winnerId !== userData.main.entity).length
        ];

        for (var i in phaseData) {
            var setData2 = '';
            if (phaseData[i].name === "Bracket" || phaseData[i].name === "Pools") {
                setData2 += `<h3 style="text-align: center">${phaseData[i].name} ${phaseData[i].display}</h3>`
            } else {
                setData2 += `<h3 style="text-align: center">${phaseData[i].name}</h3>`
            }
            for (var s = 0; s < phaseData[i].sets.length; s++) {
                let oppImg;
                let resuColor;
                if (phaseData[i].sets[s].opponent.data.images.length !== 0 && phaseData[i].sets[s].opponent.data.images.some(x => x.type.toLowerCase() == "profile")) {
                    for (var t = 0; t < phaseData[i].sets[s].opponent.data.images.length; t++) {
                        if (phaseData[i].sets[s].opponent.data.images[t].type === "profile") {
                            oppImg = `
                            <a class="playerImg1">
                                <img alt="${phaseData[i].sets[s].opponent.name}" src="${phaseData[i].sets[s].opponent.data.images[t].url}" class="playerImg2">
                            </a>`
                        }
                    }
                } else {
                    oppImg =
                        `<div class="playerImg1"><div class="playerLetter">${phaseData[i].sets[s].opponent.name.charAt(0)}</div></div>`
                };
                if (phaseData[i].sets[s].winner !== userData.main.entity) {
                    resuColor = "#d62c43";
                } else {
                    resuColor = "#7ab15b";
                }
                let scoreo;
                if (phaseData[i].sets[s].games === null && phaseData[i].sets[s].self.slots.standing.stats.score.value === -1 || phaseData[i].sets[s].opponent.slots.standing.stats.score.value === -1) {
                    scoreo = "DQ -";
                } else {
                    let tempWin = phaseData[i].sets[s].self.slots.standing.stats.score.value;
                    let tempLose = phaseData[i].sets[s].opponent.slots.standing.stats.score.value;
                    if (tempWin === null) {
                        if (phaseData[i].sets[s].winner !== userData.main.entity) {
                            tempWin = "L"
                        } else if (phaseData[i].sets[s].winner === userData.main.entity) {
                            tempWin = "W"
                        }
                    };
                    if (tempLose === null) {
                        if (phaseData[i].sets[s].winner !== userData.main.entity) {
                            tempLose = "W"
                        } else if (phaseData[i].sets[s].winner === userData.main.entity) {
                            tempLose = "L"
                        }
                    }
                    scoreo = `${tempWin} - ${tempLose}`;
                    if (phaseData[i].sets[s].opponent.slots.standing.stats.score.value !== -1) {
                        loss += phaseData[i].sets[s].opponent.slots.standing.stats.score.value;
                    };
                    if (phaseData[i].sets[s].self.slots.standing.stats.score.value !== -1) {
                        wins += phaseData[i].sets[s].self.slots.standing.stats.score.value;
                    }
                };
                if (phaseData[i].sets[s].opponent.data.id) {
                    let playerL = await fetch(`https://saorax-pl.github.io/players/pl/${phaseData[i].sets[s].opponent.data.id}.json`, {
                        "headers": {
                            "accept": "*/*",
                            "accept-language": "en-US,en;q=0.9",
                            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Opera GX\";v=\"84\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "none"
                        },
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": null,
                        "method": "GET",
                        "mode": "cors",
                        "credentials": "omit"
                    }).then(res => res.json()).catch(err => {
                        console.log(err);
                    });
                    let oppSeed = 0;
                    let oppPlacement;
                    if (isOffline === true) {
                        playerL = await fetch(`http://localhost:3000/main.php?type=user&user=${phaseData[i].sets[s].opponent.data.id}`, {
                            "method": "GET",
                        }).then(res => res.json()).catch(err => {
                            console.log(err);
                        });
                    };
                    for (var v in playerL.tourneys) {
                        for (var b = 0; b < playerL.tourneys[v].length; b++) {
                            let gba = playerL.tourneys[v][b].filter(u => u.tourney_id === typs[year][one][two].tourney_id)
                            if (gba.length !== 0) {
                                oppSeed = gba[0].data.main.seed;
                                oppPlacement = gba[0].data.main.placement;
                            }
                        }
                    }
                    setData2 += `
                <div class="d-flex py-3">
                    <div class="whoIs player align-items-center">
                        <div class="playerData me-2" style="text-align: center; width: 125px">
                            <text style="font-size: calc(1rem + .6vw); color: ${resuColor}">vs</text>
                            <text style="font-size: calc(0.7rem + .6vw);">${scoreo}</text>
                            <div style="opacity: 0.3" style="font-size: calc(0.5rem + .6vw);"><span class="mui-thceyd-header20" style="font-size: calc(0.3rem + .6vw);">Seed: ${oppSeed}</span></div>
                            <div style="opacity: 0.3" style="font-size: calc(0.5rem + .6vw);"><span class="mui-thceyd-header20" style="font-size: calc(0.3rem + .6vw);">Placed: ${ordinal(oppPlacement)}</span></div>
                        </div>${oppImg}
                        <div class="playerData">
                            <a href="javascript:void(0)" onclick="loadCurrentSet('${i}', ${s})" class="text-light" style="font-size: calc(0.6rem + .6vw); text-decoration: none; color: currentColor!important">${phaseData[i].sets[s].opponent.name}</a>
                            <div style="opacity: 0.3" style="font-size: calc(0.5rem + .6vw);"><span class="mui-thceyd-header20" style="font-size: calc(0.5rem + .6vw);">${phaseData[i].sets[s].roundText}</span></div>
                        </div>
                    </div>
                </div>
                `
                }
            }
            oppSeed = 0;
            setData2 += `<hr/>`
            setData += setData2
            for (var d = 0; d < phaseData[i].sets.length; d++) {
                if (phaseData[i].sets[d].games !== null) {
                    for (var g = 0; g < phaseData[i].sets[d].games.length; g++) {
                        if (phaseData[i].sets[d].games[g].stage !== null) {
                            if (stages[phaseData[i].sets[d].games[g].stage.name]) {
                                stages[phaseData[i].sets[d].games[g].stage.name].games++
                            } else {
                                stages[phaseData[i].sets[d].games[g].stage.name] = {
                                    games: 1
                                }
                            }
                        };
                        if (phaseData[i].sets[d].games[g].selections !== null) {
                            let te = phaseData[i].sets[d].games[g].selections.filter(u => u.entrant.name === phaseData[i].sets[d].self.name);
                            if (te.length !== 0) {
                                if (chars[te[0].selectionValue]) {
                                    chars[te[0].selectionValue].games++
                                } else {
                                    chars[te[0].selectionValue] = {
                                        games: 1
                                    }
                                }
                            }
                        }
                    }
                }
            };
        };
        totalGames[1] = [wins, loss]
    };
    let tempImga = ""
    if (tourneyData.images.length === 0) {
        tempImga = `
            <img alt="${tourneyData.event.tournament.name}" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Feather-core-calendar.svg/1024px-Feather-core-calendar.svg.png" style="filter: invert(1);" class="img-fluid rounded-start tourneyImg2">`
    } else {
        tempImga = `
            <img alt="${tourneyData.event.tournament.name}" src="${tourneyData.images.filter(u=>u.type === "profile")[0].url}" class="img-fluid rounded-start tourneyImg2">`
    };
    tourney.innerHTML += `
    <div class="d-flex">
        <a class="tourneyImg1">
            ${tempImga}
        </a>
        <div>
            <a href="https://start.gg/${tourneyData.event.slug}" class="text-light" style="font-size: calc(1.3rem + .6vw); text-decoration: none; color: currentColor!important" rel="noopener noreferrer" target="_blank">${tourneyData.event.tournament.name}</a>
            <h5 style="opacity: 0.9;">${tourneyData.event.name}</h5>
            ${teammate}
            <span>
                <span class="mui-thceyd-header20">${ordinal(userData.main.placement)}</span><span class="tss-zapqqm-body16">  of ${tourneyData.entrants}</span>
                <text style="opacity: .30"> •  </text>
                <text style="font-size: calc(0.8rem + .6vw)">Seed: </text><text style="font-size: calc(0.6rem + .6vw)">${userData.main.seed}</text>
                <text style="opacity: .30"> •  </text>
                <text style="font-size: calc(0.8rem + .6vw)">Payout: </text><text style="font-size: calc(0.6rem + .6vw)">$ ${payout}${twosPayoutText}</text>
            </span>
        </div>
        <div class="ms-auto">
            <div>
                <h5>Total Sets</h5>
                <h5><text style="color: #7ab15b">${totalGames[0][0]} Wins</text><text style="opacity: 0%">  •  </text><text style="color: #d62c43">${totalGames[0][1]} Loss</text></h5>
                <h5>Total Games Played</h5>
                <h5><text style="color: #7ab15b">${totalGames[1][0]} Wins</text><text style="opacity: 0%">  •  </text><text style="color: #d62c43">${totalGames[1][1]} Loss</text></h5>
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style="display: inline">
                    <input type="radio" class="btn-check" name="btnradioChan" id="btnradioChange1" autocomplete="off" checked>
                    <label class="btn btn-outline-secondary" for="btnradioChange1">Sets</label>
                    <input type="radio" class="btn-check" name="btnradioChan" id="btnradioChange2" autocomplete="off">
                    <label class="btn btn-outline-secondary" for="btnradioChange2">Statistics</label>
                </div>
            </div>
        </div>
    </div>
    <hr/>
    ${userData.sets.nodes.length !== 0 ? `
    <div class="d-flex justify-content-start" style="max-height: 712px" id="mainTourneyContent">
        <div style="overflow: auto; max-width:500px; padding-right: 0.5rem!important;" id="setsList">
            ${setData}
        </div>
        <div class="px-3" style="width:816px;">
            <div id="tourneySetContent" class="ms-auto" style="text-align:center">
                <h3>Load set data from the sets on the left</h3>
            </div>
        </div>
    </div>` : `
    <div class="d-flex justify-content-start" style="max-height: 712px" id="mainTourneyContent">
        <div class="px-3" style="width:816px;">
            <div id="tourneySetContent" class="ms-auto" style="text-align:center">
                <h3>This tourney has 0 set data</h3>
            </div>
        </div>
    </div>`}
    
    `
    radioButtons5 = document.getElementsByName("btnradioChan");
    for (let radioButton of radioButtons5) {
        radioButton.addEventListener('change', await changeViewType);
    }
};

let sideBar = {
    earnings: [],
    one: [],
    two: []
}
async function loadPlayer(id) {
    var playResu = document.getElementsByClassName('playerResults');
    playResu[0].innerHTML = "";
    playerDiv[0].style.display = "none";
    let play;
    if (currentPlay === undefined) {
        play = await fetch(`https://saorax-pl.github.io/players/pl/${id}.json`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Opera GX\";v=\"84\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "none"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        }).then(res => res.json()).catch(async err => {
            console.log(err);
        });

        for (var i in play.tourneys) {
            play.tourneys[i][0] = play.tourneys[i][0].sort((a, b) => {
                if (a.data.sets.nodes.length !== 0) {
                    return a.data.sets.nodes[0].completedAt - b.data.sets.nodes[0].completedAt
                } else {
                    return []
                }
            });
            play.tourneys[i][1] = play.tourneys[i][1].sort((a, b) => {
                if (a.data.sets.nodes.length !== 0) {
                    return a.data.sets.nodes[0].completedAt - b.data.sets.nodes[0].completedAt
                } else {
                    return []
                }
            });
            play.tourneys[i][2] = play.tourneys[i][2].sort((a, b) => {
                if (a.data.sets.nodes.length !== 0 && b.data.sets.nodes.length !== 0) {
                    return a.data.sets.nodes[0].completedAt - b.data.sets.nodes[0].completedAt
                } else {
                    return []
                }
            });
        };
        currentPlay = play;
        if (currentPlay === undefined && char === undefined) {
            play = await fetch(`http://localhost:3000/main.php?type=user&user=${id}`, {
                "method": "GET",
            }).then(res => res.json()).catch(err => {
                console.log(err);
            });
            char = await fetch(`http://localhost:3000/main.php?type=char`, {
                "method": "GET",
            }).then(res => res.json()).catch(err => {
                console.log(err);
            });
            isOffline = true;
            currentPlay = play;
            currentSortedHistory = []
        };
    } else {
        if (currentPlay.id !== id) {
            play = await fetch(`https://saorax-pl.github.io/players/pl/${id}.json`, {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Opera GX\";v=\"84\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "none"
                },
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "omit"
            }).then(res => res.json()).catch(err => {
                console.log(err);
            });
            currentPlay = play;
            currentSortedHistory = [];
            for (var i in play.tourneys) {
                play.tourneys[i][0] = play.tourneys[i][0].sort((a, b) => a.data.sets.nodes[0].completedAt - b.data.sets.nodes[0].completedAt);
                play.tourneys[i][1] = play.tourneys[i][1].sort((a, b) => a.data.sets.nodes[0].completedAt - b.data.sets.nodes[0].completedAt);
                play.tourneys[i][2] = play.tourneys[i][2].sort((a, b) => a.data.sets.nodes[0].completedAt - b.data.sets.nodes[0].completedAt);
            };
        } else {
            play = currentPlay;
        }
    }
    let img = "";
    if (play.images.length !== 0 && play.images.some(x => x.type.toLowerCase() == "profile")) {
        for (var t = 0; t < play.images.length; t++) {
            if (play.images[t].type === "profile") {
                img = `<a class="playerImg3">
                    <img alt="${play.name}" src="${play.images[t].url}" class="playerImg4">
                </a>`
            }
        }
    } else {
        img =
            `<div class="playerImg1"><div class="playerLetter">${play.name.charAt(0)}</div></div>`
    };
    let tempAl = "";
    if (play.alias.length !== 1) {
        tempAl = play.alias.join(", ");
        tempAl = tempAl.replace(`${play.name}, `, "")
    } else {
        tempAl = "none"
    };
    tempAl = `<span><strong>Aliases</strong>: ${tempAl}</span>`;
    let socials = "";
    let socials2 = {
        "TWITTER": {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" stroke="currentColor"/></svg>`,
            url: "https://twitter.com/"
        },
        "TWITCH": {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z"/></svg>`,
            url: "https://twitch.tv/"
        },
        "SHARE": {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="30" height="30"
            viewBox="0 0 30 30"
            style=" fill:#FFFFFF;"><path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path></svg>`,
            url: `https://saorax.github.io/site/tourney/index.html?playerId=${play.id}`
        }
    };
    for (var i = 0; i < play.auth.length; i++) {
        if (play.auth[i].platform !== "DISCORD") {
            socials +=
                `<a class="pr-10 text-light linkSpan" target="_blank" style="text-decoration: none; color: currentColor!important;" rel="noopener noreferrer" href="${socials2[play.auth[i].platform].url}${play.auth[i].username}">${socials2[play.auth[i].platform].icon} ${play.auth[i].username}</a>`;
        }
    };
    let tops = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
    let totalTour = [0, 0, 0];
    let totalPrize = [0, 0, 0];
    let tourBut = "";
    let reverseIsDark = "-light";
    for (var i in play.tourneys) {
        if (tourBut === "") {
            tourBut += `
            <p>
                <input class="ms-1" type="radio" name="btnradio1" id="btnradioall" autocomplete="off" checked>
                <label class="text${reverseIsDark} ms-1" for="btnradioall">All</label>
            </p>
            <p>
                <input class="ms-1" type="radio" name="btnradio1" id="btnradio${i}" autocomplete="off">
                <label class="text${reverseIsDark} ms-1" for="btnradio${i}">${i}</label>
            </p>`;
        } else {
            tourBut += `
            <p>
                <input class="ms-1" type="radio" name="btnradio1" id="btnradio${i}" autocomplete="off">
                <label class="text${reverseIsDark} ms-1" for="btnradio${i}">${i}</label>
            </p>`;
        }
        totalTour[0] += play.tourneys[i][0].length;
        totalTour[1] += play.tourneys[i][1].length;
        totalTour[2] += play.tourneys[i][2].length;
        for (var t = 0; t < play.tourneys[i].length; t++) {
            for (var r = 0; r < play.tourneys[i][t].length; r++) {
                if (play.tourneys[i][t][r].data.main.prizing !== null && play.tourneys[i][t][r].data.main.prizing !== undefined) {
                    //console.log(i, t, r, play.tourneys[i][t][r].data.main.prizing)
                    totalPrize[t] += parseInt(play.tourneys[i][t][r].data.main.prizing / (t + 1));
                }
                if (play.tourneys[i][t][r].data.main.placement === 1) {
                    tops[t][0]++;
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (play.tourneys[i][t][r].data.main.placement === 2) {
                    tops[t][1]++;
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (play.tourneys[i][t][r].data.main.placement === 3) {
                    tops[t][2]++;
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (play.tourneys[i][t][r].data.main.placement <= 8) {
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (play.tourneys[i][t][r].data.main.placement <= 32) {
                    tops[t][4]++;
                }
            }
        }
    };
    userTourneyData = play.tourneys

    /*
    SWAP EARNINGS / PLACEMENT TAB ON COMMUNITY / OFFICIAL CHANGE
    FILTERED SEARCHING FOR WON / LOST / TEAMED
    TOURNEY SEARCHING DISREGARDS YEAR / MODE FILTER
    SORTING TOURNAMENTS BY PRIZE, AND OTHER STUFF
    TOURNAMENT HISTORY CAN REDIRECT TO PLAYER DATABASE / VICE VERSA
    ADD ALL TOURNAMENTS FILES TO HEROKU
    TRY CARDS FOR TOURNEY LIST ON PLAYER
    ADD OPTION FOR COMBINED TOURNEY DATA ON PLAYER (PLAYED CHARACTERS / STAGES, AVERAGE PLACEMENTS, UPSETS)
    OPPONENT HISTORY

    !! MOVE LEGEND / STAGE STATS TO ANOTHER TAB; SHORTEN PAGE HEIGHT TO ADJUST TO REMOVAL
    !! ADD ADDITIONAL STUFF ALONG WITH LEGEND / STAGE STATS (UPSETS, DROPOUTS)
    !! UPSETS / DROPOUTS SHOULD HAVE HOVER TEXT THAT TELLS IT WHAT IT MEANS
    */
    let isDark = "-dark";
    let charStages = getAllCharStages(currentPlay.id);
    let characterDiv = ``;
    for (var i = 0; i < charStages.legends.length; i++) {
        let opponents = ""
        for (var d = 0; d < charStages.legends[i].opponents.length; d++) {
            opponents += `
            <div class="col" style="padding: unset; width: unset">
                <div class="row g-0" style="width: 196px">
                    <div class="col-md-4 me-2" style="width: unset">
                        <img src="${charStages.legends[i].opponents[d].img}" class=" rounded-start pb-1" style="width:48px; height:48px" alt="${charStages.legends[i].opponents[d].name}">
                    </div>
                    <div class="col-md-8 me-2" style="width: unset">
                        <div class="card-body" style="padding:unset">
                            <p class="mui-thceyd-header20" style="font-size: 1.3rem; margin:unset;">${charStages.legends[i].opponents[d].name}</p>
                            <p style="margin:unset;"><h7>${charStages.legends[i].opponents[d].gamesAgainst} Games</h7></p>
                            <p style="margin:unset;"><text style="color: #7ab15b">${charStages.legends[i].opponents[d].winsAgainst} W</text><text style="opacity: 0%">•</text><text style="color: #ff677c; margin:unset;">${charStages.legends[i].opponents[d].lossAgainst} L</text><text style="opacity: 0%"> • </text>${((charStages.legends[i].opponents[d].gamesAgainst > 0) ? (100 * charStages.legends[i].opponents[d].winsAgainst / charStages.legends[i].opponents[d].gamesAgainst).toFixed(1) : 0)}%</p>
                        </div>
                    </div>
                </div>
            </div>`
        };
        characterDiv += `
        <div class="col" style="padding: unset; width: 33.33%">
            <div class="card border-secondary text-bg-dark">
                <div class="row g-0">
                    <div class="col-md-4 me-2" style="width: unset">
                        <img src="${charStages.legends[i].url}" class="img-fluid rounded-start pb-1" style="width:150px; height:150px" alt="${charStages.legends[i].name}">
                    </div>
                    <div class="col-md-8 me-2" style="width: unset">
                        <div class="card-body" style="padding:unset">
                            <span class="mui-thceyd-header20" style="font-size: 2rem;">${charStages.legends[i].name}</span>
                            <h4>${charStages.legends[i].games} Games<text style="opacity: 0%">  •  </text>${((charStages.legends[i].games > 0) ? (100 * charStages.legends[i].wins / charStages.legends[i].games).toFixed(1) : 0)}% WR</h4>
                            <h4>
                                <text style="color: #7ab15b">${charStages.legends[i].wins} Wins</text>
                                <text style="opacity: 0%">  •  </text>
                                <text style="color: #d62c43">${charStages.legends[i].loss} Losses</text>
                            </h4>
                        </div>
                    </div>
                    <div>
                        <h4 style="text-align: center">Legends Played Against</h4>
                        <div id="opponents" class="row row-cols-1 row-cols-md-2 d-flex" style="overflow: auto; height: 250px; --bs-gutter-x:0rem; padding-top: 10 !important">
                            ${opponents}
                        </div>
                </div>
                </div>
            </div>
        </div>`
    };
    characterDiv += ''
    playResu[0].innerHTML += `
    <div class="d-flex justify-content-between">
        <div>
        <div class="whoIs player">
            ${img}
            <div class="playerData">
                <div><a href="${play.smash.url}" class="text-light" style="font-size: calc(1.3rem + .6vw); text-decoration: none; color: currentColor!important" rel="noopener noreferrer" target="_blank">${play.name} (${play.smash.slug.replace('user/', '')})</a><a class="text-light" style="font-size: calc(1.2rem + .6vw); text-decoration: none; color: currentColor!important" href="javascript:void(0)" onclick="copyLink('${socials2["SHARE"].url}')"> ${socials2["SHARE"].icon}</a></div>
                <h5 style="opacity: 0.5;">${tempAl}</h5>
                <div style="display:flex">${socials}</div>
            </div>
            </div>
            <ul class="nav nav-tabs mt-auto" id="myTab" role="tablist" style="border-style:unset; font-size:1.7rem;">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active navTabs" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="true" style="color: rgba(255,255,255,.55)!important; background-color: unset!important">Tournament History</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link navTabs" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" style="color: rgba(255,255,255,.55)!important; background-color: unset!important;">1v1 Statistics</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link navTabs" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false" style="color: rgba(255,255,255,.55)!important; background-color: unset!important;">2v2 Statistics</button>
                </li>
            </ul>
        </div>
        
        <div class="px-3">
            <div style="text-align: center;">
                <div>
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style="display: inline">
                        <input type="radio" class="btn-check" name="btnradio4" id="btnradioAll1" autocomplete="off" checked>
                        <label class="btn btn-outline-success" for="btnradioAll1">Combined</label>

                        <input type="radio" class="btn-check" name="btnradio4" id="btnradioOffi1" autocomplete="off">
                        <label class="btn btn-outline-success" for="btnradioOffi1">Officials</label>

                        <input type="radio" class="btn-check" name="btnradio4" id="btnradioComm1" autocomplete="off">
                        <label class="btn btn-outline-success" for="btnradioComm1">Communities</label>
                    </div>
                </div>
                <nav class="flex-column flex-md-center justify-content-between navbar navbar-expand-sm bg${isDark} navbar${isDark} ms-auto" style="border-radius: 0 0 15px 15px; ">
                    <div class="d-flex justify-content-center">
                        <div>
                            <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                                <li class="nav-item px-4">
                                    <h4>Earnings</h4>
                                    <div>
                                        <h5>$<text id="earnings_1">${(totalPrize[0]+totalPrize[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</text></h5>
                                    </div>
                                    <div>
                                        <strong>1v1</strong>: $<text id="earnings_2">${totalPrize[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</text></span><text style="opacity: .30"> • </text><strong>2v2</strong>: $<text id="earnings_3">${totalPrize[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</text></span>
                                    </div>
                                </li>
                                <div class="vr"></div>
                                <li class="nav-item px-4">
                                    <h4>1v1 Placements</h4>
                                    <div>
                                        <img src="../../images/e2f8f101328a4b4ae7875945716345b3.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10"><text id="1v1_1">${tops[0][0]}</text></span>
                                        <img src="../../images/c65da98dd1cd29756d4d5901ed549661.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10"><text id="1v1_2">${tops[0][1]}</text></span>
                                        <img src="../../images/9ecf90770f4de9be7b44cb601d49722c.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10"><text id="1v1_3">${tops[0][2]}</text></span>
                                    </div>
                                    <span class="pr-10" style="font-size: 18">Top 8s: <text id="1v1_4">${tops[0][3]}</text></span>
                                    <span class="pr-10" style="font-size: 18">Top 32s: <text id="1v1_5">${tops[0][4]}</text></span>
                                    <p><text id="1v1_6">${totalTour[0]}</text> tournaments played</p>
                                </li>
                                <div class="vr"></div>
                                <li class="nav-item px-4">
                                    <h4>2v2 Placements</h4>
                                    <div>
                                        <img src="../../images/e2f8f101328a4b4ae7875945716345b3.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10"><text id="2v2_1">${tops[1][0]}</text></span>
                                        <img src="../../images/c65da98dd1cd29756d4d5901ed549661.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10"><text id="2v2_2">${tops[1][1]}</text></span>
                                        <img src="../../images/9ecf90770f4de9be7b44cb601d49722c.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10"><text id="2v2_3">${tops[1][2]}</text></span>
                                    </div>
                                    <span class="pr-10" style="font-size: 18">Top 8s: <text id="2v2_4">${tops[1][3]}</text></span>
                                    <span class="pr-10" style="font-size: 18">Top 32s: <text id="2v2_5">${tops[1][4]}</text></span>
                                    <p><text id="2v2_6">${totalTour[1]}</text> tournaments played</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    <br>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="history" role="tabpanel" aria-labelledby="history-tab">
        <div class="d-flex">
        <div class="px-3 container" id="tourneyContent">
            <h3 style="text-align:center">Load data from the list of tournaments on the side</h3>
        </div>
        <div>
            <div>
                <div class="btn-group">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Tournament Type
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton" style="border: 1px solid #0a58ca">
                        <p>
                            <input class="ms-1" type="radio" name="btnradio2" id="btnradioAllv" autocomplete="off" checked>
                            <label class="text${reverseIsDark} ms-1" for="btnradioAllv">All Tournaments</label>
                        </p>
                        <p>
                            <input class="ms-1" type="radio" name="btnradio2" id="btnradio1v1" autocomplete="off">
                            <label class="text${reverseIsDark} ms-1" for="btnradio1v1">1v1 Tournaments</label>
                        </p>
                        <p>
                            <input class="ms-1" type="radio" name="btnradio2" id="btnradio2v2" autocomplete="off">
                            <label class="text${reverseIsDark} ms-1" for="btnradio2v2">2v2 Tournaments</label>
                        </p>
                        <p>
                            <input class="ms-1" type="radio" name="btnradio2" id="btnradio2v3" autocomplete="off">
                            <label class="text${reverseIsDark} ms-1" for="btnradio2v3">Other Tournaments</label>
                        </p>
                    </ul>
                </div>
                <div class="btn-group">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Year
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton" style="border: 1px solid #6c757d">
                        ${tourBut}
                    </ul>
                </div>
                <div class="btn-group">
                    <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Tourney Type
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton" style="border: 1px solid #198754">
                        <p>
                            <input class="ms-1" type="radio" name="btnradio3" id="btnradioAllt" autocomplete="off" checked>
                            <label class="text${reverseIsDark} ms-1" for="btnradioAllt">Both</label>
                        </p>
                        <p>
                            <input class="ms-1" type="radio" name="btnradio3" id="btnradioOffi" autocomplete="off">
                            <label class="text${reverseIsDark} ms-1" for="btnradioOffi">Officials</label>
                        </p>
                        <p>
                            <input class="ms-1" type="radio" name="btnradio3" id="btnradioComm" autocomplete="off">
                            <label class="text${reverseIsDark} ms-1" for="btnradioComm">Communities</label>
                        </p>
                    </ul>
                </div>
            </div>
            <div class="ms-auto" style="overflow: auto; max-width:693px; height: 873px; padding-top: 10 !important;" id="tourneyList">
                meow meow
            </div>
        </div>
    </div>
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <div>
        <div style="text-align: center">
            <div>
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style="display: inline">
                    <input type="radio" class="btn-check" name="btnradioStats" id="btnradioChars" autocomplete="off" checked>
                    <label class="btn btn-outline-warning" for="btnradioChars">Characters Played</label>

                    <input type="radio" class="btn-check" name="btnradioStats" id="btnradioPlayer" autocomplete="off">
                    <label class="btn btn-outline-warning" for="btnradioPlayer">Player VS Player History</label>
                </div>
            </div>
        </div>
        <div id="otherTab">
            <div>
                <h1 style="text-align: center">Characters Played</h1>
                <h3 style="text-align: center">${charStages.legends.length} reported Legends</h3>
                <div class="d-flex justify-content-center">
                    <div class="form-floating">
                        <input type="text" class="form-control${isDark.replace('-light', '')}" id="characterSearch">
                        <label for="floatingInput">Search for a Legend</label>
                    </div>
                </div>
            </div>
            <div id="characters" class="row row-cols-1 row-cols-md-2 d-flex" style="overflow: auto; --bs-gutter-x:0rem; padding-top: 10 !important">
                ${characterDiv}
            </div>
        </div>
    </div>
        </div>
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
    </div>`;
    $(document).ready(async function () {
        $("#characterSearch").on("input", function (e) {
            let charDiv = document.getElementById("characters")
            charDiv.innerHTML = "";
            let name = e.target.value;
            let charStages = getAllCharStages(currentPlay.id);
            charStages.legends = charStages.legends.filter(u => u.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
            if (name !== "") {
                let characterDiv = ``;
                let stagesDiv = "";
                for (var i = 0; i < charStages.legends.length; i++) {
                    let opponents = ""
                    for (var d = 0; d < charStages.legends[i].opponents.length; d++) {
                        opponents += `
                        <div class="col" style="padding: unset; width: unset">
                            <div class="row g-0" style="width: 196px">
                                <div class="col-md-4 me-2" style="width: unset">
                                    <img src="${charStages.legends[i].opponents[d].img}" class=" rounded-start pb-1" style="width:48px; height:48px" alt="${charStages.legends[i].opponents[d].name}">
                                </div>
                                <div class="col-md-8 me-2" style="width: unset">
                                    <div class="card-body" style="padding:unset">
                                        <p class="mui-thceyd-header20" style="font-size: 1.3rem; margin:unset;">${charStages.legends[i].opponents[d].name}</p>
                                        <p style="margin:unset;"><h7>${charStages.legends[i].opponents[d].gamesAgainst} Games</h7></p>
                                        <p style="margin:unset;"><text style="color: #7ab15b">${charStages.legends[i].opponents[d].winsAgainst} W</text><text style="opacity: 0%">•</text><text style="color: #ff677c; margin:unset;">${charStages.legends[i].opponents[d].lossAgainst} L</text><text style="opacity: 0%"> • </text>${((charStages.legends[i].opponents[d].gamesAgainst > 0) ? (100 * charStages.legends[i].opponents[d].winsAgainst / charStages.legends[i].opponents[d].gamesAgainst).toFixed(1) : 0)}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    };
                    characterDiv += `
                    <div class="col" style="padding: unset; width: 33.33%">
                        <div class="card border-secondary text-bg-dark">
                            <div class="row g-0">
                                <div class="col-md-4 me-2" style="width: unset">
                                    <img src="${charStages.legends[i].url}" class="img-fluid rounded-start pb-1" style="width:150px; height:150px" alt="${charStages.legends[i].name}">
                                </div>
                                <div class="col-md-8 me-2" style="width: unset">
                                    <div class="card-body" style="padding:unset">
                                        <span class="mui-thceyd-header20" style="font-size: 2rem;">${charStages.legends[i].name}</span>
                                        <h4>${charStages.legends[i].games} Games<text style="opacity: 0%">  •  </text>${((charStages.legends[i].games > 0) ? (100 * charStages.legends[i].wins / charStages.legends[i].games).toFixed(1) : 0)}% WR</h4>
                                        <h4>
                                            <text style="color: #7ab15b">${charStages.legends[i].wins} Wins</text>
                                            <text style="opacity: 0%">  •  </text>
                                            <text style="color: #d62c43">${charStages.legends[i].loss} Losses</text>
                                        </h4>
                                    </div>
                                </div>
                                <div>
                                    <h4 style="text-align: center">Legends Played Against</h4>
                                    <div id="opponents" class="row row-cols-1 row-cols-md-2 d-flex" style="overflow: auto; height: 250px; --bs-gutter-x:0rem; padding-top: 10 !important">
                                        ${opponents}
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>`
                };
                characterDiv += '';
                charDiv.innerHTML = characterDiv
            } else {
                charStages = getAllCharStages(currentPlay.id);
                let characterDiv = ``;
                let stagesDiv = "";
                for (var i = 0; i < charStages.legends.length; i++) {
                    let opponents = ""
                    for (var d = 0; d < charStages.legends[i].opponents.length; d++) {
                        opponents += `
                        <div class="col" style="padding: unset; width: unset">
                            <div class="row g-0" style="width: 196px">
                                <div class="col-md-4 me-2" style="width: unset">
                                    <img src="${charStages.legends[i].opponents[d].img}" class=" rounded-start pb-1" style="width:48px; height:48px" alt="${charStages.legends[i].opponents[d].name}">
                                </div>
                                <div class="col-md-8 me-2" style="width: unset">
                                    <div class="card-body" style="padding:unset">
                                        <p class="mui-thceyd-header20" style="font-size: 1.3rem; margin:unset;">${charStages.legends[i].opponents[d].name}</p>
                                        <p style="margin:unset;"><h7>${charStages.legends[i].opponents[d].gamesAgainst} Games</h7></p>
                                        <p style="margin:unset;"><text style="color: #7ab15b">${charStages.legends[i].opponents[d].winsAgainst} W</text><text style="opacity: 0%">•</text><text style="color: #ff677c; margin:unset;">${charStages.legends[i].opponents[d].lossAgainst} L</text><text style="opacity: 0%"> • </text>${((charStages.legends[i].opponents[d].gamesAgainst > 0) ? (100 * charStages.legends[i].opponents[d].winsAgainst / charStages.legends[i].opponents[d].gamesAgainst).toFixed(1) : 0)}%</p>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    };
                    characterDiv += `
                    <div class="col" style="padding: unset; width: 33.33%">
                        <div class="card border-secondary text-bg-dark">
                            <div class="row g-0">
                                <div class="col-md-4 me-2" style="width: unset">
                                    <img src="${charStages.legends[i].url}" class="img-fluid rounded-start pb-1" style="width:150px; height:150px" alt="${charStages.legends[i].name}">
                                </div>
                                <div class="col-md-8 me-2" style="width: unset">
                                    <div class="card-body" style="padding:unset">
                                        <span class="mui-thceyd-header20" style="font-size: 2rem;">${charStages.legends[i].name}</span>
                                        <h4>${charStages.legends[i].games} Games<text style="opacity: 0%">  •  </text>${((charStages.legends[i].games > 0) ? (100 * charStages.legends[i].wins / charStages.legends[i].games).toFixed(1) : 0)}% WR</h4>
                                        <h4>
                                            <text style="color: #7ab15b">${charStages.legends[i].wins} Wins</text>
                                            <text style="opacity: 0%">  •  </text>
                                            <text style="color: #d62c43">${charStages.legends[i].loss} Losses</text>
                                        </h4>
                                    </div>
                                </div>
                                <div>
                                    <h4 style="text-align: center">Legends Played Against</h4>
                                    <div id="opponents" class="row row-cols-1 row-cols-md-2 d-flex" style="overflow: auto; height: 250px; --bs-gutter-x:0rem; padding-top: 10 !important">
                                        ${opponents}
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>`
                };
                characterDiv += '';
                charDiv.innerHTML = characterDiv
            }
        });
    });
    radioButtonsStats = document.getElementsByName("btnradioStats");
    for (let radioButton of radioButtonsStats) {
        radioButton.addEventListener('change', changeOther);
    };
    radioButtons4 = document.getElementsByName("btnradio4");
    for (let radioButton of radioButtons4) {
        radioButton.addEventListener('change', changeSide);
    };
    radioButtons1 = document.getElementsByName("btnradio1");
    for (let radioButton of radioButtons1) {
        radioButton.addEventListener('change', yearButton);
    };
    radioButtons2 = document.getElementsByName("btnradio2");
    for (let radioButton of radioButtons2) {
        radioButton.addEventListener('change', modeButton);
    };
    radioButtons3 = document.getElementsByName("btnradio3");
    for (let radioButton of radioButtons3) {
        radioButton.addEventListener('change', modeButton);
    };
    radioButtons4 = document.getElementsByName("btnradio4");
    for (let radioButton of radioButtons4) {
        radioButton.addEventListener('change', changeSide);
    };

    await tourneyList('all');
};
async function changeOtherStats(type) {
    let otherTab = document.getElementById("otherTab");
    otherTab.innerHTML = `
    <div>
        <h1 style="text-align: center">loading . . .</h1>
    </div>`
    if (type === "Chars") {
        let charStages = getAllCharStages(currentPlay.id);
        let characterDiv = `<div class="row row-cols-1 row-cols-md-2 d-flex justify-content-between" style="overflow: auto; --bs-gutter-x:0rem; padding-top: 10 !important">`;
        for (var i = 0; i < charStages.legends.length; i++) {
            let opponents = ""
            for (var d = 0; d < charStages.legends[i].opponents.length; d++) {
                opponents += `
                <div class="col" style="padding: unset; width: unset">
                    <div class="row g-0" style="width: 196px">
                        <div class="col-md-4 me-2" style="width: unset">
                            <img src="${charStages.legends[i].opponents[d].img}" class=" rounded-start pb-1" style="width:48px; height:48px" alt="${charStages.legends[i].opponents[d].name}">
                        </div>
                        <div class="col-md-8 me-2" style="width: unset">
                            <div class="card-body" style="padding:unset">
                                <p class="mui-thceyd-header20" style="font-size: 1.3rem; margin:unset;">${charStages.legends[i].opponents[d].name}</p>
                                <p style="margin:unset;"><h7>${charStages.legends[i].opponents[d].gamesAgainst} Games</h7></p>
                                <p style="margin:unset;"><text style="color: #7ab15b">${charStages.legends[i].opponents[d].winsAgainst} W</text><text style="opacity: 0%">•</text><text style="color: #ff677c; margin:unset;">${charStages.legends[i].opponents[d].lossAgainst} L</text><text style="opacity: 0%"> • </text>${((charStages.legends[i].opponents[d].gamesAgainst > 0) ? (100 * charStages.legends[i].opponents[d].winsAgainst / charStages.legends[i].opponents[d].gamesAgainst).toFixed(1) : 0)}%</p>
                            </div>
                        </div>
                    </div>
                </div>`
            };
            characterDiv += `
            <div class="col" style="padding: unset; width: 33.33%">
                <div class="card border-secondary text-bg-dark">
                    <div class="row g-0">
                        <div class="col-md-4 me-2" style="width: unset">
                            <img src="${charStages.legends[i].url}" class="img-fluid rounded-start pb-1" style="width:150px; height:150px" alt="${charStages.legends[i].name}">
                        </div>
                        <div class="col-md-8 me-2" style="width: unset">
                            <div class="card-body" style="padding:unset">
                                <span class="mui-thceyd-header20" style="font-size: 2rem;">${charStages.legends[i].name}</span>
                                <h4>${charStages.legends[i].games} Games<text style="opacity: 0%">  •  </text>${((charStages.legends[i].games > 0) ? (100 * charStages.legends[i].wins / charStages.legends[i].games).toFixed(1) : 0)}% WR</h4>
                                <h4>
                                    <text style="color: #7ab15b">${charStages.legends[i].wins} Wins</text>
                                    <text style="opacity: 0%">  •  </text>
                                    <text style="color: #d62c43">${charStages.legends[i].loss} Losses</text>
                                </h4>
                            </div>
                        </div>
                        <div>
                            <h4 style="text-align: center">Legends Played Against</h4>
                            <div id="opponents" class="row row-cols-1 row-cols-md-2 d-flex" style="overflow: auto; height: 250px; --bs-gutter-x:0rem; padding-top: 10 !important">
                                ${opponents}
                            </div>
                    </div>
                    </div>
                </div>
            </div>`
        };
        characterDiv += '</div>'
        let isDark = "-dark";
        if (otherTab.innerHTML.includes(`<h1 style="text-align: center">loading . . .</h1>`)) {
            otherTab.innerHTML = `
            <div>
                <h1 style="text-align: center">Characters Played</h1>
                <h3 style="text-align: center">${charStages.legends.length} reported Legends</h3>
                <div class="d-flex justify-content-center">
                    <div class="form-floating">
                        <input type="text" class="form-control${isDark.replace('-light', '')}" id="characterSearch">
                        <label for="floatingInput">Search for a Legend</label>
                    </div>
                </div>
            </div>
            <div id="characters" style="overflow: auto; height: 786px;">
                ${characterDiv}
            </div>`
            $(document).ready(async function () {
                $("#characterSearch").on("input", function (e) {
                    let charDiv = document.getElementById("characters")
                    charDiv.innerHTML = "";
                    let name = e.target.value;
                    let charStages = getAllCharStages(currentPlay.id);
                    charStages.legends = charStages.legends.filter(u => u.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
                    if (name !== "") {
                        let characterDiv = `<div class="row row-cols-1 row-cols-md-2 d-flex justify-content-between" style="overflow: auto; --bs-gutter-x:0rem; padding-top: 10 !important">`;
                        let stagesDiv = "";
                        for (var i = 0; i < charStages.legends.length; i++) {
                            let opponents = ""
                            for (var d = 0; d < charStages.legends[i].opponents.length; d++) {
                                opponents += `
                                <div class="col" style="padding: unset; width: unset">
                                    <div class="row g-0" style="width: 196px">
                                        <div class="col-md-4 me-2" style="width: unset">
                                            <img src="${charStages.legends[i].opponents[d].img}" class=" rounded-start pb-1" style="width:48px; height:48px" alt="${charStages.legends[i].opponents[d].name}">
                                        </div>
                                        <div class="col-md-8 me-2" style="width: unset">
                                            <div class="card-body" style="padding:unset">
                                                <p class="mui-thceyd-header20" style="font-size: 1.3rem; margin:unset;">${charStages.legends[i].opponents[d].name}</p>
                                                <p style="margin:unset;"><h7>${charStages.legends[i].opponents[d].gamesAgainst} Games</h7></p>
                                                <p style="margin:unset;"><text style="color: #7ab15b">${charStages.legends[i].opponents[d].winsAgainst} W</text><text style="opacity: 0%">•</text><text style="color: #ff677c; margin:unset;">${charStages.legends[i].opponents[d].lossAgainst} L</text><text style="opacity: 0%"> • </text>${((charStages.legends[i].opponents[d].gamesAgainst > 0) ? (100 * charStages.legends[i].opponents[d].winsAgainst / charStages.legends[i].opponents[d].gamesAgainst).toFixed(1) : 0)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                            };
                            characterDiv += `
                            <div class="col" style="padding: unset; width: 33.33%">
                                <div class="card border-secondary text-bg-dark">
                                    <div class="row g-0">
                                        <div class="col-md-4 me-2" style="width: unset">
                                            <img src="${charStages.legends[i].url}" class="img-fluid rounded-start pb-1" style="width:150px; height:150px" alt="${charStages.legends[i].name}">
                                        </div>
                                        <div class="col-md-8 me-2" style="width: unset">
                                            <div class="card-body" style="padding:unset">
                                                <span class="mui-thceyd-header20" style="font-size: 2rem;">${charStages.legends[i].name}</span>
                                                <h4>${charStages.legends[i].games} Games<text style="opacity: 0%">  •  </text>${((charStages.legends[i].games > 0) ? (100 * charStages.legends[i].wins / charStages.legends[i].games).toFixed(1) : 0)}% WR</h4>
                                                <h4>
                                                    <text style="color: #7ab15b">${charStages.legends[i].wins} Wins</text>
                                                    <text style="opacity: 0%">  •  </text>
                                                    <text style="color: #d62c43">${charStages.legends[i].loss} Losses</text>
                                                </h4>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style="text-align: center">Legends Played Against</h4>
                                            <div id="opponents" class="row row-cols-1 row-cols-md-2 d-flex" style="overflow: auto; height: 250px; --bs-gutter-x:0rem; padding-top: 10 !important">
                                                ${opponents}
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>`
                        };
                        characterDiv += '</div>';
                        charDiv.innerHTML = characterDiv
                    } else {
                        charStages = getAllCharStages(currentPlay.id);
                        let characterDiv = `<div class="row row-cols-1 row-cols-md-2 d-flex justify-content-between" style="overflow: auto; --bs-gutter-x:0rem; padding-top: 10 !important">`;
                        let stagesDiv = "";
                        for (var i = 0; i < charStages.legends.length; i++) {
                            let opponents = ""
                            for (var d = 0; d < charStages.legends[i].opponents.length; d++) {
                                opponents += `
                                <div class="col" style="padding: unset; width: unset">
                                    <div class="row g-0" style="width: 196px">
                                        <div class="col-md-4 me-2" style="width: unset">
                                            <img src="${charStages.legends[i].opponents[d].img}" class=" rounded-start pb-1" style="width:48px; height:48px" alt="${charStages.legends[i].opponents[d].name}">
                                        </div>
                                        <div class="col-md-8 me-2" style="width: unset">
                                            <div class="card-body" style="padding:unset">
                                                <p class="mui-thceyd-header20" style="font-size: 1.3rem; margin:unset;">${charStages.legends[i].opponents[d].name}</p>
                                                <p style="margin:unset;"><h7>${charStages.legends[i].opponents[d].gamesAgainst} Games</h7></p>
                                                <p style="margin:unset;"><text style="color: #7ab15b">${charStages.legends[i].opponents[d].winsAgainst} W</text><text style="opacity: 0%">•</text><text style="color: #ff677c; margin:unset;">${charStages.legends[i].opponents[d].lossAgainst} L</text><text style="opacity: 0%"> • </text>${((charStages.legends[i].opponents[d].gamesAgainst > 0) ? (100 * charStages.legends[i].opponents[d].winsAgainst / charStages.legends[i].opponents[d].gamesAgainst).toFixed(1) : 0)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                            };
                            characterDiv += `
                            <div class="col" style="padding: unset; width: 33.33%">
                                <div class="card border-secondary text-bg-dark">
                                    <div class="row g-0">
                                        <div class="col-md-4 me-2" style="width: unset">
                                            <img src="${charStages.legends[i].url}" class="img-fluid rounded-start pb-1" style="width:150px; height:150px" alt="${charStages.legends[i].name}">
                                        </div>
                                        <div class="col-md-8 me-2" style="width: unset">
                                            <div class="card-body" style="padding:unset">
                                                <span class="mui-thceyd-header20" style="font-size: 2rem;">${charStages.legends[i].name}</span>
                                                <h4>${charStages.legends[i].games} Games<text style="opacity: 0%">  •  </text>${((charStages.legends[i].games > 0) ? (100 * charStages.legends[i].wins / charStages.legends[i].games).toFixed(1) : 0)}% WR</h4>
                                                <h4>
                                                    <text style="color: #7ab15b">${charStages.legends[i].wins} Wins</text>
                                                    <text style="opacity: 0%">  •  </text>
                                                    <text style="color: #d62c43">${charStages.legends[i].loss} Losses</text>
                                                </h4>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style="text-align: center">Legends Played Against</h4>
                                            <div id="opponents" class="row row-cols-1 row-cols-md-2 d-flex" style="overflow: auto; height: 250px; --bs-gutter-x:0rem; padding-top: 10 !important">
                                                ${opponents}
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>`
                        };
                        characterDiv += '</div>';
                        charDiv.innerHTML = characterDiv
                    }
                });
            });
        }
    } else if (type === "Player") {
        async function historyFunc() {
            if (currentSortedHistory.length !== 0) {
                return currentSortedHistory;
            } else {
                let tempSorted = [];
                let playerHistory = {};
                for (var i in currentPlay.tourneys) {
                    for (var t = 0; t < currentPlay.tourneys[i].length; t++) {
                        for (var r = 0; r < currentPlay.tourneys[i][t].length; r++) {
                            let tourney = currentPlay.tourneys[i][t][r];
                            let tourneyNodes = tourney.data.sets.nodes
                            for (var m = 0; m < tourneyNodes.length; m++) {
                                if (tourneyNodes[m].games !== null && tourneyNodes[m].slots[0].standing.stats.score.value !== -1 && tourneyNodes[m].slots[1].standing.stats.score.value !== -1) {
                                    if (t === 0) {
                                        let oppon = tourneyNodes[m].slots.filter(u => {
                                            if (u.standing.entrant.participants[0].user === null) {
                                                return {
                                                    type: null
                                                }
                                            } else {
                                                return u.standing.entrant.participants[0].user.id !== currentPlay.id
                                            }
                                        })[0];
                                        if (oppon.standing.entrant.participants[0].user !== null) {
                                            if (!playerHistory[oppon.standing.entrant.participants[0].user.id]) {
                                                playerHistory[oppon.standing.entrant.participants[0].user.id] = {
                                                    smashId: oppon.standing.entrant.participants[0].user.id,
                                                    officials: {
                                                        games: 0,
                                                        setWins: 0,
                                                        setLoss: 0,
                                                        wins: {
                                                            total: 0,
                                                            tourneys: []
                                                        },
                                                        loss: {
                                                            total: 0,
                                                            tourneys: []
                                                        }
                                                    },
                                                    community: {
                                                        games: 0,
                                                        wins: {
                                                            total: 0,
                                                            tourneys: []
                                                        },
                                                        loss: {
                                                            total: 0,
                                                            tourneys: []
                                                        }
                                                    }
                                                }
                                            };

                                            if (tourney.type === 0) {
                                                playerHistory[oppon.standing.entrant.participants[0].user.id].officials.games++;
                                                if (tourneyNodes[m].winnerId === tourney.data.main.entity) {
                                                    playerHistory[oppon.standing.entrant.participants[0].user.id].officials.wins.total++;
                                                    playerHistory[oppon.standing.entrant.participants[0].user.id].officials.setWins += tourneyNodes[m].slots[0].standing.stats.score.value;
                                                    playerHistory[oppon.standing.entrant.participants[0].user.id].officials.wins.tourneys.push({
                                                        tourney: tourney.tourney_id,
                                                        setInfo: tourneyNodes[m]
                                                    })
                                                } else {
                                                    playerHistory[oppon.standing.entrant.participants[0].user.id].officials.loss.total++;
                                                    playerHistory[oppon.standing.entrant.participants[0].user.id].officials.loss.tourneys.push({
                                                        tourney: tourney.tourney_id,
                                                        setInfo: tourneyNodes[m]
                                                    })
                                                }
                                            } else {
                                                playerHistory[oppon.standing.entrant.participants[0].user.id].community.games++;
                                                if (tourneyNodes[m].winnerId === tourney.data.main.entity) {
                                                    playerHistory[oppon.standing.entrant.participants[0].user.id].community.wins.total++;
                                                    playerHistory[oppon.standing.entrant.participants[0].user.id].community.wins.tourneys.push({
                                                        tourney: tourney.tourney_id,
                                                        setInfo: tourneyNodes[m]
                                                    })
                                                } else {
                                                    playerHistory[oppon.standing.entrant.participants[0].user.id].community.loss.total++;
                                                    playerHistory[oppon.standing.entrant.participants[0].user.id].community.loss.tourneys.push({
                                                        tourney: tourney.tourney_id,
                                                        setInfo: tourneyNodes[m]
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }
                            };
                        }
                    }
                };
                let tempLeng1 = 0;
                let tempLeng = 0;
                let playerArr = [];
                for (var i in playerHistory) {
                    tempLeng1++;
                    playerArr.push({
                        url: `https://saorax-pl.github.io/players/pl/${playerHistory[i].smashId}.json`,
                        playerData: playerHistory[i]
                    });
                };
                const promises = playerArr.map(link => throttle(async () => {
                    const res = await fetch(link.url, {
                        "headers": {
                            "accept": "*/*",
                            "accept-language": "en-US,en;q=0.9",
                            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Opera GX\";v=\"84\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "none"
                        },
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": null,
                        "method": "GET",
                        "mode": "cors",
                        "credentials": "omit"
                    }).then(res => res.json()).catch(err => {
                        console.log(err);
                    });
                    let data = {
                        playerData: res,
                        playerData2: link.playerData
                    };
                    return data;
                }));

                await Promise.all(promises).then(datasets => {
                    for (var i = 0; i < datasets.length; i++) {
                        let playerData1 = datasets[i].playerData2;
                        let playerData2 = datasets[i].playerData;
                        let setWins = [0, 0];
                        let setLose = [0, 0];
                        for (var d = 0; d < playerData1.officials.loss.tourneys.length; d++) {
                            let set = playerData1.officials.loss.tourneys[d].setInfo;
                            let slotFilter1 = set.slots.filter(u => u.standing.entrant.participants[0].user.id === playerData2.id)[0];
                            let slotFilter2 = set.slots.filter(u => u.standing.entrant.participants[0].user.id !== playerData2.id)[0];
                            setWins[0] += slotFilter2.standing.stats.score.value;
                            setLose[0] += slotFilter1.standing.stats.score.value
                        };
                        for (var d = 0; d < playerData1.officials.wins.tourneys.length; d++) {
                            let set = playerData1.officials.wins.tourneys[d].setInfo;
                            let slotFilter1 = set.slots.filter(u => u.standing.entrant.participants[0].user.id === playerData2.id)[0];
                            let slotFilter2 = set.slots.filter(u => u.standing.entrant.participants[0].user.id !== playerData2.id)[0];
                            setWins[0] += slotFilter2.standing.stats.score.value;
                            setLose[0] += slotFilter1.standing.stats.score.value
                        };
                        for (var d = 0; d < playerData1.community.loss.tourneys.length; d++) {
                            let set = playerData1.community.loss.tourneys[d].setInfo;
                            let slotFilter1 = set.slots.filter(u => u.standing.entrant.participants[0].user.id === playerData2.id)[0];
                            let slotFilter2 = set.slots.filter(u => u.standing.entrant.participants[0].user.id !== playerData2.id)[0];
                            setWins[1] += slotFilter2.standing.stats.score.value;
                            setLose[1] += slotFilter1.standing.stats.score.value
                        };
                        for (var d = 0; d < playerData1.community.wins.tourneys.length; d++) {
                            let set = playerData1.community.wins.tourneys[d].setInfo;
                            let slotFilter1 = set.slots.filter(u => u.standing.entrant.participants[0].user.id === playerData2.id)[0];
                            let slotFilter2 = set.slots.filter(u => u.standing.entrant.participants[0].user.id !== playerData2.id)[0];
                            setWins[1] += slotFilter2.standing.stats.score.value;
                            setLose[1] += slotFilter1.standing.stats.score.value
                        };
                        tempSorted.push({
                            smashId: playerData1.smashId,
                            officials: {
                                games: playerData1.officials.games,
                                wins: playerData1.officials.wins,
                                loss: playerData1.officials.loss,
                                setWins: setWins[0],
                                setLoss: setLose[0]
                            },
                            community: {
                                games: playerData1.community.games,
                                wins: playerData1.community.wins,
                                loss: playerData1.community.loss,
                                setWins: setWins[1],
                                setLoss: setLose[1]
                            },
                            playerInfo: {
                                name: playerData2.name,
                                private: playerData2.private,
                                smash: playerData2.smash,
                                images: playerData2.images,
                                id: playerData2.id,
                                socials: playerData2.auth
                            },
                            totalGames: playerData1.officials.games + playerData1.community.games
                        });
                        tempLeng++;
                    };
                });
                currentSortedHistory = tempSorted;
                return tempSorted;
            }
        };
        let sortedHistory = await historyFunc();
        sortedHistory = sortedHistory.sort((a, b) => (b.officials.setWins + b.officials.setLoss) - (a.officials.setWins + a.officials.setLoss));
        let temps = ``;
        let totalGames = [0, 0];
        let totalWins = [
            [0, 0], // set wins; [0] off [1] comm
            [0, 0] // game wins; [0] off [1] comm
        ];
        let totalLoss = [
            [0, 0], // set wins; [0] off [1] comm
            [0, 0] // game wins; [0] off [1] comm
        ];
        for (var i = 0; i < sortedHistory.length; i++) {
            if (sortedHistory[i].officials.wins.tourneys.length + sortedHistory[i].officials.loss.tourneys.length !== 0) {
                totalGames[0] += sortedHistory[i].officials.games;
                totalGames[1] += sortedHistory[i].community.games;
                totalWins[0][0] += sortedHistory[i].officials.wins.total;
                totalWins[1][0] += sortedHistory[i].officials.setWins;
                totalWins[0][1] += sortedHistory[i].community.wins.total;
                totalWins[1][1] += sortedHistory[i].community.setWins;
                totalLoss[0][0] += sortedHistory[i].officials.loss.total;
                totalLoss[1][0] += sortedHistory[i].officials.setLoss;
                totalLoss[0][1] += sortedHistory[i].community.loss.total;
                totalLoss[1][1] += sortedHistory[i].community.setLoss;
                let oppImg = '';

                if (sortedHistory[i].playerInfo.images.length !== 0 && sortedHistory[i].playerInfo.images.some(x => x.type.toLowerCase() == "profile")) {
                    for (var t = 0; t < sortedHistory[i].playerInfo.images.length; t++) {
                        if (sortedHistory[i].playerInfo.images[t].type === "profile") {
                            oppImg = `
                            <a class="playerImg1 mt-2 ms-1 mb-2" style="width: 128px; height: 128px; margin-right:unset">
                                <img alt="${sortedHistory[i].playerInfo.name}" src="${sortedHistory[i].playerInfo.images[t].url}" class="playerImg2">
                            </a>`
                        };
                    }
                } else {
                    oppImg = `<div class="playerImg1 mt-2 ms-1 mb-2" style="width: 128px; height: 128px; font-size:3rem; margin-right:unset"><div class="playerLetter">${sortedHistory[i].playerInfo.name.charAt(0)}</div></div>`
                };

                temps += `
                <div class="card border-secondary text-bg-dark mb-3">
                    <div class="row g-0">
                        <div class="col-md-4 me-2 justify-content-center" style="width: 30%">
                            ${oppImg}
                        </div>
                        <div class="col-md-8 me-2" style="width: 66%">
                            <div class="card-body" style="padding: 0.5rem 0rem 0rem 1rem; text-align:center">
                                <span><text class="mui-thceyd-header20 me-2" style="font-weight: unset; font-size: 1.5rem;">vs</text><text class="mui-thceyd-header20" style="font-size: 1.8rem">${sortedHistory[i].playerInfo.name}</text></span>
                                <hr style="margin: 0.3rem 0;">
                                <div class="d-flex justify-content-center">
                                    <div>
                                    <h3>Sets</h3>
                                    <text style="font-size: 22; color: #7ab15b">${sortedHistory[i].officials.wins.total} Wins</text><text style="opacity: 0">••</text><text style="font-size: 22; color: #d62c43">Losses ${sortedHistory[i].officials.loss.total}</text><text style="opacity: 0">••</text><text style="font-size:18">${(((sortedHistory[i].officials.wins.total+sortedHistory[i].officials.loss.total) > 0) ? (100 * sortedHistory[i].officials.wins.total / (sortedHistory[i].officials.wins.total+sortedHistory[i].officials.loss.total)).toFixed(1) : 0)}% WR</text>
                                    <h3>Games</h3>
                                    <text style="font-size: 22; color: #7ab15b">${sortedHistory[i].officials.setWins} Wins</text><text style="opacity: 0">••</text><text style="font-size: 22; color: #d62c43">Losses ${sortedHistory[i].officials.setLoss}</text><text style="opacity: 0">••</text><text style="font-size:18">${(((sortedHistory[i].officials.setWins+sortedHistory[i].officials.setLoss) > 0) ? (100 * sortedHistory[i].officials.setWins / (sortedHistory[i].officials.setWins+sortedHistory[i].officials.setLoss)).toFixed(1) : 0)}% WR</text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="btn btn-outline-info mt-1" style="width:100%" onclick="loadPlayerHistory(${sortedHistory[i].smashId})">Load History</a>
                </div>`
            }
        };
        let isDark = "-dark";
        if (otherTab.innerHTML.includes(`<h1 style="text-align: center">loading . . .</h1>`)) {
            otherTab.innerHTML = `
            <div>
                <h1 style="text-align: center">Player VS Player History</h1>
                <nav class="flex-column flex-md-center justify-content-between navbar navbar-expand-sm bg${isDark} navbar${isDark} ms-auto" style="border-radius: 0 0 15px 15px; ">
                    <div class="d-flex justify-content-center">
                        <div id="playedStats">
                            <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                                <li class="nav-item px-4">
                                    <h4 style="color: #7ab15b">Total Wins</h4>
                                    <p style="font-size: 20">Sets: ${totalWins[0][0]}<text style="opacity: 0">  •  </text>Games: ${totalWins[1][0]}</p>
                                </li>
                                <div class="vr"></div>
                                <li class="nav-item px-4">
                                    <h4 style="color: #d62c43">Total Losses</h4>
                                    <p style="font-size: 20">Sets: ${totalLoss[0][0]}<text style="opacity: 0">  •  </text>Games: ${totalLoss[1][0]}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <div class="d-flex">
                    <div>
                        <div class="d-flex">
                            <div class="form-floating mb-2" style="width: 100%;">
                                <input type="text" class="form-control${isDark.replace('-light', '')}" style="border-radius: 0.25rem 0rem 0rem 0.25rem" id="playerSearch">
                                <label for="floatingInput">Search for a Player</label>
                            </div>
                            <div class="ms-auto mb-2">
                                <div class="btn-group" style="height:100%">
                                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style="border-radius: 0rem 0.25rem 0.25rem 0rem; font-size:1.1rem">
                                        Tournament Type
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton">
                                        <input type="radio" class="btn-check" name="btnradioPlFilter" id="btnradioOffi3" autocomplete="off" checked="">
                                        <label class="btn btn-outline-primary" for="btnradioOffi3">Officials</label>
                                        <input type="radio" class="btn-check" name="btnradioPlFilter" id="btnradioComm3" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="btnradioComm3">Communities</label>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id="playerHistory" style="overflow: auto; width:500px; height: 777px;">
                            ${temps}
                        </div>
                    </div>
                    <div id="loadedHistory">
                    </div>
                    <div id="setHistory" class="container" style="text-align: center; width:772px">
                    </div>
                </div>
            </div>`;

            radioButtonsPlayerFilter = document.getElementsByName("btnradioPlFilter");
            for (let radioButton of radioButtonsPlayerFilter) {
                radioButton.addEventListener('change', changePlayerFilter);
            };
            $(document).ready(async function () {
                $("#playerSearch").on("input", function (e) {
                    let playHist = document.getElementById("playerHistory")
                    playHist.innerHTML = "";
                    let name = e.target.value;
                    let curHist = currentSortedHistory;
                    let combinedArray = [];
                    let typeFilter = document.querySelector('input[name="btnradioPlFilter"]:checked').id.replace('btnradio', '');
                    curHist = curHist.filter(u => u.playerInfo.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
                    let sortedHistory;
                    if (name !== "") {
                        sortedHistory = curHist;
                    } else {
                        sortedHistory = currentSortedHistory;
                    }
                    let temps = ``;
                    for (var i = 0; i < sortedHistory.length; i++) {
                        let searchType;
                        if (typeFilter === 'Offi3') {
                            combinedArray = [...sortedHistory[i].officials.wins.tourneys, ...sortedHistory[i].officials.loss.tourneys];
                            searchType = sortedHistory[i].officials;
                        } else {
                            combinedArray = [...sortedHistory[i].community.wins.tourneys, ...sortedHistory[i].community.loss.tourneys];
                            searchType = sortedHistory[i].community
                        };
                        if (searchType.wins.tourneys.length + searchType.loss.tourneys.length !== 0) {
                            let oppImg = '';
                            if (sortedHistory[i].playerInfo.images.length !== 0 && sortedHistory[i].playerInfo.images.some(x => x.type.toLowerCase() == "profile")) {
                                for (var t = 0; t < sortedHistory[i].playerInfo.images.length; t++) {
                                    if (sortedHistory[i].playerInfo.images[t].type === "profile") {
                                        oppImg = `
                            <a class="playerImg1 mt-2 ms-1 mb-2" style="width: 128px; height: 128px;">
                                <img alt="${sortedHistory[i].playerInfo.name}" src="${sortedHistory[i].playerInfo.images[t].url}" class="playerImg2">
                            </a>`
                                    };
                                }
                            } else {
                                oppImg = `<div class="playerImg1 mt-2 ms-1 mb-2" style="width: 128px; height: 128px; font-size:3rem;"><div class="playerLetter">${sortedHistory[i].playerInfo.name.charAt(0)}</div></div>`
                            };

                            temps += `
                <div class="card border-secondary text-bg-dark mb-3">
                    <div class="row g-0">
                        <div class="col-md-4 me-2 justify-content-center" style="width: 30%">
                            ${oppImg}
                        </div>
                        <div class="col-md-8 me-2" style="width: 66%">
                            <div class="card-body" style="padding: 0.5rem 0rem 0rem 1rem; text-align:center">
                                <span class="mui-thceyd-header20" style="font-size: 1.8rem">${sortedHistory[i].playerInfo.name}</span>
                                <hr style="margin: 0.3rem 0;">
                                <div class="d-flex justify-content-center">
                                    <div>
                                        <h3>Sets</h3>
                                        <text style="font-size: 22; color: #7ab15b">${searchType.wins.total} Wins</text><text style="opacity: 0">••</text><text style="font-size: 22; color: #d62c43">Losses ${searchType.loss.total}</text><text style="opacity: 0">••</text><text style="font-size:18">${(((searchType.wins.total+searchType.loss.total) > 0) ? (100 * searchType.wins.total / (searchType.wins.total+searchType.loss.total)).toFixed(1) : 0)}% WR</text>
                                        <h3>Games</h3>
                                        <text style="font-size: 22; color: #7ab15b">${searchType.setWins} Wins</text><text style="opacity: 0">••</text><text style="font-size: 22; color: #d62c43">Losses ${searchType.setLoss}</text><text style="opacity: 0">••</text><text style="font-size:18">${(((searchType.setWins+searchType.setLoss) > 0) ? (100 * searchType.setWins / (searchType.setWins+searchType.setLoss)).toFixed(1) : 0)}% WR</text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="btn btn-outline-info mt-1" style="width:100%" onclick="loadPlayerHistory(${sortedHistory[i].smashId})">Load History</a>
                </div>`
                        }
                    };
                    playHist.innerHTML = temps;
                });
            });
        }

    } else if (type === "Other") {

        if (otherTab.innerHTML.includes(`<h1 style="text-align: center">loading . . .</h1>`)) {
            otherTab.innerHTML = `
            <div>
                <h1 style="text-align: center">in development</h1>
            </div>`
        }
    } else if (type === "Team") {
        otherTab.innerHTML = `
        <div>
            <h1 style="text-align: center">in development</h1>
        </div>`
    }
};

function changePlayerFilter1(type) {
    if (type === "Offi3") {
        let playHist = document.getElementById("playerHistory");
        playHist.innerHTML = "";
        let sortedHistory = currentSortedHistory;
        sortedHistory = sortedHistory.sort((a, b) => (b.officials.setWins + b.officials.setLoss) - (a.officials.setWins + a.officials.setLoss));
        let temps = ``;
        let totalGames = [0, 0];
        let totalWins = [
            [0, 0], // set wins; [0] off [1] comm
            [0, 0] // game wins; [0] off [1] comm
        ];
        let totalLoss = [
            [0, 0], // set wins; [0] off [1] comm
            [0, 0] // game wins; [0] off [1] comm
        ];
        for (var i = 0; i < sortedHistory.length; i++) {
            if (sortedHistory[i].officials.wins.tourneys.length + sortedHistory[i].officials.loss.tourneys.length !== 0) {
                totalGames[0] += sortedHistory[i].officials.games;
                totalGames[1] += sortedHistory[i].community.games;
                totalWins[0][0] += sortedHistory[i].officials.wins.total;
                totalWins[1][0] += sortedHistory[i].officials.setWins;
                totalWins[0][1] += sortedHistory[i].community.wins.total;
                totalWins[1][1] += sortedHistory[i].community.setWins;
                totalLoss[0][0] += sortedHistory[i].officials.loss.total;
                totalLoss[1][0] += sortedHistory[i].officials.setLoss;
                totalLoss[0][1] += sortedHistory[i].community.loss.total;
                totalLoss[1][1] += sortedHistory[i].community.setLoss;
                let oppImg = '';

                if (sortedHistory[i].playerInfo.images.length !== 0 && sortedHistory[i].playerInfo.images.some(x => x.type.toLowerCase() == "profile")) {
                    for (var t = 0; t < sortedHistory[i].playerInfo.images.length; t++) {
                        if (sortedHistory[i].playerInfo.images[t].type === "profile") {
                            oppImg = `
                <a class="playerImg1 mt-2 ms-1 mb-2" style="width: 128px; height: 128px; margin-right:unset">
                    <img alt="${sortedHistory[i].playerInfo.name}" src="${sortedHistory[i].playerInfo.images[t].url}" class="playerImg2">
                </a>`
                        };
                    }
                } else {
                    oppImg = `<div class="playerImg1 mt-2 ms-1 mb-2" style="width: 128px; height: 128px; font-size:3rem; margin-right:unset"><div class="playerLetter">${sortedHistory[i].playerInfo.name.charAt(0)}</div></div>`
                };

                temps += `
    <div class="card border-secondary text-bg-dark mb-3">
        <div class="row g-0">
            <div class="col-md-4 me-2 justify-content-center" style="width: 30%">
                ${oppImg}
            </div>
            <div class="col-md-8 me-2" style="width: 66%">
                <div class="card-body" style="padding: 0.5rem 0rem 0rem 1rem; text-align:center">
                    <span class="mui-thceyd-header20" style="font-size: 1.8rem"> ${sortedHistory[i].playerInfo.name}</span>
                    <hr style="margin: 0.3rem 0;">
                    <div class="d-flex justify-content-center">
                        <div>
                            <h3>Sets</h3>
                            <text style="font-size: 22; color: #7ab15b">${sortedHistory[i].officials.wins.total} Wins</text><text style="opacity: 0">••</text><text style="font-size: 22; color: #d62c43">Losses ${sortedHistory[i].officials.loss.total}</text><text style="opacity: 0">••</text><text style="font-size:18">${(((sortedHistory[i].officials.wins.total+sortedHistory[i].officials.loss.total) > 0) ? (100 * sortedHistory[i].officials.wins.total / (sortedHistory[i].officials.wins.total+sortedHistory[i].officials.loss.total)).toFixed(1) : 0)}% WR</text>
                            <h3>Games</h3>
                            <text style="font-size: 22; color: #7ab15b">${sortedHistory[i].officials.setWins} Wins</text><text style="opacity: 0">••</text><text style="font-size: 22; color: #d62c43">Losses ${sortedHistory[i].officials.setLoss}</text><text style="opacity: 0">••</text><text style="font-size:18">${(((sortedHistory[i].officials.setWins+sortedHistory[i].officials.setLoss) > 0) ? (100 * sortedHistory[i].officials.setWins / (sortedHistory[i].officials.setWins+sortedHistory[i].officials.setLoss)).toFixed(1) : 0)}% WR</text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a href="javascript:void(0)" class="btn btn-outline-info mt-1" style="width:100%" onclick="loadPlayerHistory(${sortedHistory[i].smashId})">Load History</a>
    </div>`
            }
        };
        let tempdd = document.getElementById("playedStats");
        tempdd.innerHTML = `
            <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                <li class="nav-item px-4">
                    <h4 style="color: #7ab15b">Total Wins</h4>
                    <p style="font-size: 20">Sets: ${totalWins[0][0]}<text style="opacity: 0">  •  </text>Games: ${totalWins[1][0]}</p>
                </li>
                <div class="vr"></div>
                <li class="nav-item px-4">
                    <h4 style="color: #d62c43">Total Losses</h4>
                    <p style="font-size: 20">Sets: ${totalLoss[0][0]}<text style="opacity: 0">  •  </text>Games: ${totalLoss[1][0]}</p>
                </li>
            </ul>`
        playHist.innerHTML = temps;
    } else {
        let playHist = document.getElementById("playerHistory")
        playHist.innerHTML = "";

        let sortedHistory = currentSortedHistory;
        sortedHistory = sortedHistory.sort((a, b) => (b.community.setWins + b.community.setLoss) - (a.community.setWins + a.community.setLoss));
        let temps = ``;
        let totalGames = [0, 0];
        let totalWins = [
            [0, 0], // set wins; [0] off [1] comm
            [0, 0] // game wins; [0] off [1] comm
        ];
        let totalLoss = [
            [0, 0], // set wins; [0] off [1] comm
            [0, 0] // game wins; [0] off [1] comm
        ];
        for (var i = 0; i < sortedHistory.length; i++) {
            if (sortedHistory[i].community.wins.tourneys.length + sortedHistory[i].community.loss.tourneys.length !== 0) {
                totalGames[0] += sortedHistory[i].officials.games;
                totalGames[1] += sortedHistory[i].community.games;
                totalWins[0][0] += sortedHistory[i].officials.wins.total;
                totalWins[1][0] += sortedHistory[i].officials.setWins;
                totalWins[0][1] += sortedHistory[i].community.wins.total;
                totalWins[1][1] += sortedHistory[i].community.setWins;
                totalLoss[0][0] += sortedHistory[i].officials.loss.total;
                totalLoss[1][0] += sortedHistory[i].officials.setLoss;
                totalLoss[0][1] += sortedHistory[i].community.loss.total;
                totalLoss[1][1] += sortedHistory[i].community.setLoss;
                let oppImg = '';

                if (sortedHistory[i].playerInfo.images.length !== 0 && sortedHistory[i].playerInfo.images.some(x => x.type.toLowerCase() == "profile")) {
                    for (var t = 0; t < sortedHistory[i].playerInfo.images.length; t++) {
                        if (sortedHistory[i].playerInfo.images[t].type === "profile") {
                            oppImg = `
                <a class="playerImg1 mt-2 ms-1 mb-2" style="width: 128px; height: 128px; margin-right:unset">
                    <img alt="${sortedHistory[i].playerInfo.name}" src="${sortedHistory[i].playerInfo.images[t].url}" class="playerImg2">
                </a>`
                        };
                    }
                } else {
                    oppImg = `<div class="playerImg1 mt-2 ms-1 mb-2" style="width: 128px; height: 128px; font-size:3rem; margin-right:unset"><div class="playerLetter">${sortedHistory[i].playerInfo.name.charAt(0)}</div></div>`
                };

                temps += `
    <div class="card border-secondary text-bg-dark mb-3">
        <div class="row g-0">
            <div class="col-md-4 me-2 justify-content-center" style="width: 30%">
                ${oppImg}
            </div>
            <div class="col-md-8 me-2" style="width: 66%">
                <div class="card-body" style="padding: 0.5rem 0rem 0rem 1rem; text-align:center">
                    <span class="mui-thceyd-header20" style="font-size: 1.8rem"> ${sortedHistory[i].playerInfo.name}</span>
                    <hr style="margin: 0.3rem 0;">
                    <div class="d-flex justify-content-center">
                        <div>
                            <h3>Sets</h3>
                            <text style="font-size: 22; color: #7ab15b">${sortedHistory[i].community.wins.total} Wins</text><text style="opacity: 0">••</text><text style="font-size: 22; color: #d62c43">Losses ${sortedHistory[i].community.loss.total}</text><text style="opacity: 0">••</text><text style="font-size:18">${(((sortedHistory[i].community.wins.total+sortedHistory[i].community.loss.total) > 0) ? (100 * sortedHistory[i].community.wins.total / (sortedHistory[i].community.wins.total+sortedHistory[i].community.loss.total)).toFixed(1) : 0)}% WR</text>
                            <h3>Games</h3>
                            <text style="font-size: 22; color: #7ab15b">${sortedHistory[i].community.setWins} Wins</text><text style="opacity: 0">••</text><text style="font-size: 22; color: #d62c43">Losses ${sortedHistory[i].community.setLoss}</text><text style="opacity: 0">••</text><text style="font-size:18">${(((sortedHistory[i].community.setWins+sortedHistory[i].community.setLoss) > 0) ? (100 * sortedHistory[i].community.setWins / (sortedHistory[i].community.setWins+sortedHistory[i].community.setLoss)).toFixed(1) : 0)}% WR</text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a href="javascript:void(0)" class="btn btn-outline-info mt-1" style="width:100%" onclick="loadPlayerHistory(${sortedHistory[i].smashId})">Load History</a>
    </div>`
            }
        };
        let tempdd = document.getElementById("playedStats");
        tempdd.innerHTML = `
            <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                <li class="nav-item px-4">
                    <h4 style="color: #7ab15b">Total Wins</h4>
                    <p style="font-size: 20">Sets: ${totalWins[0][1]}<text style="opacity: 0">  •  </text>Games: ${totalWins[1][1]}</p>
                </li>
                <div class="vr"></div>
                <li class="nav-item px-4">
                    <h4 style="color: #d62c43">Total Losses</h4>
                    <p style="font-size: 20">Sets: ${totalLoss[0][1]}<text style="opacity: 0">  •  </text>Games: ${totalLoss[1][1]}</p>
                </li>
            </ul>`
        playHist.innerHTML = temps;
    }
};

function loadPlayerHistory(playerId) {
    let loadedDiv = document.getElementById("loadedHistory");
    loadedDiv.innerHTML = "";
    let curFiltered = currentSortedHistory.filter(u => u.smashId === playerId)[0];
    let combinedArray = [];
    let typeFilter = document.querySelector('input[name="btnradioPlFilter"]:checked').id.replace('btnradio', '');
    if (typeFilter === 'Offi3') {
        combinedArray = [...curFiltered.officials.wins.tourneys, ...curFiltered.officials.loss.tourneys]
    } else {
        combinedArray = [...curFiltered.community.wins.tourneys, ...curFiltered.community.loss.tourneys]
    };
    combinedArray.sort((a, b) => b.setInfo.completedAt - a.setInfo.completedAt)
    let tempData = ``;
    for (var i = 0; i < combinedArray.length; i++) {
        let tempTourneyData = bigTourney[combinedArray[i].tourney];
        let selfScore = combinedArray[i].setInfo.slots.filter(u => u.standing.entrant.participants[0].user.id !== playerId)[0].standing.stats.score.value;
        let oppScore = combinedArray[i].setInfo.slots.filter(u => u.standing.entrant.participants[0].user.id === playerId)[0].standing.stats.score.value;
        let fullSco = '';
        if (selfScore < oppScore) {
            fullSco = `color:#d62c43">LOSS`
        } else {
            fullSco = `color:#7ab15b">WIN`
        };
        let e = '';
        if (fullSco.includes("LOSS")) {
            e = "#d62c43"
        } else {
            e = "#7ab15b"
        }
        var setTitle = '';
        if (combinedArray[i].setInfo.phaseGroup.phase.name === "Bracket" || combinedArray[i].setInfo.phaseGroup.phase.name === "Pools") {
            setTitle += `${combinedArray[i].setInfo.phaseGroup.phase.name} ${combinedArray[i].setInfo.phaseGroup.displayIdentifier}`
        } else {
            setTitle += `${combinedArray[i].setInfo.phaseGroup.phase.name}`
        };
        let tempImga = ""
        if (tempTourneyData.images.length === 0) {
            tempImga = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Feather-core-calendar.svg/1024px-Feather-core-calendar.svg.png" style="filter: invert(1);" class="img-fluid rounded-start pb-1" alt="${tempTourneyData.event.tournament.name}">
            <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadSetData(${playerId}, ${i})">Load Set Data</a>`
        } else {
            tempImga = `
            <img src="${tempTourneyData.images.filter(u=>u.type === "profile")[0].url}" class="img-fluid rounded-start pb-1" alt="${tempTourneyData.event.tournament.name}">
            <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadSetData(${playerId}, ${i})">Load Set Data</a>`
        }
        // Set Length: ${getMatchLength(combinedArray[i].setInfo.completedAt - combinedArray[i].setInfo.startedAt)}
        tempData += `
            <div class="card border-secondary text-bg-dark mb-3" style="text-align: center">
                <div class="row g-0">
                    <div class="col-md-4">
                        ${tempImga}
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <span>
                                <span class="tss-zapqqm-body16" style="font-size:1.5em">${tempTourneyData.event.tournament.name}</span>
                                <p class="card-text text-muted" style="font-size: 1.1rem; margin: unset">${getCreation(combinedArray[i].setInfo.completedAt)}</p>
                            </span>
                            <hr style="margin: 0.3rem 0;">
                            <text style="font-size: 1rem"></text>
                            <h3 class="card-text" style="font-size: 1.4rem">${setTitle} • ${combinedArray[i].setInfo.fullRoundText}</h3>
                            <span style="font-size:1.4rem; ${fullSco}</span>
                            <p class="card-text" style="font-size:1.4rem; color:${e}; margin: unset">${selfScore} W • L ${oppScore}</p>
                        </div>
                    </div>
                </div>
            </div>`
    };
    loadedDiv.innerHTML = `
        <div class="/*ms-auto*/ ms-2" style="overflow: auto; max-width:560px; height: 843px;">
            ${tempData}
        </div>`
};

function loadSetData(playerId, tourneyNum) {
    let curFiltered = currentSortedHistory.filter(u => u.smashId === playerId)[0];
    let combinedArray = [];
    let typeFilter = document.querySelector('input[name="btnradioPlFilter"]:checked').id.replace('btnradio', '');
    if (typeFilter === 'Offi3') {
        combinedArray = [...curFiltered.officials.wins.tourneys, ...curFiltered.officials.loss.tourneys]
    } else {
        combinedArray = [...curFiltered.community.wins.tourneys, ...curFiltered.community.loss.tourneys]
    };
    combinedArray.sort((a, b) => b.setInfo.completedAt - a.setInfo.completedAt)
    combinedArray = combinedArray[tourneyNum].setInfo;

    let tourney = document.getElementById("setHistory");
    tourney.innerHTML = "";
    if (combinedArray.phaseGroup.phase.name === "Bracket" || combinedArray.phaseGroup.phase.name === "Pools") {
        tourney.innerHTML += `
            <div style="text-align: center">
                <h3>${combinedArray.phaseGroup.phase.name} ${combinedArray.phaseGroup.displayIdentifier}</h3>
                <h4>${combinedArray.fullRoundText}</h4>
                <h6>${getMatchLength(combinedArray.completedAt - combinedArray.startedAt)}</h6>
            </div>
            <br/>`
    } else {
        tourney.innerHTML += `
            <div style="text-align: center">
                <h3>${combinedArray.phaseGroup.phase.name}</h3>
                <h4>${combinedArray.fullRoundText}</h4>
                <h6>${getMatchLength(combinedArray.completedAt - combinedArray.startedAt)}</h6>
            </div>
            <br/>`
    };
    let self = combinedArray.slots.filter(u => u.standing.entrant.participants[0].user.id !== playerId)[0];
    let opponent = combinedArray.slots.filter(u => u.standing.entrant.participants[0].user.id === playerId)[0];
    let tempRo = ''
    tempRo += `<div class="container" style="text-align: center"><div class="row row-cols-3" style="--bs-gutter-x: 0rem;">`
    if (combinedArray.games !== null) {
        let setTitle = [{
            name: self.standing.entrant.name,
            score: self.standing.stats.score.value
        }, {
            name: opponent.standing.entrant.name,
            score: opponent.standing.stats.score.value
        }];
        if (self.seed === 1) {
            setTitle[1] = {
                name: self.standing.entrant.name,
                score: self.standing.stats.score.value
            }
        }
        if (opponent.seed === 0) {
            setTitle[0] = {
                name: opponent.standing.entrant.name,
                score: opponent.standing.stats.score.value
            }
        };
        tempRo += `
            <h3 class="col pb-3">${setTitle[0].name.replace(" / ", " /<br>")}</h3>
            <h3 class="col pb-3">${setTitle[0].score}<text style="opacity: 0"> • </text>${setTitle[1].score}</h3>
            <h3 class="col pb-3">${setTitle[1].name.replace(" / ", " /<br>")}</h3>
        `;
        for (var i = 0; i < combinedArray.games.length; i++) {
            let selfSet = '';
            let oppSet = '';
            let selfChar = '';
            let oppChar = '';
            let stage = '';
            if (combinedArray.games[i].stage !== null) {
                stage = `<div class="col mb-2"><h4>Game ${i+1}</h4>${combinedArray.games[i].stage.name}</div>`
            } else {
                stage = `<div class="col mb-2"><h4>Game ${i+1}</h4>No Stage</div>`
            };
            if (combinedArray.games[i].selections !== null) {
                for (var s = 0; s < combinedArray.games[i].selections.length; s++) {
                    let image = char[combinedArray.games[i].selections[s].selectionValue].images.filter(u => u.type == "icon");
                    if (combinedArray.games[i].selections[s].entrant.name === self.standing.entrant.name) {
                        selfChar = `<img src=${image[0].url} width="40" height="40"></img>`;
                    } else if (combinedArray.games[i].selections[s].entrant.name !== self.standing.entrant.name) {
                        oppChar = `<img src=${image[0].url} width="40" height="40"></img>`;
                    }
                };
                if (self.seed.seedNum > opponent.seed.seedNum) {
                    if (combinedArray.games[i].winnerId === self.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">${selfChar}<text style="opacity: 0">•</text>W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                    } else if (combinedArray.games[i].winnerId !== self.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">${selfChar}<text style="opacity: 0">•</text>L</h4></div>`;
                    }
                } else if (self.seed.seedNum < opponent.seed.seedNum) {
                    if (combinedArray.games[i].winnerId !== self.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">${selfChar}<text style="opacity: 0">•</text>L</h4></div>`;
                    } else if (combinedArray.games[i].winnerId === self.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">${selfChar}<text style="opacity: 0">•</text>W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                    }
                }
                tempRo += `${selfSet}${stage}${oppSet}`
            } else {
                if (self.seed.seedNum > opponent.seed.seedNum) {
                    if (combinedArray.games[i].winnerId === self.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">${selfChar}<text style="opacity: 0">•</text>W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                    } else if (combinedArray.games[i].winnerId !== self.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">${selfChar}<text style="opacity: 0">•</text>L</h4></div>`;
                    }
                } else if (self.seed.seedNum < opponent.seed.seedNum) {
                    if (combinedArray.games[i].winnerId === self.standing.entrant.id) {
                        oppSet += `<div class="col"><h4 style="color: #7ab15b">W<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                        selfSet += `<div class="col"><h4 style="color: #d62c43">${selfChar}<text style="opacity: 0">•</text>L</h4></div>`;
                    } else if (combinedArray.games[i].winnerId !== self.standing.entrant.id) {
                        selfSet += `<div class="col"><h4 style="color: #7ab15b">${selfChar}<text style="opacity: 0">•</text>W</h4></div>`;
                        oppSet += `<div class="col"><h4 style="color: #d62c43">L<text style="opacity: 0">•</text>${oppChar}</h4></div>`;
                    }
                }
                tempRo += `${selfSet}${stage}${oppSet}`
            }
        }
        tempRo += `</div></div>`
        tourney.innerHTML += tempRo
    } else {
        tourney.innerHTML += "<h5>No game data was reported for this set</h5>"
    }
};

async function changeViewType(type) {
    type = type.target.id.replace("btnradio", '')
    if (type === "Change1") {
        loadTourneyData(curTourn[0], curTourn[1], curTourn[2])
    } else {
        var tourney = document.getElementById('mainTourneyContent');
        tourney.innerHTML = "";
        let stages = {};
        let chars = {};
        let upsets = [];
        let lossLower = [];
        let userData = userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data;
        for (var i in phaseData) {
            for (var d = 0; d < phaseData[i].sets.length; d++) {
                if (phaseData[i].sets[d].games !== null) {
                    for (var g = 0; g < phaseData[i].sets[d].games.length; g++) {
                        if (phaseData[i].sets[d].games[g].stage !== null) {
                            if (stages[phaseData[i].sets[d].games[g].stage.name]) {
                                stages[phaseData[i].sets[d].games[g].stage.name].games++
                            } else {
                                stages[phaseData[i].sets[d].games[g].stage.name] = {
                                    games: 1
                                }
                            }
                        };
                        if (phaseData[i].sets[d].games[g].selections !== null) {
                            let te = phaseData[i].sets[d].games[g].selections.filter(u => u.entrant.name === phaseData[i].sets[d].self.name);
                            if (te.length !== 0) {
                                if (chars[te[0].selectionValue]) {
                                    chars[te[0].selectionValue].games++
                                } else {
                                    chars[te[0].selectionValue] = {
                                        games: 1
                                    }
                                }
                            }
                        }
                    }
                }
            };
        };
        for (var i = 0; i < userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.wonAgainst.length; i++) {
            let setInfo = [];
            for (var f in phaseData) {
                for (var g = 0; g < phaseData[f].sets.length; g++) {
                    if (phaseData[f].sets[g].opponent.name === userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.wonAgainst[i].name && phaseData[f].sets[g].winner === userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.entity && userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.seed > userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.wonAgainst[i].seed) {
                        let tempd = upsets.filter(u => u.data.completedAt == phaseData[f].sets[g].completedAt);
                        if (tempd.length === 0) {
                            let playerL;
                            if (phaseData[f].sets[g].opponent.data.length === 2) {
                                playerL = await fetch(`https://saorax-pl.github.io/players/pl/${phaseData[f].sets[g].opponent.data[0].id}.json`, {
                                    "headers": {
                                        "accept": "*/*",
                                        "accept-language": "en-US,en;q=0.9",
                                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Opera GX\";v=\"84\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-ch-ua-platform": "\"Windows\"",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "none"
                                    },
                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                    "body": null,
                                    "method": "GET",
                                    "mode": "cors",
                                    "credentials": "omit"
                                }).then(res => res.json()).catch(err => {
                                    console.log(err);
                                });
                                if (isOffline === true) {
                                    playerL = await fetch(`http://localhost:3000/main.php?type=user&user=${phaseData[f].sets[g].opponent.data[0].id}`, {
                                        "method": "GET",
                                    }).then(res => res.json()).catch(err => {
                                        console.log(err);
                                    });
                                }
                            } else {
                                playerL = await fetch(`https://saorax-pl.github.io/players/pl/${phaseData[f].sets[g].opponent.data.id}.json`, {
                                    "headers": {
                                        "accept": "*/*",
                                        "accept-language": "en-US,en;q=0.9",
                                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Opera GX\";v=\"84\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-ch-ua-platform": "\"Windows\"",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "none"
                                    },
                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                    "body": null,
                                    "method": "GET",
                                    "mode": "cors",
                                    "credentials": "omit"
                                }).then(res => res.json()).catch(err => {
                                    console.log(err);
                                });
                                if (isOffline === true) {
                                    playerL = await fetch(`http://localhost:3000/main.php?type=user&user=${phaseData[f].sets[g].opponent.data.id}`, {
                                        "method": "GET",
                                    }).then(res => res.json()).catch(err => {
                                        console.log(err);
                                    });
                                }
                            }
                            let oppSeed = 0;
                            for (var v in playerL.tourneys) {
                                for (var b = 0; b < playerL.tourneys[v].length; b++) {
                                    let gba = playerL.tourneys[v][b].filter(u => u.tourney_id === userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].tourney_id)
                                    if (gba.length !== 0) {
                                        oppSeed = gba[0].data.main.seed
                                    }
                                }
                            }
                            upsets.push({
                                data: phaseData[f].sets[g],
                                bracket: f,
                                seed: oppSeed,
                                name: userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.wonAgainst[i].name
                            });
                        }
                    };
                }
            }
        }
        if (userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.loss !== null) {
            for (var i = 0; i < userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.loss.length; i++) {
                for (var f in phaseData) {
                    for (var g = 0; g < phaseData[f].sets.length; g++) {
                        if (phaseData[f].sets[g].opponent.name === userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.loss[i].name && phaseData[f].sets[g].winner !== userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.entity) {
                            let playerL;
                            if (phaseData[f].sets[g].opponent.data.length === 2) {
                                playerL = await fetch(`https://saorax-pl.github.io/players/pl/${phaseData[f].sets[g].opponent.data[0].id}.json`, {
                                    "headers": {
                                        "accept": "*/*",
                                        "accept-language": "en-US,en;q=0.9",
                                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Opera GX\";v=\"84\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-ch-ua-platform": "\"Windows\"",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "none"
                                    },
                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                    "body": null,
                                    "method": "GET",
                                    "mode": "cors",
                                    "credentials": "omit"
                                }).then(res => res.json()).catch(err => {
                                    console.log(err);
                                });
                                if (isOffline === true) {
                                    playerL = await fetch(`http://localhost:3000/main.php?type=user&user=${phaseData[f].sets[g].opponent.data[0].id}`, {
                                        "method": "GET",
                                    }).then(res => res.json()).catch(err => {
                                        console.log(err);
                                    });
                                }
                            } else {
                                playerL = await fetch(`https://saorax-pl.github.io/players/pl/${phaseData[f].sets[g].opponent.data.id}.json`, {
                                    "headers": {
                                        "accept": "*/*",
                                        "accept-language": "en-US,en;q=0.9",
                                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Opera GX\";v=\"84\"",
                                        "sec-ch-ua-mobile": "?0",
                                        "sec-ch-ua-platform": "\"Windows\"",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "none"
                                    },
                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                    "body": null,
                                    "method": "GET",
                                    "mode": "cors",
                                    "credentials": "omit"
                                }).then(res => res.json()).catch(err => {
                                    console.log(err);
                                });
                                if (isOffline === true) {
                                    playerL = await fetch(`http://localhost:3000/main.php?type=user&user=${phaseData[f].sets[g].opponent.data.id}`, {
                                        "method": "GET",
                                    }).then(res => res.json()).catch(err => {
                                        console.log(err);
                                    });
                                }
                            }

                            let oppSeed = 0;
                            for (var v in playerL.tourneys) {
                                for (var b = 0; b < playerL.tourneys[v].length; b++) {
                                    let gba = playerL.tourneys[v][b].filter(u => u.tourney_id === userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].tourney_id)
                                    if (gba.length !== 0) {
                                        oppSeed = gba[0].data.main.seed
                                    }
                                }
                            }
                            if (oppSeed > userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.seed) {
                                let tempd = lossLower.filter(u => u.data.completedAt == phaseData[f].sets[g].completedAt);
                                if (tempd.length === 0) {
                                    lossLower.push({
                                        data: phaseData[f].sets[g],
                                        bracket: f,
                                        seed: oppSeed,
                                        name: userTourneyData[curTourn[0]][curTourn[1]][curTourn[2]].data.main.loss[i].name
                                    });
                                }
                            }
                        };
                    }
                }
            }
        }
        upsets = upsets.sort((a, b) => a.data.completedAt - b.data.completedAt);
        lossLower = lossLower.sort((a, b) => a.data.completedAt - b.data.completedAt);
        let teNum = 6;
        let tempsss = [];
        let upsetsHtml = '';
        let lossHtml = '';

        for (var i = 0; i < upsets.length; i++) {
            let oppImg = '';
            let resuColor;
            let tempImg = [];
            if (curTourn[1] === 1) {
                for (var g = 0; g < upsets[i].data.opponent.data.length; g++) {
                    if (upsets[i].data.opponent.data[g].images.length !== 0 && upsets[i].data.opponent.data[g].images.some(x => x.type.toLowerCase() == "profile")) {
                        for (var t = 0; t < upsets[i].data.opponent.data[g].images.length; t++) {
                            if (upsets[i].data.opponent.data[g].images[t].type === "profile") {
                                tempImg[g] = {
                                    name: upsets[i].data.opponent.data[g].name,
                                    url: upsets[i].data.opponent.data[g].images[t].url,
                                    letter: false
                                }
                            }
                        }
                    } else {
                        tempImg[g] = {
                            name: upsets[i].data.opponent.data[g].name,
                            letter: true
                        }
                    };
                };
                let temImg = '';
                for (var g = 0; g < tempImg.length; g++) {
                    if (g === 0) {
                        temImg += `<div class="EntrantScore__icon me-2"><div class="Player__avatar-container">`
                    }
                    if (tempImg[g].letter !== true) {
                        temImg += `
                        <div class="Player__avatar profile-thumb" aria-label="${tempImg[g].name}">
                            <img alt="${tempImg[g].name}" src="${tempImg[g].url}" class="playerImg2">
                        </div>`
                    } else {
                        temImg += `
                        <div class="Player__avatar profile-thumb" aria-label="${tempImg[g].name}">
                            <div class="playerLetter">${tempImg[g].name.charAt(0)}</div>
                        </div>`
                    }
                    if (g + 1 === tempImg.length) {
                        temImg += `</div></div>`;
                    }
                }
                oppImg += temImg
            } else {
                if (upsets[i].data.opponent.data.images.length !== 0 && upsets[i].data.opponent.data.images.some(x => x.type.toLowerCase() == "profile")) {
                    for (var t = 0; t < upsets[i].data.opponent.data.images.length; t++) {
                        if (upsets[i].data.opponent.data.images[t].type === "profile") {
                            oppImg = `
                            <a class="playerImg1">
                                <img alt="${upsets[i].data.opponent.name}" src="${upsets[i].data.opponent.data.images[t].url}" class="playerImg2">
                            </a>`
                        };
                    }
                } else {
                    oppImg = `<div class="playerImg1"><div class="playerLetter">${upsets[i].data.opponent.name.charAt(0)}</div></div>`
                };
            }
            if (upsets[i].data.winner !== userData.main.entity) {
                resuColor = "#d62c43";
            } else {
                resuColor = "#7ab15b";
            }
            let scoreo;
            if (upsets[i].data.games === null && upsets[i].data.self.slots.standing.stats.score.value === -1 || upsets[i].data.opponent.slots.standing.stats.score.value === -1) {
                scoreo = "DQ -"
            } else {
                let tempWin = upsets[i].data.self.slots.standing.stats.score.value;
                let tempLose = upsets[i].data.opponent.slots.standing.stats.score.value;
                if (tempWin === null) {
                    if (upsets[i].data.winner !== userData.main.entity) {
                        tempWin = "L"
                    } else if (upsets[i].data.winner === userData.main.entity) {
                        tempWin = "W"
                    }
                };
                if (tempLose === null) {
                    if (upsets[i].data.winner !== userData.main.entity) {
                        tempLose = "W"
                    } else if (upsets[i].data.winner === userData.main.entity) {
                        tempLose = "L"
                    }
                }
                scoreo = `${tempWin} - ${tempLose}`
            };

            upsetsHtml += `
            <div class="d-flex py-3">
                <div class="whoIs player align-items-center">
                    <div class="playerData me-2" style="text-align: center">
                        <text style="font-size: calc(1rem + .6vw); color: ${resuColor}">vs</text>
                        <text style="font-size: calc(0.7rem + .6vw);">${scoreo}</text>
                    </div>${oppImg}
                    <div class="playerData" style="max-width: 245px;">
                        <a class="text-light" style="font-size: calc(0.7rem + .6vw); text-decoration: none; color: currentColor!important">${upsets[i].data.opponent.name}</a>
                        <div style="opacity: 0.3" style="font-size: calc(0.5rem + .6vw);"><span class="mui-thceyd-header20" style="font-size: calc(0.5rem + .6vw);">Seed: ${ordinal(upsets[i].seed)}</span></div>
                    </div>
                </div>
            </div>
            `;
            oppImg = '';
        };
        for (var i = 0; i < lossLower.length; i++) {
            let oppImg = '';
            let resuColor;
            let tempImg = [];
            if (curTourn[1] === 1) {
                for (var g = 0; g < lossLower[i].data.opponent.data.length; g++) {
                    if (lossLower[i].data.opponent.data[g].images.length !== 0 && lossLower[i].data.opponent.data[g].images.some(x => x.type.toLowerCase() == "profile")) {
                        for (var t = 0; t < lossLower[i].data.opponent.data[g].images.length; t++) {
                            if (lossLower[i].data.opponent.data[g].images[t].type === "profile") {
                                tempImg[g] = {
                                    name: lossLower[i].data.opponent.data[g].name,
                                    url: lossLower[i].data.opponent.data[g].images[t].url,
                                    letter: false
                                }
                            }
                        }
                    } else {
                        tempImg[g] = {
                            name: lossLower[i].data.opponent.data[g].name,
                            letter: true
                        }
                    };
                };
                let temImg = '';
                for (var g = 0; g < tempImg.length; g++) {
                    if (g === 0) {
                        temImg += `<div class="EntrantScore__icon me-2"><div class="Player__avatar-container">`
                    }
                    if (tempImg[g].letter !== true) {
                        temImg += `
                        <div class="Player__avatar profile-thumb" aria-label="${tempImg[g].name}">
                            <img alt="${tempImg[g].name}" src="${tempImg[g].url}" class="playerImg2">
                        </div>`
                    } else {
                        temImg += `
                        <div class="Player__avatar profile-thumb" aria-label="${tempImg[g].name}">
                            <div class="playerLetter">${tempImg[g].name.charAt(0)}</div>
                        </div>`
                    }
                    if (g + 1 === tempImg.length) {
                        temImg += `</div></div>`;
                    }
                }
                oppImg += temImg
            } else {
                if (lossLower[i].data.opponent.data.images.length !== 0 && lossLower[i].data.opponent.data.images.some(x => x.type.toLowerCase() == "profile")) {
                    for (var t = 0; t < lossLower[i].data.opponent.data.images.length; t++) {
                        if (lossLower[i].data.opponent.data.images[t].type === "profile") {
                            oppImg = `
                            <a class="playerImg1">
                                <img alt="${lossLower[i].data.opponent.name}" src="${lossLower[i].data.opponent.data.images[t].url}" class="playerImg2">
                            </a>`
                        };
                    }
                } else {
                    oppImg = `<div class="playerImg1"><div class="playerLetter">${lossLower[i].data.opponent.name.charAt(0)}</div></div>`
                };
            }
            if (lossLower[i].data.winner !== userData.main.entity) {
                resuColor = "#d62c43";
            } else {
                resuColor = "#7ab15b";
            }
            let scoreo;
            if (lossLower[i].data.games === null && lossLower[i].data.self.slots.standing.stats.score.value === -1 || lossLower[i].data.opponent.slots.standing.stats.score.value === -1) {
                scoreo = "DQ -";
            } else {
                let tempWin = lossLower[i].data.self.slots.standing.stats.score.value;
                let tempLose = lossLower[i].data.opponent.slots.standing.stats.score.value;
                if (tempWin === null) {
                    if (lossLower[i].data.winner !== userData.main.entity) {
                        tempWin = "L"
                    } else if (lossLower[i].data.winner === userData.main.entity) {
                        tempWin = "W"
                    }
                };
                if (tempLose === null) {
                    if (lossLower[i].data.winner !== userData.main.entity) {
                        tempLose = "W"
                    } else if (lossLower[i].data.winner === userData.main.entity) {
                        tempLose = "L"
                    }
                }
                scoreo = `${tempWin} - ${tempLose}`
            }
            lossHtml += `
            <div class="d-flex py-3">
                <div class="whoIs player align-items-center">
                    <div class="playerData me-2" style="text-align: center">
                        <text style="font-size: calc(1rem + .6vw); color: ${resuColor}">vs</text>
                        <text style="font-size: calc(0.7rem + .6vw);">${scoreo}</text>
                    </div>${oppImg}
                    <div class="playerData" style="max-width: 245px;">
                        <a class="text-light" style="font-size: calc(0.7rem + .6vw); text-decoration: none; color: currentColor!important">${lossLower[i].data.opponent.name}</a>
                        <div style="opacity: 0.3" style="font-size: calc(0.5rem + .6vw);"><span class="mui-thceyd-header20" style="font-size: calc(0.5rem + .6vw);">Seed: ${ordinal(lossLower[i].seed)}</span></div>
                    </div>
                </div>
            </div>
            `;
            oppImg = '';
        };
        for (var i in chars) {
            let img = char[i].images.filter(u => u.type === "myIcon2");
            tempsss.push({
                name: char[i].name,
                url: img[0].url,
                id: i,
                games: chars[i].games
            })
        };
        tempsss = tempsss.sort((a, b) => b.games - a.games);
        if (tempsss.length < teNum) {
            teNum = tempsss.length
        }
        let legendsPlayed = '';
        let stagesPlayed = '';
        if (tempsss.length === 0) {
            legendsPlayed += `<text style="font-size: 1.25rem;">No legends reported</text>`
        } else {
            legendsPlayed += `<div class="row row-cols-1 row-cols-md-${teNum}" style="overflow: auto; max-height:369px; --bs-gutter-x:0rem">`;
            for (var i = 0; i < tempsss.length; i++) {
                legendsPlayed += `
            <div class="col" style="padding: unset; width: unset">
                <div class="card text-white" style="border: none; background-color: unset">
                    <img src="${tempsss[i].url}" class="card-img" alt="${tempsss[i].name}" width="128" height="128" style="filter: brightness(30%); background-color: rgb(0,0,0,0.5)">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${tempsss[i].name}</h5>
                        <p class="card-text"></p>
                        <p class="card-text">Games: ${tempsss[i].games}</p>
                    </div>
                </div>
             </div>`
            };
            legendsPlayed += '</div>'
        }
        tempsss = [];
        for (var i in stages) {
            tempsss.push({
                name: i,
                url: `https://saorax.github.io/images/brawlhalla/mapBg/${i.replace(/ /g, "-").toLowerCase()}.jpg`,
                games: stages[i].games
            })
        };
        tempsss = tempsss.sort((a, b) => b.games - a.games);
        teNum = 6
        if (tempsss.length < teNum) {
            teNum = tempsss.length
        }
        if (tempsss.length === 0) {
            stagesPlayed += `<text style="font-size: 1.25rem;">No stages reported</text>`
        } else {
            stagesPlayed += `<div class="row row-cols-1 row-cols-md-${teNum}" style="overflow: auto; max-height:369px; --bs-gutter-x:0rem; width: unset">`;
            for (var i = 0; i < tempsss.length; i++) {
                stagesPlayed += `
            <div class="col" style="padding: unset; width: unset">
                <div class="card text-white" style="border: none;">
                    <img src="${tempsss[i].url}" class="card-img" alt="${tempsss[i].name}" width="128" height="128" style="filter: brightness(30%)">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${tempsss[i].name}</h5>
                        <p class="card-text"></p>
                        <p class="card-text">Games: ${tempsss[i].games}</p>
                    </div>
                </div>
             </div>`
            };
            stagesPlayed += "</div>"
        };
        if (curTourn[1] === 1) {
            tourney.innerHTML = `
            <div>
                <div>
                    <div>
                        <h4>Stages Played</h4>
                        <br>
                        ${stagesPlayed}
                    </div>
                </div>
                <hr>
                <div>
                    <div>
                        <text style="font-size: 1.5rem; font-weight: 500;">Upsets</text>   (wins against higher seed)
                        <br>
                        <div class="container-fluid">
                            <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(22rem, max-content));">
                                ${upsetsHtml}
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div>
                    <div>
                        <text style="font-size: 1.5rem; font-weight: 500;">Reverse Upsets</text>   (losses against lower seed)
                        <br>
                        <div class="container-fluid">
                            <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(22rem, max-content));">
                                ${lossHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        } else {
            tourney.innerHTML = `
            <div>
                <div>
                    <div>
                        <h4>Legends Played</h4>
                        <br>
                        ${legendsPlayed}
                    </div>
                </div>
                <hr>
                <div>
                    <div>
                        <h4>Stages Played</h4>
                        <br>
                        ${stagesPlayed}
                    </div>
                </div>
                <hr>
                <div>
                    <div>
                        <text style="font-size: 1.5rem; font-weight: 500;">Upsets</text>   (wins against higher seed)
                        <br>
                        <div class="container-fluid">
                            <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(22rem, max-content));">
                                ${upsetsHtml}
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div>
                    <div>
                        <text style="font-size: 1.5rem; font-weight: 500;">Reverse Upsets</text>   (losses against lower seed)
                        <br>
                        <div class="container-fluid">
                            <div class="container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(22rem, max-content));">
                                ${lossHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    }
};

function changeSide1(type) {
    var typs = {};
    if (type === "All1") {
        typs = userTourneyData;
    } else if (type === "Offi1") {
        for (var i in userTourneyData) {
            typs[i] = [
                [],
                [],
                []
            ];
            for (var s = 0; s < userTourneyData[i].length; s++) {
                typs[i][s] = userTourneyData[i][s].filter(u => u.type === 0)
            }
        }
    } else if (type === "Comm1") {
        for (var i in userTourneyData) {
            typs[i] = [
                [],
                [],
                []
            ];
            for (var s = 0; s < userTourneyData[i].length; s++) {
                typs[i][s] = userTourneyData[i][s].filter(u => u.type === 1)
            }
        }
    };
    let tops = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
    let totalTour = [0, 0, 0];
    let totalPrize = [0, 0, 0];
    for (var i in typs) {
        totalTour[0] += typs[i][0].length;
        totalTour[1] += typs[i][1].length;
        totalTour[2] += typs[i][2].length;
        for (var t = 0; t < typs[i].length; t++) {
            for (var r = 0; r < typs[i][t].length; r++) {
                if (typs[i][t][r].data.main.prizing !== null && typs[i][t][r].data.main.prizing !== undefined) {
                    //console.log(i, t, r, typs[i][t][r].data.main.prizing)
                    totalPrize[t] += parseInt(typs[i][t][r].data.main.prizing / (t + 1));
                }
                if (typs[i][t][r].data.main.placement === 1) {
                    tops[t][0]++;
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (typs[i][t][r].data.main.placement === 2) {
                    tops[t][1]++;
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (typs[i][t][r].data.main.placement === 3) {
                    tops[t][2]++;
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (typs[i][t][r].data.main.placement <= 8) {
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (typs[i][t][r].data.main.placement <= 32) {
                    tops[t][4]++;
                }
            }
        }
    };
    //console.log(totalTour, totalPrize, tops)
    var earnings = ["earnings_1", "earnings_2", "earnings_3"];
    var ones = ["1v1_1", "1v1_2", "1v1_3", "1v1_4", "1v1_5", "1v1_6"];
    var twos = ["2v2_1", "2v2_2", "2v2_3", "2v2_4", "2v2_5", "2v2_6"];
    document.getElementById(earnings[0]).innerHTML = `${(totalPrize[0]+totalPrize[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    document.getElementById(earnings[1]).innerHTML = `${totalPrize[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    document.getElementById(earnings[2]).innerHTML = `${totalPrize[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    document.getElementById(ones[5]).innerHTML = `${totalTour[0]}`;
    document.getElementById(twos[5]).innerHTML = `${totalTour[1]}`;
    for (var i = 0; i < ones.length - 1; i++) {
        document.getElementById(ones[i]).innerHTML = `${tops[0][i]}`;
        document.getElementById(twos[i]).innerHTML = `${tops[1][i]}`;
    }
};

async function yearButton(e) {
    if (this.checked) {
        await tourneyList(document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', ''))
    }
};

async function modeButton(e) {
    if (this.checked) {
        await tourneyList(document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', ''))
    }
};

function changeSide(e) {
    if (this.checked) {
        changeSide1(document.querySelector('input[name="btnradio4"]:checked').id.replace('btnradio', ''))
    }
};

function changeOther(e) {
    if (this.checked) {
        changeOtherStats(document.querySelector('input[name="btnradioStats"]:checked').id.replace('btnradio', ''))
    }
};
async function changeTourn(e) {
    if (this.checked) {
        await changeViewType(document.querySelector('input[name="btnradioChan"]:checked').id.replace('btnradio', ''))
    }
}
async function changePlayerFilter(e) {
    if (this.checked) {
        await changePlayerFilter1(document.querySelector('input[name="btnradioPlFilter"]:checked').id.replace('btnradio', ''))
    }
}

function getCreation(a) {
    var d = new Date(a * 1000);
    var cMonth = "";
    var cDay = 0;
    var cYear = 0;

    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    cMonth = months[d.getMonth()];
    cDay = d.getDate();
    cYear = d.getFullYear();
    return `${cMonth} ${cDay}, ${cYear}`
};

function getAMPM(a) {
    a = new Date(a * 1000);
    var hours = a.getUTCHours() - 4;
    var minutes = a.getUTCMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};

function getMatchLength(a) {
    a = new Date(a * 1000);
    var minutes = a.getUTCMinutes();
    var seconds = a.getUTCSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var strTime = `${minutes}m ${seconds}s`;
    return strTime;
};

function ordinal(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
};