let GRAFIKI = 15;

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
