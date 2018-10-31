import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { TypeConversionService } from '../../service/type-conversion.service';
import { WeatherRequestService } from '../../service/weather-request.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  /*first default value will be assign to the  */
  @Input() latitute: number;
  @Input() longitute: number;

  /**true for celciusm and false for far */
  @Input() CelFraFlag: boolean;

  /*Current Weather Data*/
  public CurrentWeather: any = {};
  public CityCountry;

  /**Symbols */
  public symbolCelciusFar = 'C';
  public symbolMeterMiles = 'm/s';

  constructor(private weatherReq: WeatherRequestService, private typeConversion: TypeConversionService) {

  }
  ngOnInit() {
    this.weatherReq.getCurrentWeathertRequestByCordinates(this.latitute, this.longitute).subscribe((data: any) => {

      /**City name assign */
      this.CityCountry = data.name + ', ' + data.sys.country;
      // this.CurrentWeather = data;
      if (this.CelFraFlag) {
        this.CurrentWeather.temperature = Math.round(this.typeConversion.kelvinToCelcius(data.main.temp));
      } else {
        this.CurrentWeather.temperature = Math.round(this.typeConversion.KelvinToFarh(data.main.temp));
      }
      this.CurrentWeather.cloudiness = data.weather[0].description;
      this.CurrentWeather.pressure = data.main.pressure;
      this.CurrentWeather.humidity = data.main.humidity;
      this.CurrentWeather.sunrise = this.typeConversion.unixTimeStampToTime(data.sys.sunrise);
      this.CurrentWeather.sunset = this.typeConversion.unixTimeStampToTime(data.sys.sunset);
      this.CurrentWeather.lon = data.coord.lon;
      this.CurrentWeather.lat = data.coord.lat;

      if (this.CelFraFlag) {
        this.CurrentWeather.windspeed = data.wind.speed;
      } else {
        this.CurrentWeather.windspeed = this.typeConversion.meterPerSecToMilesPerHr(data.wind.speed);
      }

      /**Setting wind direction on the behalf of angle or wind degree */
      this.CurrentWeather.winddeg = data.wind.deg;
      if (data.wind.deg == 0) {
        this.CurrentWeather.winddir = 'East';
      } else if (data.wind.deg < 90) {
        this.CurrentWeather.winddir = 'North East';
      } else if (data.wind.deg == 90) {
        this.CurrentWeather.winddir = 'North';
      } else if (data.wind.deg > 90 && data.wind.deg < 180) {
        this.CurrentWeather.winddir = 'North West';
      } else if (data.wind.deg == 180) {
        this.CurrentWeather.winddir = 'West';
      } else if (data.wind.deg > 180 && data.wind.deg < 270) {
        this.CurrentWeather.winddir = 'West South';
      } else if (data.wind.deg == 270) {
        this.CurrentWeather.winddir = 'South';
      } else if (data.wind.deg > 270 && data.wind.deg < 360) {
        this.CurrentWeather.winddir = 'South East';
      } else if (data.wind.deg == 360) {
        this.CurrentWeather.winddir = 'East';
      }

      if (this.CelFraFlag) {
        this.symbolCelciusFar = 'C';
        this.symbolMeterMiles = 'm/s';
      } else {
        this.symbolCelciusFar = 'F';
        this.symbolMeterMiles = 'm/h';
      }

    });
  }

  getCurrentWeatherInfo = new Observable((observer) => {
    let cityname = (<HTMLInputElement>(document.getElementById('weather-search'))).value;
    this.weatherReq.getCurrentWeatherRequestByCityName(cityname).subscribe((data: any) => {
      /**City name assign */
      this.CityCountry = data.name + ', ' + data.sys.country;
      // this.CurrentWeather = data;
      if (this.CelFraFlag) {
        this.CurrentWeather.temperature = Math.round(this.typeConversion.kelvinToCelcius(data.main.temp));
      } else {
        this.CurrentWeather.temperature = Math.round(this.typeConversion.KelvinToFarh(data.main.temp));
      }
      this.CurrentWeather.cloudiness = data.weather[0].description;
      this.CurrentWeather.pressure = data.main.pressure;
      this.CurrentWeather.humidity = data.main.humidity;
      this.CurrentWeather.sunrise = this.typeConversion.unixTimeStampToTime(data.sys.sunrise);
      this.CurrentWeather.sunset = this.typeConversion.unixTimeStampToTime(data.sys.sunset);
      this.CurrentWeather.lon = data.coord.lon;
      this.CurrentWeather.lat = data.coord.lat;


      if (this.CelFraFlag) {
        this.CurrentWeather.windspeed = data.wind.speed;
      } else {
        this.CurrentWeather.windspeed = this.typeConversion.meterPerSecToMilesPerHr(data.wind.speed);
      }

      /**Setting wind direction on the behalf of angle or wind degree */
      this.CurrentWeather.winddeg = data.wind.deg;
      if (data.wind.deg == 0) {
        this.CurrentWeather.winddir = 'East';
      } else if (data.wind.deg < 90) {
        this.CurrentWeather.winddir = 'North East';
      } else if (data.wind.deg == 90) {
        this.CurrentWeather.winddir = 'North';
      } else if (data.wind.deg > 90 && data.wind.deg < 180) {
        this.CurrentWeather.winddir = 'North West';
      } else if (data.wind.deg == 180) {
        this.CurrentWeather.winddir = 'West';
      } else if (data.wind.deg > 180 && data.wind.deg < 270) {
        this.CurrentWeather.winddir = 'West South';
      } else if (data.wind.deg == 270) {
        this.CurrentWeather.winddir = 'South';
      } else if (data.wind.deg > 270 && data.wind.deg < 360) {
        this.CurrentWeather.winddir = 'South East';
      } else if (data.wind.deg == 360) {
        this.CurrentWeather.winddir = 'East';
      }

      if (this.CelFraFlag) {
        this.symbolCelciusFar = 'C';
        this.symbolMeterMiles = 'm/s';
      } else {
        this.symbolCelciusFar = 'F';
        this.symbolMeterMiles = 'm/h';
      }

      console.log('inside the get current info ');
      observer.next();
    });
  });

  getCelciusData() {
    this.symbolCelciusFar = 'C';
    this.symbolMeterMiles = 'm/s';
    this.CurrentWeather.temperature = this.typeConversion.FahrenheitToCelcius(this.CurrentWeather.temperature);
    this.CurrentWeather.windspeed = this.typeConversion.milesPerHrToMeterPerSec(this.CurrentWeather.windspeed);
  }

  getFaraData() {
    this.symbolCelciusFar = 'F';
    this.symbolMeterMiles = 'm/h';
    this.CurrentWeather.temperature = this.typeConversion.celciusToFahR(this.CurrentWeather.temperature);
    this.CurrentWeather.windspeed = this.typeConversion.meterPerSecToMilesPerHr(this.CurrentWeather.windspeed);

  }
}