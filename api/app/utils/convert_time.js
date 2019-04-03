'use strict'

String.prototype.paddingLeft = function (paddingValue) {
  return String(paddingValue + this).slice(-paddingValue.length);
};

class ConvertTime {
  static msToHMS (miliseconds) {
    let seconds = miliseconds / 1000;
    let hours = parseInt( seconds / 3600 );
    seconds = seconds % 3600;
    let minutes = parseInt( seconds / 60 ); 
    seconds = parseInt(seconds % 60);

    hours = hours.toString().padStart(2, "0")
    minutes = minutes.toString().padStart(2, "0")
    seconds = seconds.toString().padStart(2, "0")

    return `${hours}:${minutes}:${seconds}`
  }
}

module.exports = ConvertTime