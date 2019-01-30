let GRAFIKI = 25;

let licznik = 0;

let grass = [];
for(let i = 1; i <= 8; i++) {
  let obj = new Image();
  obj.onload = function () {
     licznik++;
  }
  obj.src = "img/grass" + i + ".png";
  grass.push(obj);
}

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

let ogorek = new Image();
ogorek.onload = function () {
   licznik++;
}
ogorek.src = "img/Ogorek.png";

let pomidor = new Image();
pomidor.onload = function () {
   licznik++;
}
pomidor.src = "img/Pomidor.png";

let cebula = new Image();
cebula.onload = function () {
   licznik++;
}
cebula.src = "img/Cebula.png";

let zyto = new Image();
zyto.onload = function () {
   licznik++;
}
zyto.src = "img/Zyto.png";

let ziemniaki = new Image();
ziemniaki.onload = function () {
   licznik++;
}
ziemniaki.src = "img/Ziemniaki.png";

let chrzan = new Image();
chrzan.onload = function () {
   licznik++;
}
chrzan.src = "img/Chrzan.png";

let fasola = new Image();
fasola.onload = function () {
   licznik++;
}
fasola.src = "img/Fasola.png";

let groszek = new Image();
groszek.onload = function () {
   licznik++;
}
groszek.src = "img/Groszek.png";

let kapusta = new Image();
kapusta.onload = function () {
   licznik++;
}
kapusta.src = "img/Kapusta.png";

let koperek = new Image();
koperek.onload = function () {
   licznik++;
}
koperek.src = "img/Koperek.png";

let kukurydza = new Image();
kukurydza.onload = function () {
   licznik++;
}
kukurydza.src = "img/Kukurydza.png";

let marchew = new Image();
marchew.onload = function () {
   licznik++;
}
marchew.src = "img/Marchew.png";

let papryka = new Image();
papryka.onload = function () {
   licznik++;
}
papryka.src = "img/Papryka.png";

let pietruszka = new Image();
pietruszka.onload = function () {
   licznik++;
}
pietruszka.src = "img/Pietruszka.png";

let salata = new Image();
salata.onload = function () {
   licznik++;
}
salata.src = "img/Salata.png";
