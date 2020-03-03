var i = 80;
function timedCount() {

  postMessage(i);
  i = i - 1;
  setTimeout("timedCount()",1000);

}

timedCount(); 