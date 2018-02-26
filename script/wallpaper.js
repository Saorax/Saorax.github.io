$("#summerBtn").click(setSummer);
function setSummer() {
  $("#seasonP").html("summer");
  $('body').css("background-image", "url(../image/summer.jpg)");
}

$("#springBtn").click(setSpring);
function setSpring() {
  $("#seasonP").html("spring");
  $('body').css("background-image", "url(../image/spring.jpg)");
}

$("#autumnBtn").click(setAutumn);
function setAutumn() {
  $("#seasonP").html("autumn");
  $('.seasons').css("background-image", "url(../image/autumn.jpg)");
}
$("#winterBtn").click(setWinter);
function setWinter() {
  $("#seasonP").html("winter");
  $('body').css("background-image", "url(../image/winter.jpg)");
}
