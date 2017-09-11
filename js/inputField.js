function start() {
  console.log('start');

  //This is jQuery
  $("#pageMidInfo").hide();
  $("textCursor").hide();
}

//!!
var textSelected = false;
function toggleTextSelected() {
  textSelected = !textSelected;  //place this at onClick();

  if(textSelected) {
    //$("#textInputField").focus(); //TODO: this
    startBlinkyTextCursorAnimation();
  }
  else {
    clearTimeout(blinkyTextCursorID);
    //hide cursor
    $("textCursor").hide();
    cursorOn = false
  }
}

//gets desktop keyboard input, not mobile.
var capsOn = false;
var shiftDown = false;
document.addEventListener('keydown', function(event) {
    if(textSelected) {
      if(shiftDown === true && event.keyCode === 16) {
        return;
      }
      else if(event.keyCode === 8) {
        var text = $("#codeInputField").text();
        text = text.substring(0, text.length - 1)
        document.getElementById("codeInputField").innerHTML = text;
      }
      else if(event.keyCode === 13) {
        alert('enter');
      }
      else if(event.keyCode === 20) {
        capsOn = !capsOn;
      }
      else if(event.keyCode === 16) {
        shiftDown = true;
      }
      else {
        if(shiftDown === true) {  //uppercase;
          document.getElementById("codeInputField").innerHTML += String.fromCharCode(event.keyCode);
        }
        else if (capsOn === true) {
          document.getElementById("codeInputField").innerHTML += String.fromCharCode(event.keyCode);
        }
        else { //lowercase;
          document.getElementById("codeInputField").innerHTML += String.fromCharCode(event.keyCode).toLowerCase();
        }
        console.log('key = ' + event.keyCode);
      }
    }
})

document.addEventListener('keyup', function(event) {
    if(textSelected) {
      if(event.keyCode == 16) {
        shiftDown = false;
      }
    }
})

//!TextCursor!
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

//!InfoPanelToggle!
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
