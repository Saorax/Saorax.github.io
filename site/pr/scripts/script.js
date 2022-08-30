Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
//const prLoss = require("./pr-loss.json");
//const prWin = require("./pr-win.json");
import data from "./data.json" assert {
    type: "json"
};
import recency from "./lol.json" assert {
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
var siteData = [];

var tourneySlugs = [];

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
let day = 1000 * 60 * 60 * 24;

function tourneyL1() {
    let temp = [];
    let tempDates = [
        data["power-rankings"][0].sort(function (a, b) {
            return b.start - a.start;
        }),
        data["power-rankings"][1].sort(function (a, b) {
            return b.start - a.start;
        }),
        data["power-rankings"][2].sort(function (a, b) {
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
    document.getElementById("addAll").addEventListener('change', editList);
}

function getTourneyList(filter) {
    let tourn = tourneyss
    if (filter) {

    }
};

function setEvents() {
    for (var i = 0; i < tourneySlugs.length; i++) {
        let temp = document.getElementById(tourneySlugs[i]);
        temp.addEventListener('change', editList);
    }
};
async function getSiteData() {
    let tempDates = [
        data["power-rankings"][0].sort(function (a, b) {
            return b.start - a.start;
        }),
        data["power-rankings"][1].sort(function (a, b) {
            return b.start - a.start;
        }),
        data["power-rankings"][2].sort(function (a, b) {
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
            url: link.url,
            tourneyData: res
        };
        return data;
    }));

    await Promise.all(promises).then(datasets => {
        for (var i = 0; i < datasets.length; i++) {
            siteData.push(datasets[i])
        };
    });

};

function editList(type) {
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
    let time = [0, 0]
    for (var i = 0; i < tourneySlugs.length; i++) {
        let temp = document.getElementById(tourneySlugs[i]);
        if (temp.checked !== false) {

            let tempp = tourneyL1();
            tempp = tempp.filter(u => u.slug === tourneySlugs[i])[0];
            if (tourS[0] === "") {
                tourS[0] = tempp.name;
            };
            tourS[1] = tempp.name;
            //console.log(tempp);
            //console.log(tourneySlugs[i])
            for (var d = 0; d < tempp.regions.length; d++) {
                //console.log(tempp.regions[d])
                if (document.getElementById(`region${tempp.regions[d]}`).checked === true) {
                    let regi = tourneyL1();
                    regi = regi.filter(u => u.slug === tourneySlugs[i])[0];
                    //console.log(regi);
                    if (regi.gamemode.includes('1v1')) {
                        regi.files1 = regi.files1.filter(u => u.region === tempp.regions[d])[0];
                        let file = siteData.filter(u => u.url.includes(regi.files1.file))[0].tourneyData;
                        let isStart = null;
                        if (time[0] === 0) {
                            time[0] = file.tourneyStart * 1000;
                            isStart = true;
                        };
                        for (var b = 0; b < file.entrants.length; b++) {
                            let rece = recency[Math.round((time[0] - file.tourneyStart * 1000) / day)];
                            if (rece === undefined || rece === 0) {
                                rece = (-1.08 / Math.PI) * Math.atan((Math.round((time[0] - file.tourneyStart * 1000) / day) - 180) / 40) + 0.54
                            };
                            if (document.getElementById("addDecay").checked === false) {
                                rece = 1
                            }
                            let tempd = {
                                id: file.entrants[b].socials.smash_id,
                                name: file.entrants[b].socials.name,
                                socials: {
                                    twitter: file.entrants[b].socials.twitter,
                                    twitch: file.entrants[b].socials.twitch
                                },
                                total: (parseInt(file.entrants[b].total) * file.multiplier) * rece
                            };
                            if (tempd.id === 1890840) {
                                tempd = {
                                    id: 544695,
                                    name: "Major",
                                    socials: {
                                        twitter: file.entrants[b].socials.twitter,
                                        twitch: file.entrants[b].socials.twitch
                                    },
                                    total: (parseInt(file.entrants[b].total) * file.multiplier) * rece
                                };
                            }
                            if (tempd.id === 1164959) {
                                tempd = {
                                    id: 991917,
                                    name: "Amayze",
                                    socials: {
                                        twitter: file.entrants[b].socials.twitter,
                                        twitch: file.entrants[b].socials.twitch
                                    },
                                    total: (parseInt(file.entrants[b].total) * file.multiplier) * rece
                                }
                            }
                            if (tempd.id !== 249544 && tempd.id !== 216236 && tempd.id !== 1865176) {
                                // ((parseInt(sa.total) * big1v1[i].tourney.type) * ((-1.08 / Math.PI) * Math.atan((Math.round((time[0] - time[i]) / day) - 180) / 40) + 0.54)).toFixed(3),
                                //console.log(temp);
                                if (tempd.total !== null) {
                                    let sss = entrants[0].filter(u => u.id == tempd.id);
                                    if (sss.length === 0) {
                                        entrants[0].push(tempd)
                                    } else {
                                        for (var z = 0; z < entrants[0].length; z++) {
                                            if (entrants[0][z].id === tempd.id) {
                                                entrants[0][z].total += tempd.total
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };
                    if (regi.gamemode.includes('2v2')) {
                        regi.files2 = regi.files2.filter(u => u.region === tempp.regions[d])[0];
                        let file = siteData.filter(u => u.url.includes(regi.files2.file))[0].tourneyData;
                        if (time[1] === 0) {
                            time[1] = file.tourneyStart * 1000;
                        };
                        let isStart = null;
                        for (var b = 0; b < file.entrants.length; b++) {
                            for (var n = 0; n < file.entrants[b].socials.length; n++) {
                                let rece = recency[Math.round((time[1] - file.tourneyStart * 1000) / day)];
                                if (rece === undefined || rece === 0) {
                                    rece = (-1.08 / Math.PI) * Math.atan((Math.round((time[1] - file.tourneyStart * 1000) / day) - 180) / 40) + 0.54
                                };
                                if (document.getElementById("addDecay").checked === false) {
                                    rece = 1
                                }
                                let tempd = {
                                    id: file.entrants[b].socials[n].smash_id,
                                    name: file.entrants[b].socials[n].name,
                                    socials: {
                                        twitter: file.entrants[b].socials[n].twitter,
                                        twitch: file.entrants[b].socials[n].twitch
                                    },
                                    total: (parseInt(file.entrants[b].total) * file.multiplier) * rece
                                };
                                if (tempd.id === 1890840) {
                                    tempd = {
                                        id: 544695,
                                        name: "Major",
                                        socials: {
                                            twitter: file.entrants[b].socials[n].twitter,
                                            twitch: file.entrants[b].socials[n].twitch
                                        },
                                        total: (parseInt(file.entrants[b].total) * file.multiplier) * rece
                                    }
                                }
                                if (tempd.id === 1164959) {
                                    tempd = {
                                        id: 991917,
                                        name: "Amayze",
                                        socials: {
                                            twitter: file.entrants[b].socials[n].twitter,
                                            twitch: file.entrants[b].socials[n].twitch
                                        },
                                        total: (parseInt(file.entrants[b].total) * file.multiplier) * rece
                                    }
                                }
                                if (tempd.id !== 249544 && tempd.id !== 216236 && tempd.id !== 1865176) {
                                    // ((parseInt(sa.total) * big1v1[i].tourney.type) * ((-1.08 / Math.PI) * Math.atan((Math.round((time[0] - time[i]) / day) - 180) / 40) + 0.54)).toFixed(3),
                                    //console.log(temp);
                                    if (tempd.total !== null) {
                                        let sss = entrants[1].filter(u => u.id == tempd.id);
                                        if (sss.length === 0) {
                                            entrants[1].push(tempd)
                                        } else {
                                            for (var z = 0; z < entrants[1].length; z++) {
                                                if (entrants[1][z].id === tempd.id) {
                                                    entrants[1][z].total += tempd.total
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };
                };
            }
        }
    };
    for (var g = 0; g < entrants.length; g++) {
        for (var v = 0; v < entrants[g].length; v++) {
            if (isNaN(entrants[g][v].total) === true) {
                entrants[g].remove(v)
            }
        }
    };
    for (var g = 0; g < entrants.length; g++) {
        entrants[g].sort(function (a, b) {
            return b.total - a.total;
        });
    };
    for (var i = 0; i < entrants.length; i++) {
        for (var b = 0; b < (document.getElementById("addAll").checked === false && entrants[i].length > 1000 ? 1000 : entrants[i].length); b++) {
            full[i] += `
            <tr>
                <th scope="row">${b+1}</th>
                <td>${entrants[i][b].socials.twitter !== null ? '<a target="_blank" href="https://twitter.com/'+entrants[i][b].socials.twitter+'"><img src="../../images/twitter.png"></a>' : ""} ${entrants[i][b].socials.twitch !== null ? '<a target="_blank" href="https://twitch.tv/'+entrants[i][b].socials.twitch+'"><img src="../../images/twitch.png"></a>' : ""}</td>
                <td>${entrants[i][b].name}</td>
                <td>${entrants[i][b].total}</td>
            </tr>`
        }
    };
    customPr.innerHTML = full[0];
    temp2s.innerHTML = full[1];
    document.getElementById("tourneyLength").innerHTML = `${tourS[1]} - ${tourS[0]}`
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
        for (var d = 0; d < data["power-rankings"][i].length; d++) {
            tourneyss[i].push(data["power-rankings"][i][d]);
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
        //dateTemp.length === 1 && dateTemp[0].list.includes(tourneySlugs[i]) === true ? document.getElementById(tourneySlugs[i]).checked = true : document.getElementById(tourneySlugs[i]).checked = false
    };
    editList();
    //console.log(type)
};

(async () => {
    tourneyL1();
    tourneyLists();
    getTourneys();
    setEvents();
    setRegionChecks();
    await getSiteData();
    editList();
})();
(function () {
    'use strict'
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl)
    });
    var clusterize = new Clusterize({
        scrollId: 'scrollArea',
        contentId: 'myPr'
    });
    var clusterize1 = new Clusterize({
        scrollId: 'scrollArea1',
        contentId: 'officialPr'
    });
})()