/*
  TODO: LIST
  - char inserts, #(67) will add char character #67 to the string, only works in strings and comments
*/


//this tells the code processor what to do
var processStageEnum = {
    FI_KEYS : 0,  //First Instance Keywords (look for what to do)
    AFTERKEY : 1, //ignores each char until it hits whitespace
    OUT : 2,      //print to the output
    SI_KEYS : 3,  //Second Instance Keywords (start looking for what type of variable is being defined)
    PUSH : 4,     //call a function
    COM : 5,      //comment line
    ENDLINE : 6   //this line of code is done
}
var nextProcessStage;  //used for queing a processStage
var processStage = processStageEnum.FI_KEYS;
var code;
var lineNumber = 1;
function runInit() {
  console.log('!runInit!');
  code = document.getElementById("textInputField").value;

  runCode();
}

//this loops through every character
var stopProg = false;
function runCode() {
  for (i = 0; i < code.length; i++) {
    if(stopProg === true)
      break;

    //TODO: Note: this slows down code a lot too.
    console.log(code[i] + " : #" + i + ", stage: " + processStage);

    switch(processStage) {
      case processStageEnum.FI_KEYS:
        checkFIKeywords();
        break;
      case processStageEnum.AFTERKEY:
        afterKeywords();
        break;
      case processStageEnum.OUT:
        toOutput();
        break;
      case processStageEnum.COM:
        comment();
        break;
      case processStageEnum.SI_KEYS:
        checkSIKeywords();
        break;
      default:
        alert("Ahahahhahaha!  Something broke.  This is never supposed to be called.  (^ w ^)");
        return;
    }
  }

  console.log("!endProgram!");
  console.log("¯¯¯¯¯¯¯¯¯¯¯¯");
  console.log("code: ");
  console.log(code);
  console.log("¯¯¯¯¯¯¯¯¯¯¯¯");
  console.log("processStage: " + processStage + ", nextProcessStage: " + nextProcessStage);
  console.log("outputType: " + outputType + ", outputString: " + outputString);

  endProgram();
}

//look for what to do
function checkFIKeywords() {
  switch(code[i]) {
    case " ": case String.fromCharCode(10): //10 is \n
      ignoreChar();
      break;
    case "=":
      processStage = processStageEnum.AFTERKEY;
      nextProcessStage = processStageEnum.OUT;
      break;
    case "c":
      processStage = processStageEnum.AFTERKEY;
      nextProcessStage = processStageEnum.COM;
      break;
    case "d":
      processStage = processStageEnum.AFTERKEY;
      nextProcessStage = processStageEnum.SI_KEYS;
      break;
    case "p":

      break;
    default:
      exitProgram();
      output.innerHTML += "&nbsp; ER:0 | You started line " + lineNumber + " with an incorrect keyword. <br>";
      return;
  }
}

//ignore any character until whitespace
function afterKeywords() {
  switch(code[i]) {
    case " ":
      processStage = nextProcessStage;
      nextProcessStage = undefined;
      break;
    default:
      ignoreChar();
      break;
  }
}

//this tells the output what to do with the characters
var outputTypeEnum = {
    NONE : 0,  //First Instance Keywords
    STRING : 1,  //Ignores each char until it hits whitespace
    VAR : 1,  //Ignores each char until it hits whitespace
}
var outputType = outputTypeEnum.NONE;  //used for queing a processStage
var outputString = "";  //used for queing a processStage
function toOutput() {
  if(outputType === outputTypeEnum.NONE) {
    switch(code[i]) {
      case "\"":  //start string
        outputType = outputTypeEnum.STRING;
        return;
      case ";":  //end line & output code
        output.innerHTML += outputString + "<br>";
        outputType = outputTypeEnum.NONE;
        outputString = "";

        endLine();
        return;
      default:
        ignoreChar();
        return;
    }
  }
  else if(outputType === outputTypeEnum.STRING) {
    switch(code[i]) {
      case "\"":  //end string
        outputType = outputTypeEnum.NONE;
        return;
      default:
        outputString += code[i];
        return;
    }
  }
  else {
    //TODO: incorperate VARs
  }
}

//ignore any character until line end (semicolon)
function comment() {
  switch(code[i]) {
    case ";":  //end line
      endLine();
      return;
    default:
      ignoreChar();
      return;
  }
}

function checkSIKeywords() {
  switch(code[i]) {
    case " ": case String.fromCharCode(10): //10 is \n
      ignoreChar();
      break;
    case "=":
      processStage = processStageEnum.AFTERKEY;
      nextProcessStage = processStageEnum.OUT;
      break;
    case "c":
      processStage = processStageEnum.AFTERKEY;
      nextProcessStage = processStageEnum.COM;
      break;
    case "d":
      processStage = processStageEnum.AFTERKEY;
      nextProcessStage = processStageEnum.DEFINE;
      break;
    case "p":

      break;
    default:
      exitProgram();
      output.innerHTML += "&nbsp; ER:3 | Incorrect type defined at line : " + lineNumber + " <br>";
      return;
  }
}

function ignoreChar() {
  //TODO: Note: this slows down code a lot too.
  console.log("^ : ignored");
}

//resets variables needed at the end of the line
function endLine() {
  processStage = processStageEnum.FI_KEYS;
  lineNumber++;
}

function endProgram() {
  output.innerHTML += "¯¯¯¯¯¯¯¯¯¯¯¯ <br>";

  processStage = processStageEnum.FI_KEYS;
  nextProcessStage = undefined;

  outputType = outputTypeEnum.NONE;
  if(outputString !== "") {
    outputString = "";
    output.innerHTML += "&nbsp; ER:2 | A value was left in output, did you miss a ( \" ) ? <br>";
  }

  lineNumber = 1;

  stopProg = false;
}

function exitProgram() {
  stopProg = true;
  output.innerHTML += "¯¯¯¯¯¯¯¯¯¯¯¯ <br>";
  output.innerHTML += "&nbsp; Exit Program at line: " + lineNumber + " <br>";
}
