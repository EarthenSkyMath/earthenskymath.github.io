function start() {
  console.log('start');

  //This is jQuery
  $("#pageMidInfo").hide();
  $("textCursor").hide();
}

var textSelected = false;
function toggleTextSelected() { //?
  textSelected = !textSelected;  //place this at onClick();

  if(textSelected) {
    $("#textInputField").focus(); //this
    startBlinkyTextCursorAnimation();
  }
  else {
    clearTimeout(blinkyTextCursorID);
    //hide cursor
    $("textCursor").hide();
    cursorOn = false
  }
}

var cursorOn = false;
var blinkyTextCursorID;
function startBlinkyTextCursorAnimation() {
  cursorOn = !cursorOn;

  if(cursorOn) {
    $("textCursor").show();
  }
  else {
    $("textCursor").hide();
  }

  blinkyTextCursorID = setTimeout(startBlinkyTextCursorAnimation, 400);
}

var infoHidden = true;
function toggleInfo() {
  infoHidden =! infoHidden;

  if(infoHidden) {
    $("#pageMidInfo").hide();
  }
  else {
    $("#pageMidInfo").show();
  }
}
