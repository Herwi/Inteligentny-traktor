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
    this.nawoz = Math.floor((Math.random())*10)/10;;
    //this.poziom_stresu = 0.7;
    if(Math.round((Math.random())) == 0) {
      this.chwasty = 'nie';
    }
    else {
      this.chwasty = 'tak';
    }
    this.wiek = Math.round(Math.random()*10) + 1;
    //this.dojrzala = 'nie';
    //this.wiek = 0;
    this.dojrzala = 'nie';
	  this.typ = typ;
  }
}
function zaktualizujRosliny(){
  dzien++;
  dayUpdate();
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
	  if(plancik.nawoz > 0){
		  plancik.nawoz = parseFloat((plancik.nawoz - 0.1).toFixed(2));
	  }
      if(Math.round((Math.random())) == 0) {
        plancik.chwasty = 'nie';
      }
      else {
        plancik.chwasty = 'tak';
      }
      plancik.wiek += 1;
      if(plancik.wiek >= 30 && plancik.dojrzala == 'nie') { plancik.dojrzala='tak'; }
      console.log("Nawodnienie: " + plancik.nawodnienie + " Naslonecznienie: " + plancik.naslonecznienie + " Stres: " + plancik.poziom_stresu + " Nawoz: " + plancik.nawoz + " Chwast: " + plancik.chwasty + " Wiek: " + plancik.wiek + " Typ: " + plancik.typ + " Wynik drzewa: " + getPriority(plancik));
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

let roslinki = [
  {nazwa: 'Koperek', typ: 'zrywane'},
  {nazwa: 'Papryka', typ: 'krzak'},
  {nazwa: 'Ogorek', typ: 'kopane'},
  {nazwa: 'Pomidor', typ: 'krzak'},
  {nazwa: 'Cebula', typ: 'kopane'},
  {nazwa: 'Zyto', typ: 'zniwa'},
  {nazwa: 'Ziemniaki', typ: 'kopane'},
  {nazwa: 'Salata', typ: 'zrywane'},
  {nazwa: 'Burak', typ: 'kopane'},
  {nazwa: 'Marchew', typ: 'kopane'},
  {nazwa: 'Pietruszka', typ: 'kopane'},
  {nazwa: 'Fasola', typ: 'krzak'},
  {nazwa: 'Kukurydza', typ: 'zrywane'},
  {nazwa: 'Groszek', typ: 'krzak'},
  {nazwa: 'Kapusta', typ: 'zrywane'},
  {nazwa: 'Chrzan', typ: 'kopane'}
]

function rozstawRosliny() {
  for(let i = 0; i < 20; i++) {
    let a = getRandomInt(0, roslinki.length);
    plants.push(new Plant(roslinki[a].nazwa, roslinki[a].typ));
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
  plants.push(new Plant('Ogorek', 'kopane'));
  plants[plants.length-1].nawodnienie = 1;
  plants[plants.length-1].naslonecznienie = 1;
  plants[plants.length-1].poziom_stresu = 0;
  plants[plants.length-1].nawoz = 1;
  plants[plants.length-1].chwast = 'nie';
  plants[plants.length-1].wiek = 1;
  console.log("ROZSTAWIONE");
  drawMap();

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
    case "Chrzan":
      return chrzan;
      break;
    case "Fasola":
      return fasola;
      break;
    case "Groszek":
      return groszek;
      break;
    case "Kapusta":
      return kapusta;
      break;
    case "Koperek":
      return koperek;
      break;
    case "Kukurydza":
      return kukurydza;
      break;
    case "Marchew":
      return marchew;
      break;
    case "Papryka":
      return papryka;
      break;
    case "Pietruszka":
      return pietruszka;
      break;
    case "Salata":
      return salata;
      break;
    default:
      return null;
  }
}
function zadbaj(pole){
  let plant = pole.plant;
  console.log("zaczynam dbac o roslinke: " + plant.roslina + " x: " + pole.x + " y: " + pole.y);
  if(plant.nawodnienie < 1){
    setTimeout(function(){
      plant.nawodnienie = 1;
      console.log("Roslina nawodniona");
    }, 10);
  }

  if(plant.naslonecznienie < 1){
    setTimeout(function(){
      plant.naslonecznienie = 1;
      console.log("Roslina ustawiona w stronę słońca");
    }, 10);
  }

  if(plant.nawoz < 1){
    setTimeout(function(){
      plant.nawoz = 1;
      console.log("Roslina nawieziona");
    }, 10);
  }

  if(plant.chwast == 'tak'){
    setTimeout(function(){
      plant.chwast = 'tak';
      console.log("Roslina pozbawiona chwastow");
    }, 10);
  }

  if(plant.wiek >= 30) {
    pole.plant = null;
    ctxR.clearRect(pole.x*32, pole.y*32, 32, 32);
  }

}
