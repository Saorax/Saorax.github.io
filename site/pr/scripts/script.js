Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
import prWin from "./pr-win.json" assert {
    type: "json"
};
import data from "./data.json" assert {
    type: "json"
};
import prTemp from "./prTemp.json" assert {
    type: "json"
};
import recency from "./lol.json" assert {
    type: "json"
};
import siteData from "./siteData.json" assert {
    type: "json"
};
let years = [
    "2020",
    "2021",
    "2022"
];
var tourneyss = [
    [],
    [],
    []
];
let day = 1000 * 60 * 60 * 24;
let differentRegions = [{
    region: "AUS",
    id: 577162
}];
let bannedPlayers = [1363312, 249544, 216236, 1865176];
let combines = [{
    id: 544695,
    with: [1890840],
    name: "Major"
}, {
    id: 991917,
    with: [1164959],
    name: "Asmodie"
}];
let gamemodes = ['1v1', '2v2']
var tourneySlugs = [];
var detailedData = [];

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
                    temp.push(tem);
                }
            }
        }
    };
    return temp;
};

function setRegionChecks() {
    let regions = [
        "NA",
        "EU",
        "SA",
        "AUS",
        "SEA"
    ]
    for (var i = 0; i < regions.length; i++) {
        document.getElementById(`region${regions[i]}`).addEventListener('change', editList);
    }
    document.getElementById('addDecay').addEventListener('change', editList);
    document.getElementById('difRegion').addEventListener('change', editList);
    document.getElementById("addAll").addEventListener('change', editList);
};

function setEvents() {
    for (var i = 0; i < tourneySlugs.length; i++) {
        let temp = document.getElementById(tourneySlugs[i]);
        temp.addEventListener('change', editList);
    }
};

function currentRecency(days) {
    let tems = recency[days];
    if (tems === undefined || tems === 0) {
        console.log(days)
        return 1 / (1 + Math.pow((0.9585 * 2.718281828459045), (((1 / 35) * days) - 5.21))) + 0.006765;
    } else {
        if (document.getElementById("addDecay").checked === false) return 1;
        return tems
    }
};

async function editList(type) {
    let full = [
        "", ""
    ];
    let customPr = document.getElementById("myPr");
    let temp2s = document.getElementById("officialPr");
    let entrants = [
        [],
        []
    ];
    let tourS = ["", ""]
    let time = [0, 0];
    let totalTourneys = 0;
    for (var i = 0; i < tourneySlugs.length; i++) {
        let temp = document.getElementById(tourneySlugs[i]);
        if (temp.checked !== false) {
            totalTourneys++;
            let tempp = tourneyL1();
            tempp = tempp.filter(u => u.slug === tourneySlugs[i])[0]
            if (tourS[0] === "") {
                tourS[0] = tempp.name;
            };
            tourS[1] = tempp.name;
            for (var d = 0; d < tempp.regions.length; d++) {
                if (document.getElementById(`region${tempp.regions[d]}`).checked === true) {
                    let regi = tourneyL1();
                    regi = regi.filter(u => u.slug === tourneySlugs[i])[0];
                    for (var gg = 0; gg < gamemodes.length; gg++) {
                        let regiFile = gg === 0 ? regi.files1.filter(u => u.region === tempp.regions[d])[0] : regi.files2.filter(u => u.region === tempp.regions[d])[0];
                        if (regiFile !== undefined) {
                            let file = siteData.filter(u => u.url.includes(regiFile.file))[0].tourneyData;
                            if (time[gg] === 0) {
                                time[gg] = file.tourneyStart * 1000
                            };
                        }
                    }
                    for (var gg = 0; gg < gamemodes.length; gg++) {
                        let regiFile = gg === 0 ? regi.files1.filter(u => u.region === tempp.regions[d])[0] : regi.files2.filter(u => u.region === tempp.regions[d])[0];
                        if (regiFile !== undefined) {
                            let file = siteData.filter(u => u.url.includes(regiFile.file))[0].tourneyData;
                            const promises = file.entrants.map(async function (player) {
                                return player;
                            });
                            await Promise.all(promises).then(datasets => {
                                for (var v = 0; v < datasets.length; v++) {
                                    if (isNaN(datasets[v].total) === true) {
                                        datasets.remove(v)
                                    }
                                }
                                datasets.sort(function (a, b) {
                                    return Number.parseFloat(b.total) - Number.parseFloat(a.total);
                                });
                                let leng = datasets.length > 2000 ? datasets.length/2 : datasets.length;
                                //let leng = document.getElementById("addAll").checked === false ? datasets.length < 500 ? datasets.length : 500 : datasets.length;
                                for (var b = 0; b < leng; b++) {
                                    let rece = currentRecency(Math.round((time[gg] - file.tourneyStart * 1000) / day));
                                    let tempd = [];
                                    let loss = [];
                                    let wins = [];
                                    for (var l = 0; l < datasets[b].entity.lossPlacement.length; l++) {
                                        loss.push({
                                            name: datasets[b].entity.loss[l].name,
                                            placement: datasets[b].entity.lossPlacement[l]
                                        })
                                    };
                                    let winTemp = datasets[b].entity.wonAgainst;
                                    for (var w = 0; w < winTemp.length; w++) {
                                        if (w < 3) {
                                            wins.push({
                                                name: winTemp[w].name,
                                                seed: winTemp[w].seed,
                                                points: prWin[winTemp[w].seed - 1] !== undefined ? Number.parseFloat(prWin[winTemp[w].seed - 1]) : 0
                                            });
                                        } else break;
                                    };
                                    let wadt = [datasets[b].loss, 0]
                                    for (var o = 0; o < wins.length; o++) {
                                        wadt[1] += wins[o].points;
                                    };
                                    let total = rece * file.multiplier * (wadt[0] + wadt[1] + datasets[b].placement);
                                    if (datasets[b].socials.name === "sssssssssssssssssss") {
                                        console.log(datasets[b].socials.length)
                                        console.log(datasets[b].socials.smash_id)
                                        console.log(file.multiplier * (wadt[0] + wadt[1] + datasets[b].placement));
                                        console.log(wadt[0] + wadt[1] + datasets[b].placement);
                                        console.log(wadt);
                                        console.log(wadt[0] + wadt[1])
                                        console.log(total);
                                        console.log(rece)
                                        console.log('--------')
                                    }
                                    if (gg === 0) {
                                        let tempdd = {
                                            id: datasets[b].socials.smash_id,
                                            name: datasets[b].socials.name,
                                            socials: {
                                                twitter: datasets[b].socials.twitter,
                                                twitch: datasets[b].socials.twitch
                                            },
                                            played: 1,
                                            tourneyInfo: [{
                                                dayt: Math.round((time[gg] - file.tourneyStart * 1000) / day),
                                                tourney: tempp.name,
                                                loss: {
                                                    points: datasets[b].loss !== undefined ? datasets[b].loss : 0.7,
                                                    ind: loss
                                                },
                                                wins: {
                                                    points: Number.parseFloat(datasets[b].wins.toFixed(3)),
                                                    ind: wins
                                                },
                                                mainPlacement: datasets[b].entity.placement,
                                                placement: datasets[b].placement,
                                                recency: rece,
                                                multiplier: file.multiplier,
                                                total: ((datasets[b].loss !== undefined ? Number.parseFloat(datasets[b].loss) : 0.7) + Number.parseFloat(datasets[b].wins.toFixed(3)) + datasets[b].placement) * file.multiplier * rece
                                            }],
                                            placeArr: [datasets[b].entity.placement],
                                            placement: datasets[b].entity.placement,
                                            total: ((datasets[b].loss !== undefined ? Number.parseFloat(datasets[b].loss) : 0.7) + Number.parseFloat(datasets[b].wins.toFixed(3)) + datasets[b].placement) * file.multiplier * rece
                                        };
                                        for (var cc = 0; cc < combines.length; cc++) {
                                            if (combines[cc].with.includes(tempdd.id)) {
                                                tempdd.id = combines[cc].id;
                                                tempdd.name = combines[cc].name;
                                            }
                                        };
                                        tempd.push(tempdd)
                                    } else {
                                        for (var n = 0; n < datasets[b].socials.length; n++) {
                                            tempd.push({
                                                id: datasets[b].socials[n].smash_id,
                                                name: datasets[b].socials[n].name,
                                                socials: {
                                                    twitter: datasets[b].socials[n].twitter,
                                                    twitch: datasets[b].socials[n].twitch
                                                },
                                                played: 1,
                                                tourneyInfo: [{
                                                    dayt: Math.round((time[gg] - file.tourneyStart * 1000) / day),
                                                    tourney: tempp.name,
                                                    loss: {
                                                        points: datasets[b].loss !== undefined ? datasets[b].loss : 0.7,
                                                        ind: loss
                                                    },
                                                    wins: {
                                                        points: Number.parseFloat(datasets[b].wins.toFixed(3)),
                                                        ind: wins
                                                    },
                                                    mainPlacement: datasets[b].entity.placement,
                                                    placement: datasets[b].placement,
                                                    recency: rece,
                                                    multiplier: file.multiplier,
                                                    total: ((datasets[b].loss !== undefined ? Number.parseFloat(datasets[b].loss) : 0.7) + Number.parseFloat(datasets[b].wins.toFixed(3)) + datasets[b].placement) * file.multiplier * rece
                                                }],
                                                placeArr: [datasets[b].entity.placement],
                                                placement: datasets[b].entity.placement,
                                                total: ((datasets[b].loss !== undefined ? Number.parseFloat(datasets[b].loss) : 0.7) + Number.parseFloat(datasets[b].wins.toFixed(3)) + datasets[b].placement) * file.multiplier * rece
                                            });
                                            for (var cc = 0; cc < combines.length; cc++) {
                                                if (combines[cc].with.includes(tempd[n].id)) {
                                                    tempd[n].id = combines[cc].id;
                                                    tempd[n].name = combines[cc].name;
                                                }
                                            };
                                        }
                                    };
                                    for (var t = 0; t < tempd.length; t++) {
                                        if (!bannedPlayers.includes(tempd[t].id)) {
                                            if (total !== null) {
                                                let sss = entrants[gg].filter(u => u.id == tempd[t].id);
                                                if (tourneySlugs[i] === "world-championship-2021-last-chance-qualifier-1v1") {
                                                    if (b === 0) sss = null;
                                                };
                                                if ((document.getElementById("difRegion").checked === true && differentRegions.filter(u => u.id === tempd[t].id).length !== 0)) {
                                                    sss = null;
                                                }
                                                if (sss !== null && sss.length === 0) {
                                                    entrants[gg].push(tempd[t])
                                                } else if (sss !== null) {
                                                    entrants[gg].filter(u => u.id == tempd[t].id)[0].total += ((datasets[b].loss !== undefined ? Number.parseFloat(datasets[b].loss) : 0.7) + Number.parseFloat(datasets[b].wins.toFixed(3)) + datasets[b].placement) * file.multiplier * rece;
                                                    entrants[gg].filter(u => u.id == tempd[t].id)[0].placeArr.push(tempd[t].placement);
                                                    entrants[gg].filter(u => u.id == tempd[t].id)[0].played++;
                                                    entrants[gg].filter(u => u.id == tempd[t].id)[0].tourneyInfo.push({
                                                        dayt: Math.round((time[gg] - file.tourneyStart * 1000) / day),
                                                        tourney: tempp.name,
                                                        loss: {
                                                            points: datasets[b].loss !== undefined ? datasets[b].loss : 0.7,
                                                            ind: loss
                                                        },
                                                        wins: {
                                                            points: datasets[b].wins,
                                                            ind: wins
                                                        },
                                                        mainPlacement: datasets[b].entity.placement,
                                                        placement: datasets[b].placement,
                                                        recency: rece,
                                                        multiplier: file.multiplier,
                                                        total: ((datasets[b].loss !== undefined ? Number.parseFloat(datasets[b].loss) : 0.7) + Number.parseFloat(datasets[b].wins.toFixed(3)) + datasets[b].placement) * file.multiplier * rece
                                                    })
                                                }
                                            }
                                        }
                                    }
                                };
                            });
                        }
                    };
                };
            }
        }
    };
    for (var g = 0; g < entrants.length; g++) {
        for (var v = 0; v < entrants[g].length; v++) {
            let tems = false;
            if ((entrants[g][v].played / totalTourneys * 100) < 25 && entrants[g][v].total < 5) {
                entrants[g].remove(v)
                tems = true;
            }
            if (tems !== true && isNaN(entrants[g][v].total) === true) {
                entrants[g].remove(v)
            }
        }
    };
    for (var g = 0; g < entrants.length; g++) {
        entrants[g].sort(function (a, b) {
            return b.total - a.total;
        });
    };
    detailedData = [[],[]];
    for (var i = 0; i < entrants.length; i++) {
        for (var b = 0; b < (document.getElementById("addAll").checked === false ? entrants[i].length < 500 ? entrants[i].length : 500 : entrants[i].length); b++) {
            let stata = "";
            for (var ss = 0; ss < entrants[i][b].tourneyInfo.length; ss++) {
                let tme = entrants[i][b].tourneyInfo[ss];
                let lossText = `<span class="tss-zapqqm-body16" style="font-size: 1.1rem">no losses</span>`;
                if (tme.loss.ind.length !== 0) lossText = "";
                for (var ll = 0; ll < tme.loss.ind.length; ll++) {
                    lossText += `${ll === 0 ? "" : "<br>"}
                    <span>
                        <span class="mui-thceyd-header20" style="font-size: 1.2rem">${tme.loss.ind[ll].name}</span>
                        <span class="tss-zapqqm-body16" style="font-size: 1.0rem"> (placed ${ordinal(tme.loss.ind[ll].placement)})</span>
                    </span>`
                }
                let winText = `<span class="tss-zapqqm-body16" style="font-size: 1.1rem">no wins</span>`;
                if (tme.wins.ind.length !== 0) winText = "";
                for (var ll = 0; ll < tme.wins.ind.length; ll++) {
                    winText += `${ll === 0 ? "" : "<br>"}
                    <span>
                        <span class="mui-thceyd-header20" style="font-size: 1.2rem">${tme.wins.ind[ll].name}</span>
                        <span class="tss-zapqqm-body16" style="font-size: 1.0rem"> (seeded ${ordinal(tme.wins.ind[ll].seed)} | <text style="color: #7ab15b">+${tme.wins.ind[ll].points}</text>)</span>
                    </span>`
                }
                stata += `${ss === 0 ? "" : "<br><br>"}
                <div>
                    <span>
                        <span class="mui-thceyd-header20">${tme.tourney}</span>
                        <span class="tss-zapqqm-body16"> ( x${tme.multiplier.toFixed(2)} )</span>
                    </span>
                    <br>
                    <h4>${tme.dayt === 0 ? "start date" : `${tme.dayt} days`} | ${ordinal(tme.mainPlacement)} place ( <text style="color: #7ab15b">+${tme.placement}</text> )</h4>
                    <br>
                    <h4>Wins ( <text style="color: #7ab15b">+${tme.wins.points.toFixed(3)}</text> )</h4>
                    <div class="">
                        ${winText}
                    </div>
                    <br>
                    <h4>Losses ( <text style="color: #7ab15b">+${tme.loss.points.toFixed(3)}</text> )</h4>
                    <div class="">
                        ${lossText}
                    </div>
                    <br>
                    <div>
                        <h6>Total (no recency): <text style="color: #7ab15b">${(tme.wins.points+tme.loss.points+tme.placement).toFixed(3)}</text></h6>
                        <h6>Total (no recency & multiplier): <text style="color: #7ab15b">${((tme.wins.points+tme.loss.points+tme.placement)*tme.multiplier).toFixed(3)}</text></h6>
                        <h6>Total (recency): <text style="color: #7ab15b">${((tme.wins.points+tme.loss.points+tme.placement)*tme.recency)}</text></h6>
                        <h6>Total (recency & multiplier): <text style="color: #7ab15b">${((tme.wins.points+tme.loss.points+tme.placement)*tme.multiplier*tme.recency)}</text></h6>
                    </div>
                </div>
                `;
            }
            detailedData[i].push({
                id: entrants[i][b].id,
                data: stata
            });
            full[i] += `
            <tr>
                <th scope="row">${i === 1 && b > 0 && entrants[i][b].total === entrants[i][b-1].total ? b : b+1}</th>
                <td>${entrants[i][b].socials.twitter !== null ? '<a target="_blank" href="https://twitter.com/'+entrants[i][b].socials.twitter+'"><img src="../../images/twitter.png"></a>' : ""} ${entrants[i][b].socials.twitch !== null ? '<a target="_blank" href="https://twitch.tv/'+entrants[i][b].socials.twitch+'"><img src="../../images/twitch.png"></a>' : ""}</td>
                <td>${entrants[i][b].name}</td>
                <td>${entrants[i][b].total}</td>
                <td>
                <a href="javascript:void(0)" class="btn btn-secondary bg-dark btn-sm" style="width:100%" onclick="console.log(${entrants[i][b].id});getElementById(\'detailed${i+1}\').innerHTML = detailedData[${i}].filter(i => i.id === ${entrants[i][b].id})[0].data">Detailed Points >></a>
                </td>
            </tr>`
        }
    };
    window.detailedData = detailedData
    customPr.innerHTML = full[0];
    temp2s.innerHTML = full[1];
    document.getElementById("tourneyLength").innerHTML = `${tourS[1]} - ${tourS[0]}`
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

function tourneyLists() {
    let temp = "";
    for (var i = 0; i < data.dates.length; i++) {
        temp += `
        <div class="form-check">
            <input class="form-check-input" name="presetRadio" type="radio" id="${data.dates[i].from.toLocaleLowerCase()}" style="font-size: 1rem;"${i === 0 ? " checked" : ""}>
            <label class="form-check-label" for="${data.dates[i].from.toLocaleLowerCase()}" style="font-size: 1rem;" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-html="true"
            title="${data.dates[i].to}<br>to<br>${data.dates[i].from}">${data.dates[i].from}</label>
        </div>`
    };
    document.getElementById("tourneyPresets").innerHTML = temp
};

function getTourneys() {
    let temp = `<div class="accordionEdit accordion accordion-flush" id="accordionYear" style="">`;
    let tos = tourneyL1();
    for (var i = years.length; i--;) {
        temp += `
            <div class="accordion-item bg-dark text-light${i !== years.length-1 ? ' mb-3 mt-3' : ' mt-3'}">
                <h2 class="accordion-header" id="heading${years[i]}">
                    <button class="accordionButt accordion-button collapsed bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${years[i]}" aria-expanded="${i === years.length-1 ? 'true' : 'false'}" aria-controls="collapse${years[i]}" style="font-size:1.4rem;">
                        ${years[i]}
                    </button>
                </h2>
                <div id="collapse${years[i]}" class="accordion-collapse collapse${i === years.length-1 ? ' show' : ''}" aria-labelledby="heading${years[i]}" data-bs-parent="#accordionYear">
                    <div class="accordion-body">`;
        for (var d = 0; d < tos.length; d++) {
            if (tos[d].year === years[i]) {
                tourneySlugs.push(tos[d].slug);
                let dateTemp = data.dates.filter(u => u.from.toLocaleLowerCase().includes(document.querySelector('input[name="presetRadio"]:checked').id));
                temp += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="${tos[d].slug}"${dateTemp.length === 1 && dateTemp[0].list.includes(tos[d].name) === true ? " checked" : ""}${data.doNotInclude.includes(tos[d].name) === true ? " disabled" : ""}>
                <label class="form-check-label" for="${tos[d].slug}" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-html="true"
                title="${tos[d].regions.join(", ")}">${tos[d].name} (${tos[d].gamemode.sort(function (a, b) {return a.replace("v", "") - b.replace("v", "");}).join(", ")})</label>
            </div>`;
            }
        };
        temp += '</div></div></div>'
        for (var d = 0; d < prTemp[i].length; d++) {
            tourneyss[i].push(prTemp[i][d]);
        };
    };
    temp += "</div>"
    document.getElementById('tourneyAll').innerHTML = temp;
    let radioButtons5 = document.getElementsByName("presetRadio");
    for (let radioButton of radioButtons5) {
        radioButton.addEventListener('change', changePreset);
    }
};

function changePreset(type) {
    type = type.target.id;
    let dateTemp = data.dates.filter(u => u.from.toLocaleLowerCase().includes(type));
    for (var i = 0; i < tourneySlugs.length; i++) {
        document.getElementById(tourneySlugs[i]).checked = false;
        if (dateTemp.length === 1) {
            let tee = dateTemp[0].list.some(element => {
                return tourneySlugs[i].replaceAll("-", " ").includes(element.toLowerCase());
            });
            if (tee === true) {
                document.getElementById(tourneySlugs[i]).checked = true
            }
        };
    };
    editList();
};

function detailedDataGet(id, mode) {
    document.getElementById(`detailed${mode}`).innerHTML = detailedData.filter(i => i.id === id)[0].data
}

function getTime() {
    let date = new Date(1664832903126).toLocaleString().split(" ");
    return `last updated: ${date[0]} ${date[1].split(":")[0]}:${date[1].split(":")[1]} ${date[2]}`
}
(async () => {
    document.getElementById("lastUpdated").innerHTML = getTime()
    console.time('tourney list 1')
    tourneyL1();
    console.timeEnd('tourney list 1')
    console.time('tourney list 2')
    tourneyLists();
    console.timeEnd('tourney list 2')
    console.time('tourney list 3')
    getTourneys();
    console.timeEnd('tourney list 3')
    console.time('events')
    setEvents();
    console.timeEnd('events')
    console.time('region events')
    setRegionChecks();
    console.timeEnd('region events');
    console.time('main list')
    await editList();
    console.timeEnd('main list');
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl)
    });
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
})();