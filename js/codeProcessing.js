/*
  TODO: LIST
  - char inserts, #(67) will add char character #67 to the string, only works in strings and comments
*/


//this tells the code processor what to do
var processStageEnum = {
    FI_KEYS : 0,  //First Instance Keywords
    AFTERKEY : 1, //ignores each char until it hits whitespace
    OUT : 2,      //print to the output
    DEFINE : 3,   //start looking for what type of variable is being defined
    SI_KEYS : 4,  //Second Instance Keywords
    PUSH : 5,     //call a function
    COM : 6,      //comment line
    ENDLINE : 7   //this line of code is done
}
var nextProcessStage;  //used for queing a processStage
var processStage = processStageEnum.FI_KEYS;
var code;
function runInit() {
  console.log('runInit');
  code = document.getElementById("textInputField").value;

  runCode();
}

//this loops through every character
function runCode() {
  for (i = 0; i < code.length; i++) {
    console.log(code[i] + " : #" + i);

    switch(processStage) {
      case processStageEnum.FI_KEYS:
        checkFIKeywords();
        //console.log('1');
        break;
      case processStageEnum.AFTERKEY:
        afterKeywords();
        //console.log('2');
        break;
      case processStageEnum.OUT:
        toOutput();
        //console.log('3');
        break;
      default:
        alert("Ahahahhahaha!  Something broke.  This is never supposed to be called.  (^ w ^)");
        return;
    }
  }

  console.log("!endProgram!");
  console.log("¯¯¯¯¯¯¯¯¯¯¯¯");
  console.log(code);
  console.log("¯¯¯¯¯¯¯¯¯¯¯¯");
  console.log("processStage: " + processStage + ", nextProcessStage: " + nextProcessStage);
  console.log("outputType: " + outputType + ", outputString: " + outputString);
}

function ignoreChar() {
  console.log("^ : ignored");
}

function checkFIKeywords() {
  switch(code[i]) {
    case " ": case String.fromCharCode(10): //10 is \n
      ignoreChar();
      break;
    case "=":
      processStage = processStageEnum.AFTERKEY;
      nextProcessStage = processStageEnum.OUT;
      break;
    case "d":

      break;
    case "p":

      break;
    default:
      alert("Oops you typed something wrong at the start of the line. ER:0");
      return;
  }
}

function afterKeywords() {
  switch(code[i]) {
    case " ":
      processStage = nextProcessStage;
      nextProcessStage = undefined;
      break;
    default:

      break;
  }
}

//this tells the output what to do with the characters.
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

//resets variables needed at line end
function endLine() {
  processStage = processStageEnum.FI_KEYS;
}

function stopProgram() {

}
