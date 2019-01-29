let plants = [];
let plantsReady = false;

class Plant {
  constructor(roslina, typ) {
    this.roslina = roslina;
    //this.nawodnienie = Math.floor((Math.random())*10)/10;
    //this.naslonecznienie = Math.floor((Math.random())*10)/10;
    //this.poziom_stresu = Math.floor((Math.random())*10)/10;
    this.nawodnienie = 0.9;
    this.naslonecznienie = 0.3;
    this.nawoz = 0.1;
    this.poziom_stresu = 0.7;
    if(Math.round((Math.random())) == 0) {
      this.chwasty = 'nie';
    }
    else {
      this.chwasty = 'tak';
    }
    //this.wiek = Math.round(Math.random()*10) + 1;
    //this.dojrzala = 'nie';
    this.wiek = 15;
    this.dojrzala = 'nie';
	this.typ = typ;
  }
}

function rozstawRosliny() {
  for(let i = 0; i < 10; i++) {
    plants.push(new Plant('Ogorek', 'kopane'));
    plants.push(new Plant('Pomidor', 'krzak'));
    plants.push(new Plant('Cebula', 'kopane'));
    plants.push(new Plant('Zyto', 'żniwa'));
    plants.push(new Plant('Ziemniaki', 'kopane'));
  }
  for(let i in plants) {
    let x = Math.floor(Math.random() * 50);
    let y = Math.floor(Math.random() * 50);
    while(true) {
      if(graph[x*5] && graph[x*5][y*5] && graph[x*5][y*5].color == null) {
        for(let x1 = x*5; x1 < (x + 1) * 5; x1++) {
          for(let y1 = y*5; y1 < (y + 1) * 5; y1++) {
            //console.log("graph x:" + x + "(" + (i*10) + "," + ((i + 1) * 10) + ") y: " + y + "(" + (j*10) + "," + ((j + 1) * 10) + ")");
            graph[x1][y1].color = "#42f471";
            graph[x1][y1].plant = plants[i];
          }
        }
        break;
      }
      else {
        x = Math.floor(Math.random() * 50);
        y = Math.floor(Math.random() * 50);
      }
    }
  }
  console.log("ROZSTAWIONE");
  drawMap();
  setInterval(function zaktualizujRosliny(){
    console.log("F Dziala");
    plants.forEach(Plant => {
      if(Plant.nawodnienie > 0) Plant.nawodnienie -= 0.1;
      if(Plant.naslonecznienie > 0)Plant.naslonecznienie -= 0.1;
      if(Plant.poziom_stresu < 1)Plant.poziom_stresu += 0.1;
      if(Math.round((Math.random())) == 0) {
        Plant.chwast = 'nie';
      }
      else {
        Plant.chwast = 'tak';
      }
      Plant.wiek += 1;
      console.log("Nawodnienie:" + Plant.nawodnienie + " Naslonecznienie:" + Plant.naslonecznienie + " Stres:" + Plant.poziom_stresu + " Chwast:" + Plant.chwast + " Wiek:" + Plant.wiek + " Wynik drzewa " + getPriority(Plant.roslina,Plant.nawodnienie, Plant.naslonecznienie, Plant.poziom_stresu, Plant.chwast, Plant.wiek, Plant.dojrzala, Plant.typ));
    });
  }, 5000);
}
