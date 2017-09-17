var output = document.getElementById("output");

function start() {
  console.log('start');

  //This is jQuery
  $("#pageMidInfo").hide();
  $("textCursor").hide();
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

//!DownloadScript!
function downloadFile(filename) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById("textInputField").value));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
