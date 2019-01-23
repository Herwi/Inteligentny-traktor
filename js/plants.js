class Plant {
  constructor(roslina) {
    this.nawodnienie = Math.floor((Math.random())*10)/10;
    this.naslonecznienie = Math.floor((Math.random())*10)/10;
    this.poziom_stresu = Math.floor((Math.random())*10)/10;
    if(Math.round((Math.random())) == 0) {
      this.chwast = 'nie';
    }
    else {
      this.chwast = 'tak';
    }
    this.wiek = Math.round(Math.random()*10) + 1;
    this.dojrzala = 'nie';
  }
}
