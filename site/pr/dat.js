let bigTourney;
let char;
let userTourneyData;
let currentPlay;
let phaseData = {};
let radioButtons1;
var playerDiv = document.getElementsByClassName('showPlayers');
var players;
(async () => {
    await getTourneys();
    if (para.get('playerId')) {
        await loadPlayer(para.get("playerId"))
    }
})();

$(document).ready(async function () {
    $("#searchP").on("input", function (e) {
        playerDiv[0].innerHTML = "";
        playerDiv[0].style.display = "grid";
        let name = e.target.value;
        if (name !== "") {
            for (var i in players) {
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
                        //totalTour[2] += players[i].tourneys[p][2].length;
                    };
                    playerDiv[0].innerHTML += `<div style="visibility: visible; transform-origin: 50% 50% 0px;" class="player">
                        ${img}
                        <div class="playerData">
                            <a href="javascript:void(0)" class="nav-link2 link-secondary" onclick="loadPlayer(${players[i].id})">${players[i].name} (${players[i].smash.slug.replace("user/", "")})</a>
                            ${tempAl}
                            <span><strong>${totalTour[0]+totalTour[1]} tournaments played</strong></span>
                            <br>
                        </div>
                        `
                }
            }
        }
    });

});

async function getTourneys() {
    bigTourney = await fetch("./tourneys.json").then(function (response) {
        return response
    }).then(function (data) {
        return data.json()
    }).catch(function (err) {
        console.log('Fetch problem show: ' + err.message);
    });

    players = await fetch("./players.json").then(function (response) {
        return response
    }).then(function (data) {
        return data.json()
    }).catch(function (err) {
        console.log('Fetch problem show: ' + err.message);
    });

    char = await fetch(`https://saorax.github.io/characters.json`, {
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

async function tourneyList(type) {
    let data;
    let typ = ["1v1", "2v2"];
    let temas = [`<hr style="max-width:33%; margin:1rem auto;"/>`, ""]
    var tourneyList = document.getElementById('tourneyList');
    tourneyList.innerHTML = "";
    if (type === "all") {
        for (var i in userTourneyData) {
            let tempData = `<h4 style="text-align:center">${i}</h4>`;
            //data = data.sort((a, b) => a.tourney_id - b.tourney_id);
            if (document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '') !== "Allv") {
                let tema = ``
                if (userTourneyData[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)].length === 0) {
                    tema += "No Tournaments Played"
                }
                tempData += `<h5>${tema}</h5>`;
                userTourneyData[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)] = userTourneyData[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)].sort((a, b) => a.tourney_id - b.tourney_id);
                for (var t = 0; t < userTourneyData[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)].length; t++) {
                    let tourneyId = userTourneyData[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)][t].tourney_id;

                    let tourney = bigTourney[tourneyId];
                    let placement = userTourneyData[i][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)][t].data.main.placement;
                    let images = tourney.images.filter(u => u.type == "profile");
                    tempData +=
                        `<div class="card text-end mb-3 ms-auto">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${images[0].url}" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
                                <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadTourneyData(${i}, ${Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)}, ${t})">Load Data</a>
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
                for (var s = 0; s < userTourneyData[i].length; s++) {
                    let tema = `${typ[s]}`
                    if (userTourneyData[i][s].length === 0) {
                        tema += " - No Tournaments Played"
                    }
                    tempData += `<h5>${tema}</h5>`;
                    userTourneyData[i][s] = userTourneyData[i][s].sort((a, b) => a.tourney_id - b.tourney_id);
                    for (var t = 0; t < userTourneyData[i][s].length; t++) {
                        let tourneyId = userTourneyData[i][s][t].tourney_id;

                        let tourney = bigTourney[tourneyId];
                        let placement = userTourneyData[i][s][t].data.main.placement;
                        let images = tourney.images.filter(u => u.type == "profile");
                        tempData +=
                            `<div class="card text-end mb-3 ms-auto">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${images[0].url}" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
                                <a href="javascript:void(0)" class="btn btn-outline-info" style="width:100%" onclick="loadTourneyData(${i}, ${s}, ${t})">Load Data</a>
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
                    tempData += `${temas[s]}`;
                }
                tempData += `<hr/>`;
                tourneyList.innerHTML += tempData
            }
        }
    } else {
        if (document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '') === "Allv") {
            for (var h = 0; h < userTourneyData[document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')].length; h++) {
                data = userTourneyData[document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')][h]
                let tema = `${typ[h]}`
                if (data.length === 0) {
                    tema += " - No Tournaments Played"
                }
                tourneyList.innerHTML += `<h4 style="text-align:center">${tema}</h4>`;
                data = data.sort((a, b) => a.tourney_id - b.tourney_id);
                for (var i = 0; i < data.length; i++) {
                    let tourney = bigTourney[data[i].tourney_id];
                    let placement = data[i].data.main.placement;
                    let images = tourney.images.filter(u => u.type == "profile");
                    tourneyList.innerHTML +=
                        `<div class="card text-end mb-3 ms-auto">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${images[0].url}" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
                                <a href="javascript:void(0)" class="btn btn-outline-info text-light" style="width:100%; color: currentColor!important" onclick="loadTourneyData(${document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')}, ${h}, ${i})">Load Data</a>
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
                tourneyList.innerHTML += '<hr/>'
            }
        } else {
            data = userTourneyData[document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')][Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)]
            if (data.length === 0) {
                tourneyList.innerHTML = "<h5 style='text-align: center'>No Tournaments Played</h5>"
            };
            data = data.sort((a, b) => a.tourney_id - b.tourney_id);
            for (var i = 0; i < data.length; i++) {
                let tourney = bigTourney[data[i].tourney_id];
                let placement = data[i].data.main.placement;
                let images = tourney.images.filter(u => u.type == "profile");
                tourneyList.innerHTML +=
                    `<div class="card text-end mb-3 ms-auto">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${images[0].url}" class="img-fluid rounded-start pb-1" alt="${tourney.event.tournament.name}">
                            <a href="javascript:void(0)" class="btn btn-outline-info text-light" style="width:100%; color: currentColor!important" onclick="loadTourneyData(${document.querySelector('input[name="btnradio1"]:checked').id.replace('btnradio', '')}, ${Math.max(0, Number.parseInt(document.querySelector('input[name="btnradio2"]:checked').id.replace('btnradio', '').replace('v', '')) - 21)}, ${i})">Load Data</a>
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
                                if (stages[s][tem.games[f].stage.name]) {
                                    stages[s][tem.games[f].stage.name].games++
                                } else {
                                    stages[s][tem.games[f].stage.name] = {
                                        games: 1
                                    }
                                }
                            };
                            if (tem.games[f].selections !== null) {
                                let te = tem.games[f].selections.filter(u => u.entrant.name === playe.name);
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
                    };
                }
            }
        }
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
                url: `https://saorax.github.io/images/brawlhalla/mapBg/${i.replace(/ /g, "-").toLowerCase()}.jpg`,
                games: stages[f][i].games
            })
        };
        teya = teya.sort((a, b) => b.games - a.games);
        if (teya.length < 3) {
            tyNum[1][f] = teya.length
        };
        tempsss.push(teya);
    }
    stages = tempsss;
    return {
        stages: stages,
        legends: chars,
        num: tyNum
    }
};

async function loadCurrentSet(bracket, set) {
    var tourney = document.getElementById('tourneySetContent');
    tourney.innerHTML = "";
    let phaseSet = phaseData[bracket].sets[set];
    if (phaseData[bracket].name === "Bracket" || phaseData[bracket].name === "Pools") {
        tourney.innerHTML += `<div style="text-align: center"><h3>${phaseData[bracket].name} ${phaseData[bracket].display}</h3><h4>${phaseSet.roundText}</h4><h6>${getMatchLength(phaseSet.setLength)}</h6></div><br/>`
    } else {
        tourney.innerHTML += `<div style="text-align: center"><h3>${phaseData[bracket].name}</h3><h4>${phaseSet.roundText}</h4><h6>${getMatchLength(phaseSet.setLength)}</h6></div><br/>`
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
                stage = `<div class="col"><h4>Game ${i+1}</h4>${phaseSet.games[i].stage.name}</div>`
            } else {
                stage = `<div class="col"><h4>Game ${i+1}</h4>No Stage</div>`
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
        if (phaseSet.opponent.slots.standing.stats.score.value === -1) {
            tourney.innerHTML += "<h5>Opponent DQ'd, so there is no game data available</h5>"
        } else {
            tourney.innerHTML += "<h5>User DQ'd, so there is no game data available</h5>"
        }
    }
};

async function loadTourneyData(year, one, two) {
    var tourney = document.getElementById('tourneyContent');
    tourney.innerHTML = "";
    let userData = userTourneyData[year][one][two].data;
    let tourneyData = bigTourney[userTourneyData[year][one][two].tourney_id];
    let images = tourneyData.images.filter(u => u.type == "profile");
    let placementObj = {};
    let payout = 0;
    for (var i = 0; i < tourneyData.prizing.prizing.length; i++) {
        placementObj[tourneyData.prizing.prizing[i].placement] = tourneyData.prizing.prizing[i]
    };
    if (placementObj[userData.main.placement]) {
        if (placementObj[userData.main.placement].amount !== undefined) {
            payout = placementObj[userData.main.placement].amount
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
    ]
    if (one === 0) {
        let wins = 0;
        let loss = 0;
        for (var i = userData.sets.nodes.length - 1; i >= 0; i--) {
            let set = userData.sets.nodes[i]
            let opponent;
            let oppSet = 0;
            let selfSet = 0;
            if (set.games !== null) {
                wins += set.games.filter(u => u.winnerId === userData.main.entity).length;
                loss += set.games.filter(u => u.winnerId !== userData.main.entity).length;
            }
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
        totalGames[0] = [userData.sets.nodes.filter(u => u.winnerId === userData.main.entity).length, userData.sets.nodes.filter(u => u.winnerId !== userData.main.entity).length];
        totalGames[1] = [wins, loss]
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
                if (phaseData[i].sets[s].games === null) {
                    scoreo = "DQ -"
                } else {
                    scoreo = `${phaseData[i].sets[s].self.slots.standing.stats.score.value} - ${phaseData[i].sets[s].opponent.slots.standing.stats.score.value}`
                }
                setData2 += `
            <div class="d-flex py-3">
                <div class="whoIs player align-items-center">
                    <div class="playerData pe-3" style="text-align: center">
                        <text style="font-size: calc(1rem + .6vw); color: ${resuColor}">vs</text>
                        <text style="font-size: calc(0.7rem + .6vw);">${scoreo}</text>
                    </div>${oppImg}
                    <div class="playerData">
                        <a href="javascript:void(0)" onclick="loadCurrentSet('${i}', ${s})" class="text-light" style="font-size: calc(0.7rem + .6vw); text-decoration: none; color: currentColor!important">${phaseData[i].sets[s].opponent.name}</a>
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
        let legendsPlayed = '';
        let stagesPlayed = '';
        let teNum = 3;
        let tempsss = []
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
        if (tempsss.length < 3) {
            teNum = tempsss.length
        }
        for (var i = 0; i < tempsss.length; i++) {
            legendsPlayed += `
            <div class="col" style="padding: unset">
                <div class="card text-white" style="border: none;">
                    <img src="${tempsss[i].url}" class="card-img" alt="${tempsss[i].name}" width="128" height="128" style="filter: brightness(30%); background-color: rgb(0,0,0,0.5)">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${tempsss[i].name}</h5>
                        <p class="card-text"></p>
                        <p class="card-text">Games: ${tempsss[i].games}</p>
                    </div>
                </div>
             </div>`
        };
        tempsss = [];
        for (var i in stages) {
            tempsss.push({
                name: i,
                url: `https://saorax.github.io/images/brawlhalla/mapBg/${i.replace(/ /g, "-").toLowerCase()}.jpg`,
                games: stages[i].games
            })
        };
        tempsss = tempsss.sort((a, b) => b.games - a.games);

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
                    <h4>Legends Played</h4>
                    <br>
                    <div class="row row-cols-1 row-cols-md-${teNum}" style="overflow: auto; max-width: 450px; max-height:369px">
                        ${legendsPlayed}
                    </div>
                </div>
                <div class="ps-5">
                    <h4>Stages Played</h4>
                    <br>
                    <div class="row row-cols-1 row-cols-md-1" style="overflow: auto; max-width: 238px; max-height:369px">
                        ${stagesPlayed}
                    </div>
                </div>
            </div>
            `
    } else {
        let wins = 0;
        let loss = 0;
        for (var i = userData.sets.nodes.length - 1; i >= 0; i--) {
            let set = userData.sets.nodes[i]
            let opponent;
            let oppSet = 0;
            let selfSet = 0;
            if (set.games !== null) {
                wins += set.games.filter(u => u.winnerId === userData.main.entity).length;
                loss += set.games.filter(u => u.winnerId !== userData.main.entity).length;
            }
            for (var s = 0; s < set.slots.length; s++) {
                if (set.slots[s].standing.entrant.id !== userData.main.entity) {
                    if (set.slots[s].standing.entrant.participants[0].user === null) {
                        opponent = {
                            "name": set.slots[s].standing.entrant.name,
                            "images": []
                        }
                        oppSet = s;
                    } else {
                        opponent = [players[set.slots[s].standing.entrant.participants[0].user.id], players[set.slots[s].standing.entrant.participants[1].user.id]];
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
                        image: [players[set.slots[selfSet].standing.entrant.participants[0].user.id].images, players[set.slots[selfSet].standing.entrant.participants[1].user.id].images],
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
        totalGames[0] = [userData.sets.nodes.filter(u => u.winnerId === userData.main.entity).length, userData.sets.nodes.filter(u => u.winnerId !== userData.main.entity).length];
        totalGames[1] = [wins, loss]
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
                            <img alt="TyaTheOlive" src="${tempImg[g].url}" class="playerImg2">
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
                if (phaseData[i].sets[s].games === null) {
                    scoreo = "DQ -"
                } else {
                    scoreo = `${phaseData[i].sets[s].self.slots.standing.stats.score.value} - ${phaseData[i].sets[s].opponent.slots.standing.stats.score.value}`
                }
                setData2 += `
            <div class="d-flex py-3">
                <div class="whoIs player align-items-center">
                    <div class="playerData pe-3" style="text-align: center">
                        <text style="font-size: calc(1rem + .6vw); color: ${resuColor}">vs</text>
                        <text style="font-size: calc(0.7rem + .6vw);">${scoreo}</text>
                    </div>${oppImg}
                    <div class="playerData" style="max-width: 245px;">
                        <a href="javascript:void(0)" onclick="loadCurrentSet('${i}', ${s})" class="text-light" style="font-size: calc(0.7rem + .6vw); text-decoration: none; color: currentColor!important">${phaseData[i].sets[s].opponent.name}</a>
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
            </div>
            `
    }
    tourney.innerHTML += `
    <div class="d-flex">
        <a class="tourneyImg1">
            <img alt="${tourneyData.event.tournament.name}" src="${images[0].url}" class="img-fluid rounded-start pb-1 tourneyImg2">
        </a>
        <div>
            <a href="https://smash.gg/${tourneyData.event.slug}" class="text-light" style="font-size: calc(1.3rem + .6vw); text-decoration: none; color: currentColor!important" rel="noopener noreferrer" target="_blank">${tourneyData.event.tournament.name}</a>
            <h5 style="opacity: 0.9;">${tourneyData.event.name}</h5>
            <span>
                <span class="mui-thceyd-header20">${ordinal(userData.main.placement)}</span><span class="tss-zapqqm-body16">  of ${tourneyData.entrants}</span>
                <text style="opacity: .30"> •  </text>
                <text style="font-size: calc(0.8rem + .6vw)">Seed: </text><text style="font-size: calc(0.6rem + .6vw)">${userData.main.seed}</text>
                <text style="opacity: .30"> •  </text>
                <text style="font-size: calc(0.8rem + .6vw)">Payout: </text><text style="font-size: calc(0.6rem + .6vw)">$ ${payout}</text>
            </span>
        </div>
        <div class="ms-auto">
            <div>
                <h5>Total Sets Played</h5>
                <h5><text style="color: #7ab15b">${totalGames[0][0]} Wins</text><text style="opacity: 0%">  •  </text><text style="color: #d62c43">${totalGames[0][1]} Loss</text></h5>
                <h5>Total Games Played</h5>
                <h5><text style="color: #7ab15b">${totalGames[1][0]} Wins</text><text style="opacity: 0%">  •  </text><text style="color: #d62c43">${totalGames[1][1]} Loss</text></h5>
            </div>
        </div>
    </div>
    <hr/>
    
    <div class="d-flex justify-content-start" style="max-height: 1000px">
        <div class="px-2" style="overflow: auto; max-width:500px;" id="setsList">
            ${setData}
        </div>
        
        <div class="px-3" style="width:720px;">
            <div id="tourneySetContent" class="ms-auto">
                <h3>Load set data from the sets on the left</h3>
            </div>
            <hr/>
            <div id="tourneyData" class="">
                ${totalData}
            </div>
        </div>
    </div>
    `

};

async function loadPlayer(id) {
    var playResu = document.getElementsByClassName('playerResults');
    playResu[0].innerHTML = "";
    playerDiv[0].style.display = "none";
    let play;
    if (currentPlay === undefined) {
        play = await fetch(`https://saorax-api.herokuapp.com/?type=player&id=${id}`, {
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
    } else {
        if (currentPlay.id !== id) {
            play = await fetch(`https://saorax-api.herokuapp.com/?type=player&id=${id}`, {
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
        } else {
            play = currentPlay;
        }
    }
    let img = "";
    if (play.images.length !== 0 && play.images.some(x => x.type
            .toLowerCase() == "profile")) {
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
        }
    }
    for (var i = 0; i < play.auth.length; i++) {
        if (play.auth[i].platform !== "DISCORD") {
            socials +=
                `<a class="pr-10 text-light linkSpan" target="_blank" style="text-decoration: none; color: currentColor!important;" rel="noopener noreferrer" href="${socials2[play.auth[i].platform].url}${play.auth[i].username}">${socials2[play.auth[i].platform].icon} ${play.auth[i].username}</a>`;
        }
    };
    let tops = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
    let totalTour = [0, 0, 0];
    let totalPrize = [0, 0, 0];
    let tourBut = "";
    for (var i in play.tourneys) {
        if (tourBut === "") {
            tourBut += `
            <input type="radio" class="btn-check" name="btnradio1" id="btnradioall" autocomplete="off" checked>
            <label class="btn btn-outline-secondary" for="btnradioall">All</label>
            <input type="radio" class="btn-check" name="btnradio1" id="btnradio${i}" autocomplete="off">
            <label class="btn btn-outline-secondary" for="btnradio${i}">${i}</label>`;
        } else {
            tourBut += `
            <input type="radio" class="btn-check" name="btnradio1" id="btnradio${i}" autocomplete="off">
            <label class="btn btn-outline-secondary" for="btnradio${i}">${i}</label>`;
        }
        totalTour[0] += play.tourneys[i][0].length;
        totalTour[1] += play.tourneys[i][1].length;
        //totalTour[2] += play.tourneys[i][2].length;
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
    SWAP EARNINGS / PLACEMENT TAB ON COMMUNITY / OFFICAL CHANGE
    FILTERED SEARCHING FOR WON / LOST / TEAMED
    TOURNEY SEARCHING DISREGARDS YEAR / MODE FILTER
    SORTING TOURNAMENTS BY PRIZE, AND OTHER STUFF
    TOURNAMENT HISTORY CAN REDIRECT TO PLAYER DATABASE / VICE VERSA
    ADD ALL TOURNAMENTS FILES TO HEROKU
    TRY CARDS FOR TOURNEY LIST ON PLAYER
    ADD OPTION FOR COMBINED TOURNEY DATA ON PLAYER (PLAYED CHARACTERS / STAGES, AVERAGE PLACEMENTS, UPSETS)
    */
    playResu[0].innerHTML += `
    <div class="d-flex justify-content-between">
        <div class="whoIs player">
            ${img}
            <div class="playerData">
                <a href="${play.smash.url}" class="text-light" style="font-size: calc(1.3rem + .6vw); text-decoration: none; color: currentColor!important" rel="noopener noreferrer" target="_blank">${play.name} (${play.smash.slug.replace('user/', '')})</a>
                <h5 style="opacity: 0.5;">${tempAl}</h5>
                <div style="display:flex">${socials}</div>
            </div>
        </div>
        <nav class="flex-column flex-md-center justify-content-between navbar navbar-expand-sm bg-dark navbar-dark" style="border-radius: 0 0 15px 15px ">
            <div class="d-flex justify-content-center">
                <div>
                    <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                        <li class="nav-item px-4">
                            <a href="javascript:void(0)" class="nav-link" draggable="false" aria-current="page" onclick="" style="font-size: 20; padding-bottom: 20px;">
                                Tournament History
                            </a>
                        </li>
                        <div class="vr"></div>
                        <li class="nav-item px-4">
                            <a href="javascript:void(0)" class="nav-link" draggable="false" aria-current="page" onclick="loadOther(${id})" style="font-size: 20; padding-bottom: 20px;">
                                Tournament Statistics
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="px-3">
            <div class="d-flex">
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style="display: inline">
                    ${tourBut}
                </div>
            </div>
            <div class="d-flex pt-1">
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style="display: inline">
                    <input type="radio" class="btn-check" name="btnradio2" id="btnradioAllv" autocomplete="off" checked>
                    <label class="btn btn-outline-primary" for="btnradioAllv">All Tournaments</label>

                    <input type="radio" class="btn-check" name="btnradio2" id="btnradio1v1" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio1v1">1v1 Tournaments</label>

                    <input type="radio" class="btn-check" name="btnradio2" id="btnradio2v2" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio2v2">2v2 Tournaments</label>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="d-flex">
        <div class="px-1" style="width: 19%">
            <div class="playerTour mt-auto" style="text-align: center;">
                <h4>Earnings</h4>
                <div>
                    <h5>$${(totalPrize[0]+totalPrize[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h5>
                </div>
                <div>
                    <strong>1v1</strong>: $${totalPrize[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span><text style="opacity: .30"> • </text><strong>2v2</strong>: $${totalPrize[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
            </div>
            <hr />
            <div class="playerTour mt-auto" style="text-align: center;">
                <h4>1v1 Placements</h4>
                <div>
                    <img src="e2f8f101328a4b4ae7875945716345b3.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[0][0]}</span>
                    <img src="c65da98dd1cd29756d4d5901ed549661.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[0][1]}</span>
                    <img src="9ecf90770f4de9be7b44cb601d49722c.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[0][2]}</span>
                </div>
                <span class="pr-10" style="font-size: 18">Top 8s: ${tops[0][3]}</span>
                <span class="pr-10" style="font-size: 18">Top 32s: ${tops[0][4]}</span>
                <p>${totalTour[0]} tournaments played</p>
            </div>
            <hr />
            <div class="playerTour mt-auto" style="text-align: center;">
                <h4>2v2 Placements</h4>
                <div>
                    <img src="e2f8f101328a4b4ae7875945716345b3.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[1][0]}</span>
                    <img src="c65da98dd1cd29756d4d5901ed549661.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[1][1]}</span>
                    <img src="9ecf90770f4de9be7b44cb601d49722c.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[1][2]}</span>
                </div>
                <span class="pr-10" style="font-size: 18">Top 8s: ${tops[1][3]}</span>
                <span class="pr-10" style="font-size: 18">Top 32s: ${tops[1][4]}</span>
                <p>${totalTour[1]} tournaments played</p>
            </div>
        </div>
        <div class="vr"></div>
        
        <div class="px-3 container" id="tourneyContent">
            <h3>Load data from the list of tournaments on the side</h3>
        </div>

        <div class="ms-auto pe-3" style="overflow: auto; width:693px; height: 740px;" id="tourneyList">
            meow meow
        </div>
    </div>`
    radioButtons1 = document.getElementsByName("btnradio1");
    for (let radioButton of radioButtons1) {
        radioButton.addEventListener('change', yearButton);
    };
    radioButtons2 = document.getElementsByName("btnradio2");
    for (let radioButton of radioButtons2) {
        radioButton.addEventListener('change', modeButton);
    }
    await tourneyList('all');
    console.log(getAllCharStages(id))
};

async function loadOther(id) {
    /*
    Player VS Player Total History
    Total played Characters / Stages
    Last 3 Top 1 / 2 / 3 / 8 / 32 Placements
    Last 3 Tournament Placements (5 for community)
    Players Teamed With
    */

    var playResu = document.getElementsByClassName('playerResults');
    let img = "";
    if (currentPlay.images.length !== 0 && currentPlay.images.some(x => x.type
            .toLowerCase() == "profile")) {
        for (var t = 0; t < currentPlay.images.length; t++) {
            if (currentPlay.images[t].type === "profile") {
                img = `<a class="playerImg3">
                    <img alt="${currentPlay.name}" src="${currentPlay.images[t].url}" class="playerImg4">
                </a>`
            }
        }
    } else {
        img =
            `<div class="playerImg1"><div class="playerLetter">${currentPlay.name.charAt(0)}</div></div>`
    };
    let tempAl = "";
    if (currentPlay.alias.length !== 1) {
        tempAl = currentPlay.alias.join(", ");
        tempAl = tempAl.replace(`${currentPlay.name}, `, "")
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
        }
    }
    for (var i = 0; i < currentPlay.auth.length; i++) {
        if (currentPlay.auth[i].platform !== "DISCORD") {
            socials +=
                `<a class="pr-10 text-light linkSpan" target="_blank" style="text-decoration: none; color: currentColor!important;" rel="noopener noreferrer" href="${socials2[currentPlay.auth[i].platform].url}${currentPlay.auth[i].username}">${socials2[currentPlay.auth[i].platform].icon} ${currentPlay.auth[i].username}</a>`;
        }
    };
    let tops = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
    let totalTour = [0, 0, 0];
    let totalPrize = [0, 0, 0];
    let tourBut = "";
    for (var i in currentPlay.tourneys) {
        if (tourBut === "") {
            tourBut += `
            <input type="radio" class="btn-check" name="btnradio1" id="btnradioall" autocomplete="off" checked>
            <label class="btn btn-outline-secondary" for="btnradioall">All</label>
            <input type="radio" class="btn-check" name="btnradio1" id="btnradio${i}" autocomplete="off">
            <label class="btn btn-outline-secondary" for="btnradio${i}">${i}</label>`;
        } else {
            tourBut += `
            <input type="radio" class="btn-check" name="btnradio1" id="btnradio${i}" autocomplete="off">
            <label class="btn btn-outline-secondary" for="btnradio${i}">${i}</label>`;
        }
        totalTour[0] += currentPlay.tourneys[i][0].length;
        totalTour[1] += currentPlay.tourneys[i][1].length;
        //totalTour[2] += currentPlay.tourneys[i][2].length;
        for (var t = 0; t < currentPlay.tourneys[i].length; t++) {
            for (var r = 0; r < currentPlay.tourneys[i][t].length; r++) {
                if (currentPlay.tourneys[i][t][r].data.main.prizing !== null && currentPlay.tourneys[i][t][r].data.main.prizing !== undefined) {
                    //console.log(i, t, r, currentPlay.tourneys[i][t][r].data.main.prizing)
                    totalPrize[t] += parseInt(currentPlay.tourneys[i][t][r].data.main.prizing / (t + 1));
                }
                if (currentPlay.tourneys[i][t][r].data.main.placement === 1) {
                    tops[t][0]++;
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (currentPlay.tourneys[i][t][r].data.main.placement === 2) {
                    tops[t][1]++;
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (currentPlay.tourneys[i][t][r].data.main.placement === 3) {
                    tops[t][2]++;
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (currentPlay.tourneys[i][t][r].data.main.placement <= 8) {
                    tops[t][3]++;
                    tops[t][4]++;
                } else if (currentPlay.tourneys[i][t][r].data.main.placement <= 32) {
                    tops[t][4]++;
                }
            }
        }
    };
    playResu[0].innerHTML = `
    <div class="d-flex">
    <div class="whoIs player">
        ${img}
        <div class="playerData">
            <a href="${currentPlay.smash.url}" class="text-light" style="font-size: calc(1.3rem + .6vw); text-decoration: none; color: currentColor!important" rel="noopener noreferrer" target="_blank">${currentPlay.name} (${currentPlay.smash.slug.replace('user/', '')})</a>
            <h5 style="opacity: 0.5;">${tempAl}</h5>
            <div style="display:flex">${socials}</div>
        </div>
    </div>
    <nav class="ps-6 flex-column flex-md-center justify-content-between navbar navbar-expand-sm bg-dark navbar-dark" style="border-radius: 0 0 15px 15px ">
        <div class="d-flex justify-content-center">
            <div>
                <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                    <li class="nav-item px-4">
                        <a href="javascript:void(0)" class="nav-link" draggable="false" aria-current="page" onclick="loadPlayer(${id})" style="font-size: 20; padding-bottom: 20px;">
                            Tournament History
                        </a>
                    </li>
                    <div class="vr"></div>
                    <li class="nav-item px-4">
                        <a href="javascript:void(0)" class="nav-link" draggable="false" aria-current="page" onclick="" style="font-size: 20; padding-bottom: 20px;">
                            Tournament Statistics
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div>

    </div>
</div>
<br>
<div class="d-flex">
    <div class="px-1" style="width: 19%">
        <div class="playerTour mt-auto" style="text-align: center;">
            <h4>Earnings</h4>
            <div>
                <h5>$${(totalPrize[0]+totalPrize[1]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h5>
            </div>
            <div>
                <strong>1v1</strong>: $${totalPrize[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span><text style="opacity: .30"> • </text><strong>2v2</strong>: $${totalPrize[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            </div>
        </div>
        <hr />
        <div class="playerTour mt-auto" style="text-align: center;">
            <h4>1v1 Placements</h4>
            <div>
                <img src="e2f8f101328a4b4ae7875945716345b3.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[0][0]}</span>
                <img src="c65da98dd1cd29756d4d5901ed549661.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[0][1]}</span>
                <img src="9ecf90770f4de9be7b44cb601d49722c.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[0][2]}</span>
            </div>
            <span class="pr-10" style="font-size: 18">Top 8s: ${tops[0][3]}</span>
            <span class="pr-10" style="font-size: 18">Top 32s: ${tops[0][4]}</span>
            <p>${totalTour[0]} tournaments played</p>
        </div>
        <hr />
        <div class="playerTour mt-auto" style="text-align: center;">
            <h4>2v2 Placements</h4>
            <div>
                <img src="e2f8f101328a4b4ae7875945716345b3.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[1][0]}</span>
                <img src="c65da98dd1cd29756d4d5901ed549661.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[1][1]}</span>
                <img src="9ecf90770f4de9be7b44cb601d49722c.svg" style="width: 30px; height: 30px;" draggable="false"><span class="pr-10">${tops[1][2]}</span>
            </div>
            <span class="pr-10" style="font-size: 18">Top 8s: ${tops[1][3]}</span>
            <span class="pr-10" style="font-size: 18">Top 32s: ${tops[1][4]}</span>
            <p>${totalTour[1]} tournaments played</p>
        </div>
    </div>
    <div class="vr"></div>
    
    <div class="px-3 container" id="tourneyContent">
        <h3>Load data from the list of tournaments on the side</h3>
    </div>
</div>`
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