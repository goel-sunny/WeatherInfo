import { Injectable } from '@angular/core';

@Injectable()

export class TypeConversionService {

  constructor() {

  }

  kelvinToCelcius(kelvin) {
    return kelvin - 273.15;
  }

  KelvinToFarh(kelvin) {
    return this.celciusToFahR(kelvin - 273.15);
  }

  unixTimeStampToTime(unix_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format 
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }

  meterPerSecToMilesPerHr(val) {
    let res: string;
    let dotIndex;
    res = (val * 2.23694).toString();
    dotIndex = res.indexOf('.');
    if (dotIndex >= 0) {
      res = res.substring(0, dotIndex + 3);
    } return res;
  }

  milesPerHrToMeterPerSec(val) {
    let res: string;
    let dotIndex;
    res = (val / 2.23694).toString();
    dotIndex = res.indexOf('.');
    if (dotIndex >= 0) {
      res = res.substring(0, dotIndex + 3);
    }

    return res;
  }

  celciusToFahR(calValue) {
    let res = (calValue * (9 / 5)) + 32;
    return Math.round(res);
  }

  FahrenheitToCelcius(val) {
    let res = (val - 32) * (5 / 9);
    return Math.round(res);
  }

}