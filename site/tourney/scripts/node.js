var fs = require('fs');
var path = require('path');
const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args));
let streams = ["brawlhalla", "brawlleaguetv", "haxxxd", "ajmorr2000", "nsigofficial", "trixbrawlhalla", "angesports", "tkluth", "cloudburstbh", "pitybh", "spaceatronix", "triton9esports", "slowmotiongaming00", "probrawlhalla", "mazerhq", "brawlnexus", "slowmotion_bh", "brawlhallape", "bedheadninja", "teampxl_bh", "estacaobh", "coliseo_tv", "brawl_it", "brawlhallaal", "indianbrawlhallacommunity", "lockandloadesports", "tented0g", "brawltuga", "formas1", "teampxlbh", "brawlhalla_french_league", "brawltourneysbt", "aivinxj", "brawlhalla365", "gamingilluzion", "unifybh", "cohesion_esports", "liltom956", "tricolorarrows", "ausseabrawlhalla", "mmc_vicios", "ghostleaguetournaments", "reaper_j3", "doblehbh", "frydasolebh", "huichen_gg", "ourstyle_brawlball", "brawlhallaecl", "impossiblecarl", "datafgc", "urbador", "bifuteki", "brawlleagueofficial", "bigbluegg2", "dreamhackfighters", "adaptationgg", "brawlleague", "goldfishgd", "the_floater", "someschoolkid", "stylinzebra", "srytagor", "brazilbrawlhallaseries", "voidrendx", "knightxxlancer", "dreamhacksmash", "hazelgames2", "kashe69", "frozegamerx", "thedeadpooljsc", "catniplol", "siktrex", "jarwerewolf", "naykom", "klappstuhl100", "skullzer_live", "anastasialee10", "granitlahu", "samsa400", "tf_acidmaw", "supertijm", "kblitz98", "savagetienne", "omerblack07", "bucusor", "xezit", "pugsyxd", "toskg", "sweettooth013", "jamil237237", "uvularcar59652", "fizzcrypt", "beastybear0", "andresprats1", "katarinyalive", "dankjurgi", "noaran", "ke1erroc", "theswaggyporpoise", "dror10ar", "4j1uvgico", "ysp_twitch", "itsriparooni", "jokerbane97", "theblue_void", "sinfullwolf", "leftstickdown", "xyberevyk", "zumodepapaya", "spankygod", "8zelirion8", "a_log", "thecaves551", "shahpanj", "zoraxp", "firemaster2468", "healofdeath", "killerdragoncein", "macjigga", "cf_bs", "yahav1196", "mighty_kegluneq", "brawlexperience", "lynx_w", "2jfpl44hy", "deadshot1345", "luanxp1", "princetklive", "xxx_putin_xxx", "cerberus_h3x", "solidsmith", "oxicleanbh", "gustavofres", "goriat23", "hartske", "nahkeetagaming", "darklimi", "lacatustare222", "complexvideoz", "ozsnafu", "olaxgoron", "beeptodahboop", "themrgamingglive", "m4jestr1x", "sealemperor", "irvank7", "afonsomlgpro23", "prohea", "thrayex", "jhontran", "itsreversal", "ezhokm", "droio54", "treelayn", "jordanplaza", "ufon123456", "tomercarni123", "tinyzenji", "danydu83", "4j55uqpgj", "l0rdnight", "erm4ck", "cagelado", "9j55eyztx", "omagz_94", "ceejayscott12", "quantumapprentice", "garret212", "mgsgta3", "mrstealyourtv", "andreaespindola", "garebear911", "grim_gam1ng", "kingbani_kazuma", "fulup5", "powarthon", "mitsoku1", "warheroking", "ripbraincells", "zeromaster121", "xxoleg3", "extremelydifficult", "shoatcircuit", "grodos7", "4j4so564l", "queiros192006", "poekagaming", "sylr_", "marcomemesandchese", "snakestorm87", "glaswork", "bamboozlerb", "watuh", "deadhorse007", "tdn2017", "xoker68", "oussamaab31", "bizarrepotatochi", "pixel_78", "warzay13127", "kapaska", "greghunter24", "corsbh", "akosstream", "wolf_bloodfury", "kerubaa", "martin10259", "theflashplayz", "fares311", "englishsoulgaming", "7j7wn018k", "mettacon", "birchbeardfilms", "brandon4tc", "sphrth7", "xespectroxx", "fedejuegayt", "thespecia", "thegreatsubotic", "crystilizedgamer", "seraphim_demonic", "pbs_likecaillou", "freckles183", "lovexilero", "khajza", "mrpokemonyt", "stevenatorbrz", "elementswe", "jakem1ester", "zepamplemoose", "b0n3_napp3r", "tazamemaru", "sadafon", "aakuthefrog", "7jg9jz2bs", "auredzal", "fury_cobra", "pontuzaa", "xnatsupt", "srbaby1543", "josh27188", "victorruan8", "pedraogames", "killaoflife1", "batmaan2k", "johitan43", "diogotauber", "carlosgamer199", "ymrisonigs", "pedroian", "botond14king", "xxfangrulerxx", "gameboy_mlg0", "jacksongurio", "7jfpm9ils", "defaltsh00ter", "pabloellanoteama", "ryangtr1510", "xheanort142", "1jfpn2lqh", "snookyval", "levilawl", "lfiejd", "oxterius", "bagrielyt", "mrdrake00games", "mr_lonelyn", "marmeladanamanteiga", "drededhammer", "cryptixslayer", "collinb1000", "bmble_b", "xxarrowheadx", "a_wild_no_u", "straypotato", "1simplezen", "cweed37", "tilowgames", "gabboele25", "zukim1", "mixam1235", "verse_21", "6jg9ex1zy", "haydog20002", "tohrugg", "qiopaladins", "nxt_primezz", "ignusgames21", "crrt", "scar135678", "badnerd_fmz", "rz_panuwat", "inodible3", "terminox91", "deku141", "madforlife", "d_wynn27", "luskazsz", "xxrai_kunxx", "william27010441", "nurbolothd", "emanuel0728", "cam12599", "skllfix", "thekerchoo", "shadow431shadow", "igorisbae", "rammsteincraft", "skyshotgaming", "carlos117", "lilemppu", "alotros", "sub4ro", "sharuun24", "csp_dan_"]

async function getStreams() {
    let bigStream = {}
    for (var d = 0; d < streams.length; d++) {
        let cursor = "";
        let hasNext = true;
        let vodStreams = [];
        let highlightStreams = []
        while (hasNext === true) {
            let data;
            if (cursor !== "") {
                let temp = await fetch("https://gql.twitch.tv/gql", {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "en-US",
                        "authorization": "OAuth 1m7r4eo8nkacyxrv109vde65rw2r1w",
                        "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                        "client-session-id": "8bc948e198d6a5b3",
                        "client-version": "02ff35d7-9180-4834-864a-030c03999e6b",
                        "content-type": "text/plain;charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "x-device-id": "DOXCwU2rQeScOkeARQ5qwOIUw01SVkBb"
                    },
                    "referrer": "https://www.twitch.tv/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": `[{"operationName":"FilterableVideoTower_Videos","variables":{"limit":100,"channelOwnerLogin":"${streams[d]}","broadcastType":"ARCHIVE","videoSort":"TIME","cursor":"${cursor}"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb"}}}]`,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(res => res.json()).catch(err => {
                    console.log(err);
                });
                data = temp[0].data.user;
                if (data !== null && data.videos === null) {
                    await new Promise(r => setTimeout(r, 60000));
                    temp = await fetch("https://gql.twitch.tv/gql", {
                        "headers": {
                            "accept": "*/*",
                            "accept-language": "en-US",
                            "authorization": "OAuth 1m7r4eo8nkacyxrv109vde65rw2r1w",
                            "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                            "client-session-id": "8bc948e198d6a5b3",
                            "client-version": "02ff35d7-9180-4834-864a-030c03999e6b",
                            "content-type": "text/plain;charset=UTF-8",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-site",
                            "x-device-id": "DOXCwU2rQeScOkeARQ5qwOIUw01SVkBb"
                        },
                        "referrer": "https://www.twitch.tv/",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": `[{"operationName":"FilterableVideoTower_Videos","variables":{"limit":100,"channelOwnerLogin":"${streams[d]}","broadcastType":"ARCHIVE","videoSort":"TIME","cursor":"${cursor}"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb"}}}]`,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(res => res.json()).catch(err => {
                        console.log(err);
                    });
                    data = temp[0].data.user;
                };
            } else {
                let temp = await fetch("https://gql.twitch.tv/gql", {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "en-US",
                        "authorization": "OAuth 1m7r4eo8nkacyxrv109vde65rw2r1w",
                        "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                        "client-session-id": "8bc948e198d6a5b3",
                        "client-version": "02ff35d7-9180-4834-864a-030c03999e6b",
                        "content-type": "text/plain;charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "x-device-id": "DOXCwU2rQeScOkeARQ5qwOIUw01SVkBb"
                    },
                    "referrer": "https://www.twitch.tv/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": `[{\"operationName\":\"FilterableVideoTower_Videos\",\"variables\":{\"limit\":100,\"channelOwnerLogin\":\"${streams[d]}\",\"broadcastType\":\"ARCHIVE\",\"videoSort\":\"TIME\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb\"}}}]`,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(res => res.json()).catch(err => {
                    console.log(err);
                });
                data = temp[0].data.user;
                if (data !== null && data.videos === null) {
                    await new Promise(r => setTimeout(r, 60000));
                    temp = await fetch("https://gql.twitch.tv/gql", {
                        "headers": {
                            "accept": "*/*",
                            "accept-language": "en-US",
                            "authorization": "OAuth 1m7r4eo8nkacyxrv109vde65rw2r1w",
                            "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                            "client-session-id": "8bc948e198d6a5b3",
                            "client-version": "02ff35d7-9180-4834-864a-030c03999e6b",
                            "content-type": "text/plain;charset=UTF-8",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-site",
                            "x-device-id": "DOXCwU2rQeScOkeARQ5qwOIUw01SVkBb"
                        },
                        "referrer": "https://www.twitch.tv/",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": `[{\"operationName\":\"FilterableVideoTower_Videos\",\"variables\":{\"limit\":100,\"channelOwnerLogin\":\"${streams[d]}\",\"broadcastType\":\"ARCHIVE\",\"videoSort\":\"TIME\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb\"}}}]`,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(res => res.json()).catch(err => {
                        console.log(err);
                    });
                    data = temp[0].data.user;
                };
            };
            if (data !== null) {
                //console.log(data)
                if (data.videos.edges.length !== 0) {
                    cursor = data.videos.edges[0].cursor;
                    hasNext = data.videos.pageInfo.hasNextPage;
                    for (var i = 0; i < data.videos.edges.length; i++) {
                        vodStreams.push({
                            title: data.videos.edges[i].node.title,
                            views: data.videos.edges[i].node.viewCount,
                            thumbnail: data.videos.edges[i].node.previewThumbnailURL,
                            length: data.videos.edges[i].node.lengthSeconds,
                            video: `https://www.twitch.tv/videos/${data.videos.edges[i].node.id}`,
                            uploaded: data.videos.edges[i].node.publishedAt
                        })
                    }
                } else {
                    hasNext = false;
                }
            } else {
                hasNext = false;
            }
            // https://www.twitch.tv/videos/1551959301?t=12h12m13s
        };
        hasNext = true;
        cursor = "";
        while (hasNext === true) {
            let data;
            if (cursor !== "") {
                let temp = await fetch("https://gql.twitch.tv/gql", {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "en-US",
                        "authorization": "OAuth 1m7r4eo8nkacyxrv109vde65rw2r1w",
                        "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                        "client-session-id": "8bc948e198d6a5b3",
                        "client-version": "02ff35d7-9180-4834-864a-030c03999e6b",
                        "content-type": "text/plain;charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "x-device-id": "DOXCwU2rQeScOkeARQ5qwOIUw01SVkBb"
                    },
                    "referrer": "https://www.twitch.tv/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": `[{"operationName":"FilterableVideoTower_Videos","variables":{"limit":100,"channelOwnerLogin":"${streams[d]}","broadcastType":"HIGHLIGHT","videoSort":"TIME","cursor":"${cursor}"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb"}}}]`,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(res => res.json()).catch(err => {
                    console.log(err);
                });
                data = temp[0].data.user;
                if (data !== null && data.videos === null) {
                    await new Promise(r => setTimeout(r, 60000));
                    temp = await fetch("https://gql.twitch.tv/gql", {
                        "headers": {
                            "accept": "*/*",
                            "accept-language": "en-US",
                            "authorization": "OAuth 1m7r4eo8nkacyxrv109vde65rw2r1w",
                            "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                            "client-session-id": "8bc948e198d6a5b3",
                            "client-version": "02ff35d7-9180-4834-864a-030c03999e6b",
                            "content-type": "text/plain;charset=UTF-8",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-site",
                            "x-device-id": "DOXCwU2rQeScOkeARQ5qwOIUw01SVkBb"
                        },
                        "referrer": "https://www.twitch.tv/",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": `[{"operationName":"FilterableVideoTower_Videos","variables":{"limit":100,"channelOwnerLogin":"${streams[d]}","broadcastType":"HIGHLIGHT","videoSort":"TIME","cursor":"${cursor}"},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb"}}}]`,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(res => res.json()).catch(err => {
                        console.log(err);
                    });
                    data = temp[0].data.user;
                };
            } else {
                let temp = await fetch("https://gql.twitch.tv/gql", {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "en-US",
                        "authorization": "OAuth 1m7r4eo8nkacyxrv109vde65rw2r1w",
                        "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                        "client-session-id": "8bc948e198d6a5b3",
                        "client-version": "02ff35d7-9180-4834-864a-030c03999e6b",
                        "content-type": "text/plain;charset=UTF-8",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "x-device-id": "DOXCwU2rQeScOkeARQ5qwOIUw01SVkBb"
                    },
                    "referrer": "https://www.twitch.tv/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": `[{\"operationName\":\"FilterableVideoTower_Videos\",\"variables\":{\"limit\":100,\"channelOwnerLogin\":\"${streams[d]}\",\"broadcastType\":\"HIGHLIGHT\",\"videoSort\":\"TIME\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb\"}}}]`,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                }).then(res => res.json()).catch(err => {
                    console.log(err);
                });
                data = temp[0].data.user;
                if (data !== null && data.videos === null) {
                    await new Promise(r => setTimeout(r, 60000));
                    temp = await fetch("https://gql.twitch.tv/gql", {
                        "headers": {
                            "accept": "*/*",
                            "accept-language": "en-US",
                            "authorization": "OAuth 1m7r4eo8nkacyxrv109vde65rw2r1w",
                            "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                            "client-session-id": "8bc948e198d6a5b3",
                            "client-version": "02ff35d7-9180-4834-864a-030c03999e6b",
                            "content-type": "text/plain;charset=UTF-8",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-site",
                            "x-device-id": "DOXCwU2rQeScOkeARQ5qwOIUw01SVkBb"
                        },
                        "referrer": "https://www.twitch.tv/",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": `[{\"operationName\":\"FilterableVideoTower_Videos\",\"variables\":{\"limit\":100,\"channelOwnerLogin\":\"${streams[d]}\",\"broadcastType\":\"HIGHLIGHT\",\"videoSort\":\"TIME\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb\"}}}]`,
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(res => res.json()).catch(err => {
                        console.log(err);
                    });
                    data = temp[0].data.user;
                };
            };
            if (data !== null) {
                //console.log(data)
                if (data.videos.edges.length !== 0) {
                    cursor = data.videos.edges[0].cursor;
                    hasNext = data.videos.pageInfo.hasNextPage;
                    for (var i = 0; i < data.videos.edges.length; i++) {
                        highlightStreams.push({
                            title: data.videos.edges[i].node.title,
                            views: data.videos.edges[i].node.viewCount,
                            thumbnail: data.videos.edges[i].node.previewThumbnailURL,
                            length: data.videos.edges[i].node.lengthSeconds,
                            video: `https://www.twitch.tv/videos/${data.videos.edges[i].node.id}`,
                            uploaded: data.videos.edges[i].node.publishedAt
                        })
                    }
                } else {
                    hasNext = false;
                }
            } else {
                hasNext = false;
            }
            // https://www.twitch.tv/videos/1551959301?t=12h12m13s
        };
        bigStream[streams[d]] = {
            vods: vodStreams,
            highlights: highlightStreams
        };
        console.log(`${streams[d]} (${d+1}/${streams.length})`)
    };
    return bigStream;
};

(async () => {
    fs.writeFileSync("streams.json", JSON.stringify(await getStreams(), null, '\t'), function (err) {
        if (err) return console.log(err);
    });
})();