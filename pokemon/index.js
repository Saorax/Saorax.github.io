//var num = Math.floor((Math.random() * 806) + 1);
var num = 163;
var numm = num + 1;
var score = 0;
var count = 0;
var timer;
var time = 60;

$(document).ready(function() {
  document.getElementById("poketimer").innerHTML = "Time Left: " + time;
  document.getElementById("pokeimage").src = "https://raw.githubusercontent.com/Saorax/pkmn/master/" + numm + ".png";
  $("#poketextbox").on("input", function(e) {
    this.style.textTransform = "capitalize";
    checkPoke(e.target.value);
  });

});
var yesbb = setInterval(function() {
  count++;
  timer = time - count;

  document.getElementById("poketimer").innerHTML = "Time Left: " + timer;
  if (count == time) {
    timeUp();
  }
}, 1000);

//reset interval
function timeUp() {
  clearInterval(yesbb);
  document.getElementById("poketextbox").style.visibility = "hidden";
  document.getElementById("pokebutton").style.visibility = "hidden";
  document.getElementById("pokescore").style.visibility = "hidden";
  document.getElementById("pokecorrect").style.visibility = "hidden";
  document.getElementById("poketimeup").innerHTML = "Time's Up!";
  document.getElementById("poketimeup1").innerHTML = "Your Score is " + score;
  document.getElementById("pokeagain").style.display = "inline";
  document.getElementById("pokeagain").innerHTML = "Try Again"
}

function tryAgain() {
  count = 0;
  timer = time;
  document.getElementById("poketextbox").style.visibility = "visible";
  document.getElementById("pokebutton").style.visibility = "visible";
  document.getElementById("pokescore").style.visibility = "visible";
  document.getElementById("pokeimage").style.visibility = "visible";
  document.getElementById("pokecorrect").style.visibility = "visible";
  document.getElementById("poketimeup").style.display = "none";
  document.getElementById("poketimeup1").style.display = "none";
  document.getElementById("pokeagain").style.display = "none";
  document.getElementById("poketimeup1").innerHTML = "Your Score is " + score;
  document.getElementById("poketimer").innerHTML = "Time Left: " + timer;
  changePoke();
  yesbb = setInterval(function() {
    count++;
    timer = time - count;
    document.getElementById("poketimer").innerHTML = "Time Left: " + timer;
    if (count == time) {
      timeUp();
    }
  }, 1000);
}

function changePoke() {
  num = Math.floor((Math.random() * 806) + 1);
  numm = num + 1
  document.getElementById("pokeimage").src = "https://raw.githubusercontent.com/Saorax/pkmn/master/" + numm + ".png";
  document.getElementById("poketextbox").value = "";

  if (document.getElementById("pokeagain").style.display !== "none") {
    score = 0;
  } else {
      score--;
  }
  document.getElementById("pokescore").innerHTML = "Score: " + score;
}


function checkPoke(g) {
  var guess = removeAccents(g.toLowerCase());
  console.log(document.getElementById("pokeimage").width);
  //var w = (document.getElementById("pokeimage").width) * 2;
  //var h = (document.getElementById("pokeimage").height) * 2;
  //document.getElementById("pokeimage").style.width = w + "px";
  //document.getElementById("pokeimage").style.height = h + "px";
  //console.log("Number: " + num, "\nName: " + pokemonNames[parseInt(num)].name, "Width: " + w, "Height: " + h);
  if (guess == removeAccents(pokemonNames[parseInt(num)].name)) {
    document.getElementById("pokecorrect").innerHTML = "Correct";
    document.getElementById("pokecorrect").style.color = "green";
    num = Math.floor((Math.random() * 807) + 1);
    numm = num + 1;
    document.getElementById("pokeimage").src = "https://raw.githubusercontent.com/Saorax/pkmn/master/" + numm + ".png";
    document.getElementById("poketextbox").value = "";
    score++;
    document.getElementById("pokescore").innerHTML = "Score: " + score;
  } else {
    document.getElementById("pokecorrect").innerHTML = "";
  }
}
