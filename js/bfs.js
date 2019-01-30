function BFS(g, s) {
  console.log("BFS");
  let start = g[s.x*5+2][s.y*5+2];

  let kolejka = [];
  kolejka.push(start);

  //init
  for(let a = 0; a < 50; a++) {
    for(let b = 0; b < 50; b++) {
      g[a*5 + 2][b*5 + 2].odwiedzony = false;
    }
  }

  if(g[s.x-3] && g[s.x-3][s.y] && !g[s.x-3][s.y].odwiedzony) {
      kolejka.push(g[s.x-3][s.y]);
  }

  // East
  if(g[s.x+3] && g[s.x+3][s.y] && !g[s.x+3][s.y].odwiedzony) {
      kolejka.push(g[s.x+3][s.y]);
  }

  // South
  if(g[s.x] && g[s.x][s.y-3] && !g[s.x][s.y-3].odwiedzony) {
      kolejka.push(g[s.x][s.y-3]);
  }

  // North
  if(g[s.x] && g[s.x][s.y+3] && !g[s.x][s.y+3].odwiedzony) {
      kolejka.push(g[s.x][s.y+3]);
  }
  kolejka.shift().odwiedzony = true;

  let i = 0;

  while(kolejka.length) {
    console.log(i++);
    //console.log("aaa");
    let aktualny = kolejka.shift();
    if(g[aktualny.x-3] && g[aktualny.x-3][aktualny.y] && !g[aktualny.x-3][aktualny.y].odwiedzony) {
        kolejka.push(g[aktualny.x-3][aktualny.y]);
    }

    // East
    if(g[aktualny.x+3] && g[aktualny.x+3][aktualny.y] && !g[aktualny.x+3][aktualny.y].odwiedzony) {
        kolejka.push(g[aktualny.x+3][aktualny.y]);
    }

    // South
    if(g[aktualny.x] && g[aktualny.x][aktualny.y-3] && !g[aktualny.x][aktualny.y-3].odwiedzony) {
        kolejka.push(g[aktualny.x][aktualny.y-3]);
    }

    // North
    if(g[aktualny.x] && g[aktualny.x][aktualny.y+3] && !g[aktualny.x][aktualny.y+3].odwiedzony) {
        kolejka.push(g[aktualny.x][aktualny.y+3]);
    }

    aktualny.odwiedzony = true;
    if(aktualny.plant) {
      let priotytet = getPriority(aktualny.plant);
      console.log(priotytet);
      if(priotytet) {
        goToPos(aktualny.x, aktualny.y);
        break;
      }
    }
  }
  console.log("wyszlo");
}
