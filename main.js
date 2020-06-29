window.onload = function () {
  let player = document.getElementById("blue-p-1");

  let redPlayers = document.getElementsByClassName("player-p-red");
  let bluePlayers = document.getElementsByClassName("player-p-blue");

  let offsideBoard = document.getElementById("isOffside");

  let ball = document.getElementById("ball");
  let ballParentPos;

  initalizePositions();

  let mouseXPos = 0;
  let mouseYPos = 0;

  let mousePos = (document.onmousemove = function (e) {
    if (player) {
      this.mouseYPos = e.clientY;
      this.mouseXPos = e.clientX;

      document.addEventListener("mousedown", (event) => {
        if (event.target.className.includes("player player-p-")) {
          player = document.getElementsByClassName(event.target.className)[0];
        }
      });
     
    }
    if (player) {

      player.appendChild(ball);
      player.style.position = "absolute";
      player.style.left = this.mouseXPos + "px";
      player.style.top = this.mouseYPos + "px";
      checkBallOwner();
    }
  });
  document.ondblclick = function () {
    let playerPos = parseInt(player.style.left.replace("px", ""));

    player = null;
  };

  function checkBallOwner() {
    
    if(ball.parentElement.classList.contains("player-p-blue")){
      blueOffsideCheck();
    }else{  
      redOffsideCheck();
    }
  }

  function initalizePositions() {
  
    bluePlayers[0].style.left = "110px";
    bluePlayers[1].style.left = "210px";
    bluePlayers[2].style.left = "310px";

    redPlayers[0].style.left = (screen.width - 110) + "px" ;
    redPlayers[1].style.left = (screen.width - 210) + "px" ;
    redPlayers[2].style.left = (screen.width - 310) + "px" ;
  }

  function blueOffsideCheck() {
    
    if(!ball.parentElement.classList.contains("player-p-blue")){
      return;
    }

    ballParentPos = parseInt(ball.parentElement.style.left.replace("px", ""));

    let bpArr = Array.from(bluePlayers).map((element)=>{
      return parseInt(element.style.left.replace("px",""));
    }).sort((a, b) => a - b);
    
    let farthestBluePlayer = bpArr[bpArr.length - 1];
    
    let rpArr = Array.from(redPlayers).map((element) => {
      return parseInt(element.style.left.replace("px",""));
    }).sort((a, b) => a - b);
    
    let farthestRedPlayer = rpArr[rpArr.length - 1];
    
    let isOffside = 
    ballParentPos < farthestBluePlayer && 
    ballParentPos < farthestRedPlayer &&
    farthestBluePlayer > farthestRedPlayer;

    changeOffsideBoard(isOffside);

  }

  function redOffsideCheck(){
    if(!ball.parentElement.classList.contains("player-p-red")){
      return;
    }

    ballParentPos = parseInt(ball.parentElement.style.left.replace("px", ""));

    let bpArr = Array.from(bluePlayers).map((element)=>{
      return parseInt(element.style.left.replace("px",""));
    }).sort((a, b) => a - b);
    
    let farthestBluePlayer = bpArr[0];
    
    let rpArr = Array.from(redPlayers).map((element) => {
      return parseInt(element.style.left.replace("px",""));
    }).sort((a, b) => a - b);
    
    let farthestRedPlayer = rpArr[0];
    
    let isOffside = 
    ballParentPos > farthestBluePlayer && 
    ballParentPos > farthestRedPlayer &&
    farthestBluePlayer > farthestRedPlayer;
    
    changeOffsideBoard(isOffside);

  }
  function changeOffsideBoard(isOffside){
    offsideBoard.parentElement.style.backgroundColor = isOffside ? 'orange' : 'greenyellow';
    offsideBoard.innerText = isOffside ? "OFFSIDE": "ONSIDE";

  }
};
