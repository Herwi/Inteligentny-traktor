let plants = [];
let plantsReady = false;

class Plant {
  constructor(roslina, typ) {
    this.roslina = roslina;
    this.nawodnienie = Math.floor((Math.random())*10)/10;
    this.naslonecznienie = Math.floor((Math.random())*10)/10;
    this.poziom_stresu = Math.floor((Math.random())*10)/10;
    //this.nawodnienie = 0.9;
    //this.naslonecznienie = 0.3;
    this.nawoz = 0.1;
    //this.poziom_stresu = 0.7;
    if(Math.round((Math.random())) == 0) {
      this.chwasty = 'nie';
    }
    else {
      this.chwasty = 'tak';
    }
    //this.wiek = Math.round(Math.random()*10) + 1;
    //this.dojrzala = 'nie';
    this.wiek = 0;
    this.dojrzala = 'nie';
	  this.typ = typ;
  }
}
function zaktualizujRosliny(){
  console.log("F Dziala");
  for(let i = 0; i < plants.length; i++) {
    let plancik = plants[i];
    if(plancik) {
      if(plancik.nawodnienie > 0) {
        plancik.nawodnienie = parseFloat((plancik.nawodnienie - 0.1).toFixed(2));
      }
      if(plancik.naslonecznienie > 0) {
        plancik.naslonecznienie = parseFloat((plancik.naslonecznienie - 0.1).toFixed(2));
      }
      if(plancik.poziom_stresu < 1) {
        plancik.poziom_stresu = parseFloat((plancik.poziom_stresu + 0.1).toFixed(2));
      }
      if(Math.round((Math.random())) == 0) {
        plancik.chwasty = 'nie';
      }
      else {
        plancik.chwasty = 'tak';
      }
      plancik.wiek += 1;
      if(plancik.wiek >= 30 && plancik.dojrzala == 'nie') { plancik.dojrzala='tak'; }
      console.log("Nawodnienie:" + plancik.nawodnienie + " Naslonecznienie:" + plancik.naslonecznienie + " Stres:" + plancik.poziom_stresu + " Chwast:" + plancik.chwast + " Wiek:" + plancik.wiek + " Wynik drzewa " + getPriority(plancik));
    }
  }
  /*plants.forEach(Plant => {
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
  });*/
}

function rozstawRosliny() {
  for(let i = 0; i < 3; i++) {
    plants.push(new Plant('Ogorek', 'kopane'));
    plants.push(new Plant('Pomidor', 'krzak'));
    plants.push(new Plant('Cebula', 'kopane'));
    plants.push(new Plant('Zyto', 'żniwa'));
    plants.push(new Plant('Ziemniaki', 'kopane'));
  }
  for(let i in plants) {
    let x = Math.floor(Math.random() * 16);
    let y = Math.floor(Math.random() * 16);
    while(true) {
      if(graph[x] && graph[x][y] && graph[x][y].color == null) {
        graph[x][y].plant = plants[i];
        graph[x][y].image = getPlantImage(plants[i].roslina);
        break;
      }
      else {
        x = Math.floor(Math.random() * 16);
        y = Math.floor(Math.random() * 16);
      }
    }
  }
  console.log("ROZSTAWIONE");
  drawMap();
  /*setInterval(function() {
    zaktualizujRosliny();
  }, 5000);*/
}

function getPlantImage(ros) {
  switch (ros) {
    case "Ogorek":
      return ogorek;
      break;
    case "Pomidor":
      return pomidor;
      break;
    case "Cebula":
      return cebula;
      break;
    case "Zyto":
      return zyto;
      break;
    case "Ziemniaki":
      return ziemniaki;
      break;
    default:
      return null;
  }
}
