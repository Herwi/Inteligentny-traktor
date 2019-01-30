let graph = [];

let blockMoving = false;

let pos = { x: 2, y:2 };
//mapa
let  canvas = null;
let ctx = null;

//ślad ruchów
let canvas2 = null;
let ctx2 = null;

//traktor
let canvas3 = null;
let ctx3 = null;

let licznik = 0;

let grass = new Image();
grass.onload = function () {
   licznik++;
}
grass.src = "img/grass.png";

let bush = new Image();
bush.onload = function () {
   licznik++;
}
bush.src = "img/bush.png";

let tractor = new Image();
tractor.onload = function () {
   licznik++;
}
tractor.src = "img/traktor.png";

// 0 - dół
// 1 - prawo
// 2 - góra
// 3 - lewo
let kierunek = 0;

function drawMap() {
  if(licznik == 3) {
    ctx.clearRect(0, 0, 512, 512);
    for(let i in graph) {
      let row = graph[i];
      for(let j in row) {
        ctx.drawImage(grass, i*32, j*32);
        if(row[j].image) {
          ctx.drawImage(row[j].image, i*32, j*32);
        }
        else if(row[j].color) {
          ctx.fillRect(i*32, j*32, 32, 32);
        }
      }
    }
    ctx3.drawImage(tractor, 0, kierunek*32, 32, 32, pos.x*32, pos.y*32, 32, 32);
  }
  else {
    setTimeout(function () {
      drawMap();
    }, 100);
  }
}

$( document ).ready(function () {
  canvas = document.getElementById("layer1");
  ctx = canvas.getContext("2d");
  canvas2 = document.getElementById("layer2");
  ctx2 = canvas2.getContext("2d");
  canvas3 = document.getElementById("layer3");
  ctx3 = canvas3.getContext("2d");
  for(let i = 0; i < 16; i++) {
    graph[i] = [];
    for(let j = 0; j < 16; j++) {
      let obj = {};
      obj.x = i;
      obj.y = j;
      obj.walkable = true;
      graph[i][j] = obj;
    }
  }
  for(let i = 0; i < 16; i++) {
    for(let j = 0; j < 16; j++) {
      let r = Math.floor((Math.random() * 100) + 1);
      if(r <= 3) {
        graph[i][j].image = bush;
        graph[i][j].walkable = false;
      }
    }
  }
  console.log("LOADED");
  //rozstawRosliny();
  drawMap();
});

function isCalkowite(cos) {
  let i = parseInt(cos*100);
  if(i%100 == 0) {
    return true;
  }
  else {
    return false;
  }
}

function walkable(pos) {
  if(isCalkowite(pos.x) && isCalkowite(pos.y)) {
    if(!graph[pos.x] || !graph[pos.x][pos.y] || !graph[pos.x][pos.y].walkable) {
      return false;
    }
    else {
      return true;
    }
  }
  else if(isCalkowite(pos.x)) {
    if(!graph[pos.x] || !graph[pos.x][Math.floor(pos.y)] || !graph[pos.x][Math.ceil(pos.y)] || !graph[pos.x][Math.floor(pos.y)].walkable || !graph[pos.x][Math.ceil(pos.y)].walkable) {
      return false;
    }
    else {
      return true;
    }
  }
  else {
    if(!graph[Math.floor(pos.x)] || !graph[Math.ceil(pos.x)] || !graph[Math.floor(pos.x)][pos.y] || !graph[Math.ceil(pos.x)][pos.y] || !graph[Math.floor(pos.x)][pos.y].walkable || !graph[Math.ceil(pos.x)][pos.y].walkable) {
      return false;
    }
    else {
      return true;
    }
  }
}

function goThroughPath(path, i) {
  if(!i) i = 0;
  if(path.length-1 != i && path[i]) {
    blockMoving = true;
    ctx3.clearRect(pos.x*32, pos.y*32, 32, 32);
    pos.x = path[i].x;
    pos.y = path[i].y;
    ctx3.drawImage(tractor, 0, kierunek*32, 32, 32, pos.x*32, pos.y*32, 32, 32);
    positionChange();
    setTimeout(goThroughPath, 50, path, i+1);
  }
  else {
    blockMoving = false;
  }
}

window.onkeydown = function(event) {
  if(!blockMoving) {
    ctx3.clearRect(pos.x*32, pos.y*32, 32, 32);
    var keyPr = event.keyCode;
    //lewo
    if(keyPr == 37) {
      if(walkable({x: Math.floor(pos.x-0.25), y: pos.y})) {
        kierunek = 3;
        pos.x -= 0.25;
      }
    }
    //gora
    if(keyPr == 38) {
      if(walkable({x: pos.x, y: Math.floor(pos.y-0.25)})) {
        kierunek = 2;
        pos.y -= 0.25;
      }
    }
    //prawo
    if(keyPr == 39) {
      if(walkable({x: Math.ceil(pos.x+0.25), y: pos.y})) {
        kierunek = 1;
        pos.x += 0.25;
      }
    }
    //dol
    if(keyPr == 40) {
      if(walkable({x: pos.x, y: Math.ceil(pos.y+0.25)})) {
        kierunek = 0;
        pos.y += 0.25;
      }
    }
    positionChange();

    //ctx2.fillStyle = "#c0c0c0";
    //ctx2.fillRect(pos.x*2, pos.y*2, 2, 2);
    ctx3.drawImage(tractor, 0, kierunek*32, 32, 32, pos.x*32, pos.y*32, 32, 32);
  }
}

function positionChange() {
  $('#position').html('x: ' + pos.x + ' y: ' + pos.y);
}

function goToPos(x, y) {
  ctx2.clearRect(0, 0, 500, 500);
  goThroughPath(astar.search(graph, {x: pos.x, y: pos.y}, {x,y}));
}
