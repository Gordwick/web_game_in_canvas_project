var score = 0;
var objective_pocz = 50;
var objective_kon = 80;
function start_the_game()
{
        myDiv = document.getElementById("punktacja_board");
                 myDiv.innerHTML = score;
                 $(".button1").fadeOut();
				$(".film").fadeOut();
				$('video').prop('muted', true);
                 setTimeout(function() {
 					$(".game_zone").fadeIn();  
                    $(".nav1").fadeIn();
                    $(".nav2").fadeIn();
                  }, 500);
                  //randomizeObjective();
                setTimeout(function() {
                   		prepareCanvas();
                   }, 500);

		startWorker();
}

function stop_the_game()
{
        $("#wynik").fadeIn();

        myDiv = document.getElementById("wynik");
        myDiv.innerHTML += "<h1 id=\"wynik_text\">Wynik: " + score + "</h1></br>";
		    myDiv.innerHTML += "<button class=\"button3\" onClick=\"window.location.reload();\">Jeszcze raz!!</button>";

}

function updateTextInput(val,el) {
    document.getElementById(el).value=val; 
  }

  var xmlHttp;
  function getRequestObject()      {
         if ( window.ActiveXObject)  {
              return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
          } else if (window.XMLHttpRequest)  {
             return (new XMLHttpRequest())  ;
          } else {
             return (null) ;
          }
    }
  function sendData()      {
         xmlHttp = getRequestObject() ;
         if (xmlHttp) {        
       try {
  
  
             var info = document.getElementById('textInput').value ;    
             var info2 = document.getElementById('textInput2').value ;  
  
             var url = "../cgi-bin/project_1_ti.py" ;
             var data = "power=" + encodeURIComponent(info) + "&angle=" + encodeURIComponent(info2) ;
             xmlHttp.onreadystatechange = handleResponse ;
             xmlHttp.open("POST", url, true);
             xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
             xmlHttp.send(data);
           }
           catch (e) {
             alert ("Nie mozna polaczyc sie z serwerem: " + e.toString()) ;
           }
         } else {
           alert ("Blad") ;
         }
    }
  function handleResponse()      {
      if (xmlHttp.readyState == 4) {
           if ( xmlHttp.status == 200 )  {
               response = xmlHttp.response;
               var dataJSON  = JSON.parse(response) ;
              play(dataJSON);
			
           }
      }  
  }

  function play(dataJSON)
  {
    var i,pkt,pkt2;
    alterCanvas();
    for (i = 6; i < 500; i+=2) {//moze lepsze do while pkt>0 and pkt<500 czy cos z walidacja
     pkt=dataJSON.elementy[i].y;
     pkt2=dataJSON.elementy[i+1].y;
     draw(i,300-pkt,i+1,300-pkt2);
    } 
    alterTheScore(dataJSON.elementy[500].y,objective_pocz,objective_kon);
  }

  function draw(pkt_x,pkt_y,pkt2_x,pkt2_y)
  {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "green"; 
    ctx.moveTo(pkt_x,pkt2_y);
    ctx.lineTo(pkt2_x,pkt2_y);
    ctx.stroke();


  }

function drawObjective(pocz,kon)
{
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = "5";
    ctx.strokeStyle = "red"; 
    ctx.moveTo(498,pocz);
    ctx.lineTo(500,pocz);
    ctx.stroke();
    ctx.beginPath(); 
    ctx.moveTo(498,kon);
    ctx.lineTo(500,kon);
    ctx.stroke();
    ctx.beginPath(); 
    ctx.moveTo(500,pocz);
    ctx.lineTo(500,kon);
    ctx.stroke();
    ctx.fillText("100-------",450, 100);
    ctx.fillText("200-------",450, 200);

}

function clearCanvas()
{
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 500, 300);

}



function prepareCanvas(){
clearCanvas();
drawObjective(objective_pocz,objective_kon);
drawStickPerson();
}

function alterCanvas(){
clearCanvas();
drawObjective(objective_pocz,objective_kon);
drawStickPersonAfterTheThrow();
}

function randomizeObjective(){
    objective_pocz = Math.floor((Math.random() *270) + 1);
    objective_kon=objective_pocz+30;
}

function alterTheScore(el,pocz,kon)
{
  if( 300-el < kon && 300-el > pocz)
			{
				var ppp = document.getElementById("punktacja_board");
				score= score + 1;
				ppp.innerHTML =score;
      }
      randomizeObjective();
      setTimeout(function() {prepareCanvas(objective_pocz,objective_kon);}, 500);
      //ppp.innerHTML =objective_pocz;
}

//--------------------------------------------------------
function drawStickPersonAfterTheThrow()
{
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  ctx.beginPath();
  ctx.lineWidth = "5";
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.moveTo(11,300);
  ctx.lineTo(21,280);
  ctx.lineTo(31,300);
  ctx.stroke();
  ctx.beginPath(); 
  ctx.moveTo(21,280);
  ctx.lineTo(26,260);
  ctx.lineTo(41,270);
  ctx.stroke();
  ctx.beginPath(); 
  ctx.moveTo(26,260)
  ctx.lineTo(16,270);
  ctx.lineTo(11,280);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(26, 250, 8,0,2*Math.PI);
  ctx.fill();

}


function drawStickPerson()
{
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  ctx.beginPath();
  ctx.lineWidth = "5";
  ctx.strokeStyle = "black"; 
  ctx.moveTo(11,300);
  ctx.lineTo(21,280);
  ctx.lineTo(31,300);
  ctx.stroke();
  ctx.beginPath(); 
  ctx.moveTo(21,280);
  ctx.lineTo(21,260);
  ctx.lineTo(41,260);
  ctx.stroke();
  ctx.beginPath(); 
  ctx.moveTo(21,260)
  ctx.lineTo(11,250);
  ctx.lineTo(6,240);
  ctx.stroke();
  ctx.beginPath();
ctx.fillStyle = "black";
  ctx.arc(21, 250, 8,0,2*Math.PI);
  
  ctx.fill();
  ctx.arc(6, 240, 5,0,2*Math.PI);
  //ctx.fillStyle = "red";
  ctx.fill();

}