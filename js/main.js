let graph = [];

let blockMoving = false;

let pos = { x: 0, y:0 };
//mapa
let  canvas = null;
let ctx = null;

//ślad ruchów
let canvas2 = null;
let ctx2 = null;

//traktor
let canvas3 = null;
let ctx3 = null;

let canvasR = null;
let ctxR = null;
let canvasA = null;
let ctxA = null;


let dzien = 0;
let cyklDzienny = null;

// 0 - dół
// 1 - prawo
// 2 - góra
// 3 - lewo
let kierunek = 0;

function drawMap() {
  if(licznik == GRAFIKI) {
    ctx.clearRect(0, 0, 512, 512);
    for(let i in graph) {
      let row = graph[i];
      for(let j in row) {
        ctx.drawImage(grass[getRandomIntInclusive(0,7)], i*32, j*32);
        if(row[j].image) {
          ctxR.drawImage(row[j].image, i*32, j*32);
        }
        else if(row[j].color) {
          ctxR.fillRect(i*32, j*32, 32, 32);
        }
      }
    }
    ctx3.drawImage(tractor, 0, kierunek*32, 32, 32, pos.x*32, pos.y*32, 32, 32);
    positionChange();
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
  canvasR = document.getElementById("layerR");
  ctxR = canvasR.getContext("2d");
  canvasA = document.getElementById("layerA");
  ctxA = canvasA.getContext("2d");
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
  rozstawRosliny();
  drawMap();
  dayUpdate();
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

function goThroughPath(path, callback, i, s, dir) {
  if(!i) i = 0;
  if(!s) s = 0;
  if(path.length-1 != i && path[i]) {
    if(i < path.length) {
      taskUpdate("Zmierzam do (" + path[i+1].x + "|" + path[i+1].y + ")");
    }
    blockMoving = true;
    ctx3.clearRect(pos.x*32, pos.y*32, 32, 32);
    if(s == 3) {
      pos.x = path[i].x;
      pos.y = path[i].y;
      i++;
      s = 0;
    }
    else {
      if(s == 0) {
        dir = { x: pos.x - path[i].x, y: pos.y - path[i].y };
      }
      if(dir.x == -1 && dir.y == 0) {
        kierunek = 1;
        pos.x += 0.25;
      }
      else if (dir.x == 0 && dir.y == -1) {
        kierunek = 0;
        pos.y += 0.25;
      }
      else if (dir.x == 1 && dir.y == 0) {
        kierunek = 3;
        pos.x -= 0.25;
      }
      else if (dir.x == 0 && dir.y == 1) {
        kierunek = 2;
        pos.y -= 0.25;
      }
      s++;
    }
    ctx3.drawImage(tractor, 0, kierunek*32, 32, 32, pos.x*32, pos.y*32, 32, 32);
    positionChange();
    setTimeout(goThroughPath, 100, path, callback, i, s, dir);
  }
  else {
    blockMoving = false;
    callback();
  }
}

/*sterowanie manualne
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
*/
function positionChange() {
  $('#position').html('x: ' + pos.x + ' y: ' + pos.y);
  ctx2.fillStyle = "#fff";
  ctx2.fillRect(pos.x * 32 + 14, pos.y * 32 + 14, 4, 4);
}

function goToPos(x, y, callback) {
  ctx2.clearRect(0, 0, 512, 512);
  goThroughPath(astar.search(graph, {x: pos.x, y: pos.y}, {x,y}), callback);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function taskUpdate(s) {
  $('#task').html('Zadanie: ' + s);
}

function dayUpdate() {
  $('#day').html('Dzien: ' + dzien);
}

function start() {
  cyklDzienny = setInterval(function() {
    zaktualizujRosliny();
  }, 15000);
  BFS(graph, pos);
}

function debug() {
  for(let i = 0; i < 16; i++) {
	for(let j = 0; j < 16; j++) {
		if(graph[i] && graph[i][j] && graph[i][j].plant) {
			ctx.fillStyle = "#ff0000";
			ctx.fillRect(i*32, j*32, 32, 32);
    }}}
}

function plantInfo() {
  for(let i = 0; i < 16; i++) {
	for(let j = 0; j < 16; j++) {
		if(graph[i] && graph[i][j] && graph[i][j].plant) {
			console.log("x: " + graph[i][j].x + "y: " + graph[i][j].y + " " + graph[i][j].plant.roslina);
    }}}
}
