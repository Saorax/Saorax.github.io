var khdr;
$.getJSON('https://saorax.github.io/khdr/khdr_missions.json', function (jsonobj) {
    khdr = jsonobj;
});

function contains(target, pattern){
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
}
console.clear();

var missionCards = ["Queen Minnie", "King Mickey", "Darkside", "Donald #2"]

function clearDiv() {
	document.getElementById("div1").remove();
	document.getElementById("div2").remove();
	
	var makeDiv = document.createElement("div");
	makeDiv.id = "div1";
	document.getElementById("top").appendChild(makeDiv);
	
	var makeDiv1 = document.createElement("div");
	makeDiv1.id = "div2";
	document.getElementById("top").appendChild(makeDiv1);
};

function changeIcon(ye) {
	let ret = "";
	if(ye.includes("Card Draw Ticket")) {
		ret = "./img/card-draw-ticket.png"
	} else if (ye.includes("Jewels")) {
		ret = "./img/jewel.png"
	} else if (ye.includes("Charm")) {
		ret = "./img/charm.png"
	} else if (ye.includes("Quest Key")) {
		ret = "./img/quest-key.png"
	} else if (ye.includes("Premium Quest Key")) {
		ret = "./img/premium-quest-key.png"
	} else if (ye.includes("BP")) {
		ret = "./img/bp.png"
	} 
	// event items
	else if (ye.includes("Queen Minnie")) {
		ret = "./img/queen-minnie.png"
	} else if (ye.includes("King Mickey")) {
		ret = "./img/king-mickey.png"
	} else if (ye.includes("Darkside")) {
		ret = "./img/darkside.png"
	} else if (ye.includes("Donald #2")) {
		ret = "./img/donald-2.png"
	}
	return ret
};

function removeEmpty() {
	for (var i = 0; i < 5; i++) {
		if (document.getElementById("mistable").children[0].children[1].children[i].children[2].innerHTML === "empty") {
			document.getElementById("mistable").children[0].children[1].children[i].children[0].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[1].children[i].children[1].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[1].children[i].children[2].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[1].children[i].id = "empt";
		} else {
			document.getElementById("mistable").children[0].children[1].children[i].children[0].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[1].children[i].children[1].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[1].children[i].children[2].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[1].children[i].id = "node";
		};
		
		if (document.getElementById("mistable").children[0].children[2].children[i].children[2].innerHTML === "empty") {
			document.getElementById("mistable").children[0].children[2].children[i].children[0].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[2].children[i].children[1].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[2].children[i].children[2].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[2].children[i].id = "empt";
		} else {
			document.getElementById("mistable").children[0].children[2].children[i].children[0].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[2].children[i].children[1].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[2].children[i].children[2].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[2].children[i].id = "node";
		};
		
		if (document.getElementById("mistable").children[0].children[3].children[i].children[2].innerHTML === "empty") {
			document.getElementById("mistable").children[0].children[3].children[i].children[0].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[3].children[i].children[1].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[3].children[i].children[2].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[3].children[i].id = "empt";
		} else {
			document.getElementById("mistable").children[0].children[3].children[i].children[0].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[3].children[i].children[1].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[3].children[i].children[2].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[3].children[i].id = "node";
		};
		
		if (document.getElementById("mistable").children[0].children[4].children[i].children[2].innerHTML === "empty") {
			document.getElementById("mistable").children[0].children[4].children[i].children[0].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[4].children[i].children[1].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[4].children[i].children[2].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[4].children[i].id = "empt";
		} else {
			document.getElementById("mistable").children[0].children[4].children[i].children[0].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[4].children[i].children[1].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[4].children[i].children[2].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[4].children[i].id = "node";
		};
		
		if (document.getElementById("mistable").children[0].children[5].children[i].children[2].innerHTML === "empty") {
			document.getElementById("mistable").children[0].children[5].children[i].children[0].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[5].children[i].children[1].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[5].children[i].children[2].style.visibility = "hidden";
			document.getElementById("mistable").children[0].children[5].children[i].id = "empt";
		} else {
			document.getElementById("mistable").children[0].children[5].children[i].children[0].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[5].children[i].children[1].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[5].children[i].children[2].style.visibility = "visible";
			document.getElementById("mistable").children[0].children[5].children[i].id = "node";
		};
	}
	
};

function changeCardHeight() {
	for (var i = 0; i < 5; i++) {
		if (contains(document.getElementById("mistable").children[0].children[1].children[i].children[1].innerHTML, missionCards) == 1) {
			document.getElementById("mistable").children[0].children[1].children[i].children[0].id = "card";
		} else {
			document.getElementById("mistable").children[0].children[1].children[i].children[0].id = "base";
		};
		
		if (contains(document.getElementById("mistable").children[0].children[2].children[i].children[1].innerHTML, missionCards) == 1) {
			document.getElementById("mistable").children[0].children[2].children[i].children[0].id = "card";
		} else {
			document.getElementById("mistable").children[0].children[2].children[i].children[0].id = "base";
		};
		
		if (contains(document.getElementById("mistable").children[0].children[3].children[i].children[1].innerHTML, missionCards) == 1) {
			document.getElementById("mistable").children[0].children[3].children[i].children[0].id = "card";
		} else {
			document.getElementById("mistable").children[0].children[3].children[i].children[0].id = "base";
		};
		
		if (contains(document.getElementById("mistable").children[0].children[4].children[i].children[1].innerHTML, missionCards) == 1) {
			document.getElementById("mistable").children[0].children[4].children[i].children[0].id = "card";
		} else {
			document.getElementById("mistable").children[0].children[4].children[i].children[0].id = "base";
		};
		
		if (contains(document.getElementById("mistable").children[0].children[5].children[i].children[1].innerHTML, missionCards) == 1) {
			document.getElementById("mistable").children[0].children[5].children[i].children[0].id = "card";
		} else {
			document.getElementById("mistable").children[0].children[5].children[i].children[0].id = "base";
		};
	}
};

// WEEKLIES

function getWeeklies() {
	clearDiv()
	for (var i = 0; i < khdr[0].weeklies.length; i++) {
		var makeBut = document.createElement("button");
		makeBut.textContent = khdr[0].weeklies[i].name;
		makeBut.setAttribute("onClick", `getWeeklies1(${i})`);
		document.getElementById("div1").appendChild(makeBut);
		var whitesp = document.createTextNode("\u00A0");
		document.getElementById("div1").appendChild(whitesp);
	}
};

function getWeeklies1(typ) {
	document.getElementById("completion").innerHTML = khdr[0].weeklies[typ].completion;
	document.getElementById("titimage").src = changeIcon(khdr[0].weeklies[typ].completion);
	document.getElementById("time").innerHTML = khdr[0].weeklies[typ].time;
	document.getElementById("title").innerHTML =  khdr[0].weeklies[typ].name;
	for(var i = 0; i < 5;  i++) {
		document.getElementById("mistable").children[0].children[1].children[i].children[1].innerHTML =  khdr[0].weeklies[typ].rewards.row1[i].reward;
		document.getElementById("mistable").children[0].children[1].children[i].children[2].innerHTML =  khdr[0].weeklies[typ].rewards.row1[i].mission;
		document.getElementById("mistable").children[0].children[1].children[i].children[0].src =  changeIcon(khdr[0].weeklies[typ].rewards.row1[i].reward);
		
		document.getElementById("mistable").children[0].children[2].children[i].children[1].innerHTML =  khdr[0].weeklies[typ].rewards.row2[i].reward;
		document.getElementById("mistable").children[0].children[2].children[i].children[2].innerHTML =  khdr[0].weeklies[typ].rewards.row2[i].mission;
		document.getElementById("mistable").children[0].children[2].children[i].children[0].src =  changeIcon(khdr[0].weeklies[typ].rewards.row2[i].reward);
		
		document.getElementById("mistable").children[0].children[3].children[i].children[1].innerHTML =  khdr[0].weeklies[typ].rewards.row3[i].reward;
		document.getElementById("mistable").children[0].children[3].children[i].children[2].innerHTML =  khdr[0].weeklies[typ].rewards.row3[i].mission;
		document.getElementById("mistable").children[0].children[3].children[i].children[0].src =  changeIcon(khdr[0].weeklies[typ].rewards.row3[i].reward);
		
		document.getElementById("mistable").children[0].children[4].children[i].children[1].innerHTML =  khdr[0].weeklies[typ].rewards.row4[i].reward;
		document.getElementById("mistable").children[0].children[4].children[i].children[2].innerHTML =  khdr[0].weeklies[typ].rewards.row4[i].mission;
		document.getElementById("mistable").children[0].children[4].children[i].children[0].src =  changeIcon(khdr[0].weeklies[typ].rewards.row4[i].reward);
		
		document.getElementById("mistable").children[0].children[5].children[i].children[1].innerHTML =  khdr[0].weeklies[typ].rewards.row5[i].reward;
		document.getElementById("mistable").children[0].children[5].children[i].children[2].innerHTML =  khdr[0].weeklies[typ].rewards.row5[i].mission;
		document.getElementById("mistable").children[0].children[5].children[i].children[0].src =  changeIcon(khdr[0].weeklies[typ].rewards.row5[i].reward);
	}
	removeEmpty();
	changeCardHeight();
};

// MONTHLIES
function getMonthlies() {
	clearDiv()
	for (var i = 0; i < khdr[0].monthlies.length; i++) {
		var makeBut = document.createElement("button");
		makeBut.setAttribute("onClick", `getMonthlies1(${i})`);
		makeBut.textContent = khdr[0].monthlies[i].name;
		document.getElementById("div1").appendChild(makeBut);
		var whitesp = document.createTextNode("\u00A0");
		document.getElementById("div1").appendChild(whitesp);
	}
};

function getMonthlies1(typ) {
	document.getElementById("completion").innerHTML = khdr[0].monthlies[typ].completion;
	document.getElementById("titimage").src = changeIcon(khdr[0].monthlies[typ].completion);
	document.getElementById("time").innerHTML = khdr[0].monthlies[typ].time;
	document.getElementById("title").innerHTML =  khdr[0].monthlies[typ].name;
	for(var i = 0; i < 5;  i++) {
		document.getElementById("mistable").children[0].children[1].children[i].children[1].innerHTML =  khdr[0].monthlies[typ].rewards.row1[i].reward;
		document.getElementById("mistable").children[0].children[1].children[i].children[2].innerHTML =  khdr[0].monthlies[typ].rewards.row1[i].mission;
		document.getElementById("mistable").children[0].children[1].children[i].children[0].src =  changeIcon(khdr[0].monthlies[typ].rewards.row1[i].reward);
		
		document.getElementById("mistable").children[0].children[2].children[i].children[1].innerHTML =  khdr[0].monthlies[typ].rewards.row2[i].reward;
		document.getElementById("mistable").children[0].children[2].children[i].children[2].innerHTML =  khdr[0].monthlies[typ].rewards.row2[i].mission;
		document.getElementById("mistable").children[0].children[2].children[i].children[0].src =  changeIcon(khdr[0].monthlies[typ].rewards.row2[i].reward);
		
		document.getElementById("mistable").children[0].children[3].children[i].children[1].innerHTML =  khdr[0].monthlies[typ].rewards.row3[i].reward;
		document.getElementById("mistable").children[0].children[3].children[i].children[2].innerHTML =  khdr[0].monthlies[typ].rewards.row3[i].mission;
		document.getElementById("mistable").children[0].children[3].children[i].children[0].src =  changeIcon(khdr[0].monthlies[typ].rewards.row3[i].reward);
		
		document.getElementById("mistable").children[0].children[4].children[i].children[1].innerHTML =  khdr[0].monthlies[typ].rewards.row4[i].reward;
		document.getElementById("mistable").children[0].children[4].children[i].children[2].innerHTML =  khdr[0].monthlies[typ].rewards.row4[i].mission;
		document.getElementById("mistable").children[0].children[4].children[i].children[0].src =  changeIcon(khdr[0].monthlies[typ].rewards.row4[i].reward);
		
		document.getElementById("mistable").children[0].children[5].children[i].children[1].innerHTML =  khdr[0].monthlies[typ].rewards.row5[i].reward;
		document.getElementById("mistable").children[0].children[5].children[i].children[2].innerHTML =  khdr[0].monthlies[typ].rewards.row5[i].mission;
		document.getElementById("mistable").children[0].children[5].children[i].children[0].src =  changeIcon(khdr[0].monthlies[typ].rewards.row5[i].reward);
	}
	removeEmpty();
	changeCardHeight();
};

function getBeginner() {
	clearDiv();
	document.getElementById("completion").innerHTML = khdr[0].beginner[0].completion;
	document.getElementById("titimage").src = changeIcon(khdr[0].beginner[0].completion);
	document.getElementById("time").innerHTML = khdr[0].beginner[0].time;
	document.getElementById("title").innerHTML = "Beginner Missions";
	for(var i = 0; i < 5;  i++) {
		document.getElementById("mistable").children[0].children[1].children[i].children[1].innerHTML =  khdr[0].beginner[0].rewards.row1[i].reward;
		document.getElementById("mistable").children[0].children[1].children[i].children[2].innerHTML =  khdr[0].beginner[0].rewards.row1[i].mission;
		document.getElementById("mistable").children[0].children[1].children[i].children[0].src =  changeIcon(khdr[0].beginner[0].rewards.row1[i].reward);
		
		document.getElementById("mistable").children[0].children[2].children[i].children[1].innerHTML =  khdr[0].beginner[0].rewards.row2[i].reward;
		document.getElementById("mistable").children[0].children[2].children[i].children[2].innerHTML =  khdr[0].beginner[0].rewards.row2[i].mission;
		document.getElementById("mistable").children[0].children[2].children[i].children[0].src =  changeIcon(khdr[0].beginner[0].rewards.row2[i].reward);
		
		document.getElementById("mistable").children[0].children[3].children[i].children[1].innerHTML =  khdr[0].beginner[0].rewards.row3[i].reward;
		document.getElementById("mistable").children[0].children[3].children[i].children[2].innerHTML =  khdr[0].beginner[0].rewards.row3[i].mission;
		document.getElementById("mistable").children[0].children[3].children[i].children[0].src =  changeIcon(khdr[0].beginner[0].rewards.row3[i].reward);
		
		document.getElementById("mistable").children[0].children[4].children[i].children[1].innerHTML =  khdr[0].beginner[0].rewards.row4[i].reward;
		document.getElementById("mistable").children[0].children[4].children[i].children[2].innerHTML =  khdr[0].beginner[0].rewards.row4[i].mission;
		document.getElementById("mistable").children[0].children[4].children[i].children[0].src =  changeIcon(khdr[0].beginner[0].rewards.row4[i].reward);
		
		document.getElementById("mistable").children[0].children[5].children[i].children[1].innerHTML =  khdr[0].beginner[0].rewards.row5[i].reward;
		document.getElementById("mistable").children[0].children[5].children[i].children[2].innerHTML =  khdr[0].beginner[0].rewards.row5[i].mission;
		document.getElementById("mistable").children[0].children[5].children[i].children[0].src =  changeIcon(khdr[0].beginner[0].rewards.row5[i].reward);
	}
	removeEmpty();
	changeCardHeight();
};

function getPremium() {
	clearDiv()
	document.getElementById("completion").innerHTML = khdr[0].premium[0].completion;
	document.getElementById("titimage").src = changeIcon(khdr[0].premium[0].completion);
	document.getElementById("time").innerHTML = khdr[0].premium[0].time;
	document.getElementById("title").innerHTML = "VIP / Weekly Jewel Extravaganza Missions";
	for(var i = 0; i < 5;  i++) {
		document.getElementById("mistable").children[0].children[1].children[i].children[1].innerHTML =  khdr[0].premium[0].rewards.row1[i].reward;
		document.getElementById("mistable").children[0].children[1].children[i].children[2].innerHTML =  khdr[0].premium[0].rewards.row1[i].mission;
		document.getElementById("mistable").children[0].children[1].children[i].children[0].src =  changeIcon(khdr[0].premium[0].rewards.row1[i].reward);
		
		document.getElementById("mistable").children[0].children[2].children[i].children[1].innerHTML =  khdr[0].premium[0].rewards.row2[i].reward;
		document.getElementById("mistable").children[0].children[2].children[i].children[2].innerHTML =  khdr[0].premium[0].rewards.row2[i].mission;
		document.getElementById("mistable").children[0].children[2].children[i].children[0].src =  changeIcon(khdr[0].premium[0].rewards.row2[i].reward);
		
		document.getElementById("mistable").children[0].children[3].children[i].children[1].innerHTML =  khdr[0].premium[0].rewards.row3[i].reward;
		document.getElementById("mistable").children[0].children[3].children[i].children[2].innerHTML =  khdr[0].premium[0].rewards.row3[i].mission;
		document.getElementById("mistable").children[0].children[3].children[i].children[0].src =  changeIcon(khdr[0].premium[0].rewards.row3[i].reward);
		
		document.getElementById("mistable").children[0].children[4].children[i].children[1].innerHTML =  khdr[0].premium[0].rewards.row4[i].reward;
		document.getElementById("mistable").children[0].children[4].children[i].children[2].innerHTML =  khdr[0].premium[0].rewards.row4[i].mission;
		document.getElementById("mistable").children[0].children[4].children[i].children[0].src =  changeIcon(khdr[0].premium[0].rewards.row4[i].reward);
		
		document.getElementById("mistable").children[0].children[5].children[i].children[1].innerHTML =  khdr[0].premium[0].rewards.row5[i].reward;
		document.getElementById("mistable").children[0].children[5].children[i].children[2].innerHTML =  khdr[0].premium[0].rewards.row5[i].mission;
		document.getElementById("mistable").children[0].children[5].children[i].children[0].src =  changeIcon(khdr[0].premium[0].rewards.row5[i].reward);
	}
	removeEmpty();
	changeCardHeight();
};

function getEvent() {
	clearDiv()
	document.getElementById("completion").innerHTML = khdr[0].event[0].completion;
	document.getElementById("titimage").src = changeIcon(khdr[0].event[0].completion);
	document.getElementById("time").innerHTML = khdr[0].event[0].time;
	document.getElementById("title").innerHTML = "Event Missions";
	for(var i = 0; i < 5;  i++) {
		document.getElementById("mistable").children[0].children[1].children[i].children[1].innerHTML =  khdr[0].event[0].rewards.row1[i].reward;
		document.getElementById("mistable").children[0].children[1].children[i].children[2].innerHTML =  khdr[0].event[0].rewards.row1[i].mission;
		document.getElementById("mistable").children[0].children[1].children[i].children[0].src =  changeIcon(khdr[0].event[0].rewards.row1[i].reward);
		
		document.getElementById("mistable").children[0].children[2].children[i].children[1].innerHTML =  khdr[0].event[0].rewards.row2[i].reward;
		document.getElementById("mistable").children[0].children[2].children[i].children[2].innerHTML =  khdr[0].event[0].rewards.row2[i].mission;
		document.getElementById("mistable").children[0].children[2].children[i].children[0].src =  changeIcon(khdr[0].event[0].rewards.row2[i].reward);
		
		document.getElementById("mistable").children[0].children[3].children[i].children[1].innerHTML =  khdr[0].event[0].rewards.row3[i].reward;
		document.getElementById("mistable").children[0].children[3].children[i].children[2].innerHTML =  khdr[0].event[0].rewards.row3[i].mission;
		document.getElementById("mistable").children[0].children[3].children[i].children[0].src =  changeIcon(khdr[0].event[0].rewards.row3[i].reward);
		
		document.getElementById("mistable").children[0].children[4].children[i].children[1].innerHTML =  khdr[0].event[0].rewards.row4[i].reward;
		document.getElementById("mistable").children[0].children[4].children[i].children[2].innerHTML =  khdr[0].event[0].rewards.row4[i].mission;
		document.getElementById("mistable").children[0].children[4].children[i].children[0].src =  changeIcon(khdr[0].event[0].rewards.row4[i].reward);
		
		document.getElementById("mistable").children[0].children[5].children[i].children[1].innerHTML =  khdr[0].event[0].rewards.row5[i].reward;
		document.getElementById("mistable").children[0].children[5].children[i].children[2].innerHTML =  khdr[0].event[0].rewards.row5[i].mission;
		document.getElementById("mistable").children[0].children[5].children[i].children[0].src =  changeIcon(khdr[0].event[0].rewards.row5[i].reward);
	}
	removeEmpty();
	changeCardHeight();
};

// MONTHLY EVENTS
function getEvents() {
	clearDiv()
	for (var i = 0; i < khdr[0].other.length; i++) {
		var makeBut = document.createElement("button");
		makeBut.setAttribute("onClick", `getEvents1(${i})`);
		makeBut.textContent = khdr[0].other[i].name;
		console.log(makeBut);
		document.getElementById("div1").appendChild(makeBut);
		var whitesp = document.createTextNode("\u00A0");
		document.getElementById("div1").appendChild(whitesp);
	}
};

// LOAD MONTH LIST
function getEvents1(typ) {
	clearDiv()
	for (var i = 0; i < khdr[0].other.length; i++) {
		var makeBut = document.createElement("button");
		makeBut.setAttribute("onClick", `getEvents1(${i})`);
		makeBut.textContent = khdr[0].other[i].name;
		console.log(makeBut);
		document.getElementById("div1").appendChild(makeBut);
		var whitesp = document.createTextNode("\u00A0");
		document.getElementById("div1").appendChild(whitesp);
	}
	
	for (var i = 0; i < khdr[0].other[typ].list.length; i++) {
		var makeBut = document.createElement("button");
		makeBut.setAttribute("onClick", `getEvents2(${typ},${i})`);
		makeBut.textContent = khdr[0].other[typ].list[i].name;
		console.log(makeBut);
		document.getElementById("div2").appendChild(makeBut);
		var whitesp = document.createTextNode("\u00A0");
		document.getElementById("div2").appendChild(whitesp);
	}
};

// SET TABLE
function getEvents2(typ1, typ2) {
	document.getElementById("completion").innerHTML = khdr[0].other[typ1].list[typ2].completion;
	document.getElementById("titimage").src = changeIcon(khdr[0].other[typ1].list[typ2].completion);
	document.getElementById("time").innerHTML = khdr[0].other[typ1].list[typ2].time;
	document.getElementById("title").innerHTML =  khdr[0].other[typ1].list[typ2].name;
	for(var i = 0; i < 5;  i++) {
		document.getElementById("mistable").children[0].children[1].children[i].children[1].innerHTML =  khdr[0].other[typ1].list[typ2].rewards.row1[i].reward;
		document.getElementById("mistable").children[0].children[1].children[i].children[2].innerHTML =  khdr[0].other[typ1].list[typ2].rewards.row1[i].mission;
		document.getElementById("mistable").children[0].children[1].children[i].children[0].src =  changeIcon(khdr[0].other[typ1].list[typ2].rewards.row1[i].reward);
		
		document.getElementById("mistable").children[0].children[2].children[i].children[1].innerHTML =  khdr[0].other[typ1].list[typ2].rewards.row2[i].reward;
		document.getElementById("mistable").children[0].children[2].children[i].children[2].innerHTML =  khdr[0].other[typ1].list[typ2].rewards.row2[i].mission;
		document.getElementById("mistable").children[0].children[2].children[i].children[0].src =  changeIcon(khdr[0].other[typ1].list[typ2].rewards.row2[i].reward);
		
		document.getElementById("mistable").children[0].children[3].children[i].children[1].innerHTML =  khdr[0].other[typ1].list[typ2].rewards.row3[i].reward;
		document.getElementById("mistable").children[0].children[3].children[i].children[2].innerHTML =  khdr[0].other[typ1].list[typ2].rewards.row3[i].mission;
		document.getElementById("mistable").children[0].children[3].children[i].children[0].src =  changeIcon(khdr[0].other[typ1].list[typ2].rewards.row3[i].reward);
		
		document.getElementById("mistable").children[0].children[4].children[i].children[1].innerHTML =  khdr[0].other[typ1].list[typ2].rewards.row4[i].reward;
		document.getElementById("mistable").children[0].children[4].children[i].children[2].innerHTML =  khdr[0].other[typ1].list[typ2].rewards.row4[i].mission;
		document.getElementById("mistable").children[0].children[4].children[i].children[0].src =  changeIcon(khdr[0].other[typ1].list[typ2].rewards.row4[i].reward);
		
		document.getElementById("mistable").children[0].children[5].children[i].children[1].innerHTML =  khdr[0].other[typ1].list[typ2].rewards.row5[i].reward;
		document.getElementById("mistable").children[0].children[5].children[i].children[2].innerHTML =  khdr[0].other[typ1].list[typ2].rewards.row5[i].mission;
		document.getElementById("mistable").children[0].children[5].children[i].children[0].src =  changeIcon(khdr[0].other[typ1].list[typ2].rewards.row5[i].reward);
	}
	removeEmpty();
	changeCardHeight();
};
