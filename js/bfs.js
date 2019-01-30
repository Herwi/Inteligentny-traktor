function BFS(g, s) {
  console.log("BFS");
  let start = g[s.x][s.y];

  let kolejka = [];
  kolejka.push(start);

  //init
  for(let a = 0; a < 16; a++) {
    for(let b = 0; b < 16; b++) {
      g[a][b].odwiedzony = false;
    }
  }

  if(g[s.x-1] && g[s.x-1][s.y] && !g[s.x-1][s.y].odwiedzony) {
      kolejka.push(g[s.x-1][s.y]);
  }

  // East
  if(g[s.x+1] && g[s.x+1][s.y] && !g[s.x+1][s.y].odwiedzony) {
      kolejka.push(g[s.x+1][s.y]);
  }

  // South
  if(g[s.x] && g[s.x][s.y-1] && !g[s.x][s.y-1].odwiedzony) {
      kolejka.push(g[s.x][s.y-1]);
  }

  // North
  if(g[s.x] && g[s.x][s.y+1] && !g[s.x][s.y+1].odwiedzony) {
      kolejka.push(g[s.x][s.y+1]);
  }
  kolejka.shift().odwiedzony = true;

  let i = 0;

  while(kolejka.length) {
    console.log(i++ + " : " + kolejka.length);
    //console.log("aaa");
    let aktualny = kolejka.shift();
    if(g[aktualny.x-1] && g[aktualny.x-1][aktualny.y] && !g[aktualny.x-1][aktualny.y].odwiedzony) {
        kolejka.push(g[aktualny.x-1][aktualny.y]);
    }

    // East
    if(g[aktualny.x+1] && g[aktualny.x+1][aktualny.y] && !g[aktualny.x+1][aktualny.y].odwiedzony) {
        kolejka.push(g[aktualny.x+1][aktualny.y]);
    }

    // South
    if(g[aktualny.x] && g[aktualny.x][aktualny.y-1] && !g[aktualny.x][aktualny.y-1].odwiedzony) {
        kolejka.push(g[aktualny.x][aktualny.y-1]);
    }

    // North
    if(g[aktualny.x] && g[aktualny.x][aktualny.y+1] && !g[aktualny.x][aktualny.y+1].odwiedzony) {
        kolejka.push(g[aktualny.x][aktualny.y+1]);
    }

    aktualny.odwiedzony = true;
    if(aktualny.plant) {
      let priotytet = getPriority(aktualny.plant);
      console.log(priotytet);
      if(priotytet) {
        goToPos(aktualny.x, aktualny.y, function() { zadbaj(aktualny); });
        break;
      }
    }
  }
  console.log("wyszlo");
}
