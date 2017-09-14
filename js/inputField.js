//Oh yeah, fuck this.

//!!
var textSelected = false;
function toggleTextSelected() {
  textSelected = !textSelected;  //place this at onClick();

  if(textSelected) {
    //document.getElementById("codeInputField").innerHTML += prompt(); //TODO: this
    startBlinkyTextCursorAnimation();
    document.getElementById("textInputField").style.backgroundColor = "#fed";  //change color
  }
  else {
    clearTimeout(blinkyTextCursorID);
    document.getElementById("textInputField").style.backgroundColor = "#eee";  //change color
    //hide cursor
    $("textCursor").hide();
    cursorOn = false
  }
}

//gets desktop keyboard input, not mobile.
var capsOn = false;
var shiftDown = false;
var ctrlOn = false;
document.addEventListener('keydown', function(event) {
    if(textSelected) {
      if(shiftDown === true && event.keyCode === 16) {
        return;
      }
      else if(event.keyCode === 20) {
        capsOn = !capsOn;
        return;
      }
      else if(event.keyCode === 16) {
        shiftDown = true;
        return;
      }
      else if(event.keyCode === 17) {
        ctrlOn = true;
        return;
      }

      //stop blinking while pressing these keys
      clearTimeout(blinkyTextCursorID);
      $("textCursor").show();
      blinkyTextCursorID = setTimeout(startBlinkyTextCursorAnimation, 400);

      if(event.keyCode === 8) {
        var text = $("#codeInputField").text();
        text = text.substring(0, text.length - 1)
        document.getElementById("codeInputField").innerHTML = text;
      }
      else if(ctrlOn === true) {
        //ctrl commands here.
      }
      else if(event.keyCode === 13) {
        document.getElementById("codeInputField").innerHTML += '<br>';
        textCursorYOffset++;
      }
      else {
        //this key is not affected by shift
        if(event.keyCode === 32) {
          document.getElementById("codeInputField").innerHTML += ' ';
          return;
        }

        if(shiftDown === true) {  //uppercase and different case
          if(event.keyCode === 186) {
            document.getElementById("codeInputField").innerHTML += ':';
          }
          else if(event.keyCode === 187) {
            document.getElementById("codeInputField").innerHTML += '+';
          }
          else if(event.keyCode === 222) {
            document.getElementById("codeInputField").innerHTML += '\"';
          }
          else if(event.keyCode <= 90 && event.keyCode >= 41) {
            document.getElementById("codeInputField").innerHTML += String.fromCharCode(event.keyCode);
          }
        }
        else if (capsOn === true) { //uppercase and regular case
          if(event.keyCode === 186) {
            document.getElementById("codeInputField").innerHTML += ';';
          }
          else if(event.keyCode === 187) {
            document.getElementById("codeInputField").innerHTML += '=';
          }
          else if(event.keyCode === 222) {
            document.getElementById("codeInputField").innerHTML += '\'';
          }
          else if(event.keyCode <= 90 && event.keyCode >= 41) {
            document.getElementById("codeInputField").innerHTML += String.fromCharCode(event.keyCode);
          }
        }
        else { //lowercase and regular case
          if(event.keyCode === 186) {
            document.getElementById("codeInputField").innerHTML += ';';
          }
          else if(event.keyCode === 187) {
            document.getElementById("codeInputField").innerHTML += '=';
          }
          else if(event.keyCode === 222) {
            document.getElementById("codeInputField").innerHTML += '\'';
          }
          else if(event.keyCode <= 90 && event.keyCode >= 41) {
            document.getElementById("codeInputField").innerHTML += String.fromCharCode(event.keyCode).toLowerCase();
          }

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
      else if(event.keyCode == 17) {
        ctrlOn = false;
      }
    }
})

//!TextCursor!
var textCursorXOffset = 0;
var textCursorYOffset = 0;
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
