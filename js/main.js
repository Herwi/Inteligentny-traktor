let graph = [];

let blockMoving = false;

let pos = { x: 2, y:2 };
let  canvas = null;
let ctx = null;

let canvas2 = null;
let ctx2 = null;

let canvas3 = null;
let ctx3 = null;

function drawMap() {
  ctx.clearRect(0, 0, 500, 500);
  for(let i in graph) {
    let row = graph[i];
    for(let j in row) {
      if(row[j].color) {
        ctx.fillStyle = row[j].color;
        ctx.fillRect(row[j].x*2, row[j].y*2, 2, 2);
      }
    }
  }
  ctx3.fillStyle = "#ff0000";
  ctx3.fillRect(pos.x*2 -4, pos.y*2 -4, 10, 10);
}

$( document ).ready(function () {
  canvas = document.getElementById("layer1");
  ctx = canvas.getContext("2d");
  canvas2 = document.getElementById("layer2");
  ctx2 = canvas2.getContext("2d");
  canvas3 = document.getElementById("layer3");
  ctx3 = canvas3.getContext("2d");
  for(let i = 0; i < 250; i++) {
    graph[i] = [];
    for(let j = 0; j < 250; j++) {
      let obj = {};
      obj.x = i;
      obj.y = j;
      obj.color = null;
      obj.walkable = true;
      graph[i][j] = obj;
    }
  }
  for(let i = 0; i < 50; i++) {
    for(let j = 0; j < 50; j++) {
      let r = Math.floor((Math.random() * 100) + 1);
      if(r <= 3) {
        for(let x = i*5; x < (i + 1) * 5; x++) {
          for(let y = j*5; y < (j + 1) * 5; y++) {
            //console.log("graph x:" + x + "(" + (i*10) + "," + ((i + 1) * 10) + ") y: " + y + "(" + (j*10) + "," + ((j + 1) * 10) + ")");
            graph[x][y].color = "#000000";
            graph[x][y].walkable = false;
          }
        }
      }
    }
  }
  console.log("LOADED");
  rozstawRosliny();
  drawMap();
  ctx3.fillRect(pos.x*2 -4, pos.y*2 -4, 10, 10);
  ctx2.fillStyle = "#c0c0c0";
  ctx2.fillRect(pos.x*2, pos.y*2, 2, 2);
});

function walkable(pos) {
  if(graph[pos.x] && graph[pos.x][pos.y] && graph[pos.x][pos.y].walkable) {
    for(let i = pos.x-2; i <= pos.x + 2; i++) {
      for(let j = pos.y-2; j <= pos.y + 2; j++) {
        if(!graph[i] || !graph[i][j] || !graph[i][j].walkable) {
          return false;
        }
      }
    }
    return true;
  }
  else {
    return false;
  }
}

function goThroughPath(path, i) {
  if(!i) i = 0;
  if(path.length-1 != i && path[i]) {
    blockMoving = true;
    ctx3.clearRect(pos.x*2 -4, pos.y*2 -4, 10, 10);
    pos.x = path[i].x;
    pos.y = path[i].y;
    ctx2.fillStyle = "#c0c0c0";
    ctx2.fillRect(pos.x*2, pos.y*2, 2, 2);
    ctx3.fillRect(pos.x*2 -4, pos.y*2 -4, 10, 10);
    positionChange();
    setTimeout(goThroughPath, 50, path, i+1);
  }
  else {
    blockMoving = false;
  }
}

window.onkeydown = function(event) {
  if(!blockMoving) {
    ctx3.clearRect(pos.x*2 -4, pos.y*2 -4, 10, 10);
    var keyPr = event.keyCode;
    //lewo
    if(keyPr == 37) {
      if(walkable({x: pos.x-1, y: pos.y})) { pos.x--; }
    }
    //gora
    if(keyPr == 38) {
      if(walkable({x: pos.x, y: pos.y-1})) { pos.y--; }
    }
    //prawo
    if(keyPr == 39) {
      if(walkable({x: pos.x+1, y: pos.y})) { pos.x++; }
    }
    //dol
    if(keyPr == 40) {
      if(walkable({x: pos.x, y: pos.y+1})) { pos.y++; }
    }
    positionChange();

    ctx2.fillStyle = "#c0c0c0";
    ctx2.fillRect(pos.x*2, pos.y*2, 2, 2);
    ctx3.fillRect(pos.x*2 -4, pos.y*2 -4, 10, 10);
  }
}

function positionChange() {
  $('#position').html('x: ' + pos.x + ' y: ' + pos.y);
}

function goToPos(x, y) {
  ctx2.clearRect(0, 0, 500, 500);
  goThroughPath(astar.search(graph, {x: pos.x, y: pos.y}, {x,y}));
}
