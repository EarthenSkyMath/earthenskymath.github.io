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
