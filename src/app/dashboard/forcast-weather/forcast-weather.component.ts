import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { TypeConversionService } from '../../service/type-conversion.service';
import { WeatherRequestService } from '../../service/weather-request.service';

declare var Chart: any;

@Component({
  selector: 'app-forcast-weather',
  templateUrl: './forcast-weather.component.html',
  styleUrls: ['./forcast-weather.component.css']
})
export class ForcastWeatherComponent implements OnInit {

  /**Latitute and longitute variable declaration */
  @Input() latitute: number;
  @Input() longitute: number;

  /**true for celciusm and false for far */
  @Input() CelFraFlag: boolean;

  /**@Var for Graph Chart */
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  /**Symbols */
  public symbolCelciusFar = 'C';
  public symbolMeterMiles = 'm/s';

  /*Current Weather Data*/
  public ForcastWeather: any = [];

  public labelTime: any = [];
  public dataTemp: any = [];

  /** */
  public labelName: any = [];
  public labelValue: any = [];


  public CityCountry;

  constructor(private cd: ChangeDetectorRef, private weatherReq: WeatherRequestService, private typeConversion: TypeConversionService) {

  }
  ngOnInit() {
    this.weatherReq.getForecastWeatherRequestByCordinates(this.latitute, this.longitute).subscribe((forcastData: any) => {
      this.CityCountry = forcastData.city.name;
      forcastData.list.forEach(data => {
        let SingleWeather: any = {};
        /**City name assign */
        // this.SingleWeather = data;

        /**In case of Fra */
        if (this.CelFraFlag) {
          SingleWeather.temperature_max = Math.round(this.typeConversion.kelvinToCelcius(data.main.temp_max));
          SingleWeather.temperature_min = Math.round(this.typeConversion.kelvinToCelcius(data.main.temp_min));
        } else {
          SingleWeather.temperature_max = this.typeConversion.KelvinToFarh((data.main.temp_max));
          SingleWeather.temperature_min = this.typeConversion.KelvinToFarh((data.main.temp_min));
        }

        SingleWeather.date = data.dt_txt;
        SingleWeather.cloudiness = data.weather[0].description;
        if (data.weather[0].main === 'Clear') {
          SingleWeather.icon = 1; /**1 clear , 2 cloud , 3 snow , 4 rain , 5  */
        } else if (data.weather[0].main === 'Clouds') {
          SingleWeather.icon = 2; /**1 clear , 2 cloud , 3 snow , 4 rain , 5  */
        } else if (data.weather[0].main === 'Rain') {
          SingleWeather.icon = 3; /**1 clear , 2 cloud , 3 snow , 4 rain , 5  */
        } else if (data.weather[0].main === 'Snow') {
          SingleWeather.icon = 4; /**1 clear , 2 cloud , 3 snow , 4 rain , 5  */
        }

        SingleWeather.humidity = data.main.humidity;
        SingleWeather.pressure = data.main.pressure;

        /** meter/sec and miles/hour decision */
        if (this.CelFraFlag) {
          SingleWeather.windspeed = data.wind.speed;
        } else {
          SingleWeather.windspeed = this.typeConversion.meterPerSecToMilesPerHr(data.wind.speed);
        }
        SingleWeather.cloud = data.clouds.all;
        this.ForcastWeather.push(SingleWeather);
        this.labelName.push(data.dt_txt);
        if (this.CelFraFlag) {
          this.labelValue.push(Math.round(this.typeConversion.kelvinToCelcius(data.main.temp)));
        } else {
          this.labelValue.push(Math.round(this.typeConversion.KelvinToFarh(data.main.temp)));
        }


        if (this.CelFraFlag) {
          this.symbolCelciusFar = 'C';
          this.symbolMeterMiles = 'm/s';
        } else {
          this.symbolCelciusFar = 'F';
          this.symbolMeterMiles = 'm/h';
        }

      });
      this.drawForecastChart(this.labelName, this.labelValue);
    });
  }

  getForcastWeatherInfo = new Observable((observer) => {
    let cityname = (<HTMLInputElement>(document.getElementById('weather-search'))).value;
    this.ForcastWeather = [];
    this.weatherReq.getForcastWeatherRequestByCityName(cityname).subscribe((forcastData: any) => {
      /**City name assign */
      this.CityCountry = forcastData.city.name;

      /**counter for observer  */
      let counter = 0, length;
      length = forcastData.list.length;
      forcastData.list.forEach(data => {
        let SingleWeather: any = {};

        // this.SingleWeather = data;

        /**In case of Fra */
        if (this.CelFraFlag) {
          SingleWeather.temperature_max = Math.round(this.typeConversion.kelvinToCelcius(data.main.temp_max));
          SingleWeather.temperature_min = Math.round(this.typeConversion.kelvinToCelcius(data.main.temp_min));
        } else {
          SingleWeather.temperature_max = this.typeConversion.KelvinToFarh(data.main.temp_max);
          SingleWeather.temperature_min = this.typeConversion.KelvinToFarh(data.main.temp_min);
        }

        SingleWeather.date = data.dt_txt;
        SingleWeather.cloudiness = data.weather[0].description;
        if (data.weather[0].main === 'Clear') {
          SingleWeather.icon = 1; /**1 clear , 2 cloud , 3 snow , 4 rain , 5  */
        } else if (data.weather[0].main === 'Clouds') {
          SingleWeather.icon = 2; /**1 clear , 2 cloud , 3 snow , 4 rain , 5  */
        } else if (data.weather[0].main === 'Rain') {
          SingleWeather.icon = 3; /**1 clear , 2 cloud , 3 snow , 4 rain , 5  */
        } else if (data.weather[0].main === 'Snow') {
          SingleWeather.icon = 4; /**1 clear , 2 cloud , 3 snow , 4 rain , 5  */
        }

        SingleWeather.humidity = data.main.humidity;
        SingleWeather.pressure = data.main.pressure;
        /** meter/sec and miles/hour decision */
        if (this.CelFraFlag) {
          SingleWeather.windspeed = data.wind.speed;
        } else {
          SingleWeather.windspeed = this.typeConversion.meterPerSecToMilesPerHr(data.wind.speed);
        }
        SingleWeather.cloud = data.clouds.all;
        this.ForcastWeather.push(SingleWeather);
        this.labelName.push(data.dt_txt);
        if (this.CelFraFlag) {
          this.labelValue.push(Math.round(this.typeConversion.kelvinToCelcius(data.main.temp)));
        } else {
          this.labelValue.push(Math.round(this.typeConversion.KelvinToFarh(data.main.temp)));
        }

        if (this.CelFraFlag) {
          this.symbolCelciusFar = 'C';
          this.symbolMeterMiles = 'm/s';
        } else {
          this.symbolCelciusFar = 'F';
          this.symbolMeterMiles = 'm/h';
        }

        counter++;
        if (counter == length) {
          console.log('inside the get forcast info ');
          observer.next();
        }
      });
      this.drawForecastChart(this.labelName, this.labelValue);
    }
    );
  });

  drawForecastChart(labelName, labelValue) {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    new Chart(this.context, {
      type: 'line',
      data: {
        labels: labelName,
        datasets: [
          {
            label: 'Temperature',
            borderColor: 'rgb(40, 167, 69',
            data: labelValue,
            fill: false
          }
        ]
      },
      options: {
      }
    });
  }

  getCelciusData() {

    this.symbolCelciusFar = 'C';
    this.symbolMeterMiles = 'm/s';

    for (let i = 0; i < this.ForcastWeather.length; i++) {
      this.ForcastWeather[i].temperature_max = this.typeConversion.FahrenheitToCelcius(this.ForcastWeather[i].temperature_max);
      this.ForcastWeather[i].temperature_min = this.typeConversion.FahrenheitToCelcius(this.ForcastWeather[i].temperature_min);
      this.ForcastWeather[i].windspeed = this.typeConversion.milesPerHrToMeterPerSec(this.ForcastWeather[i].windspeed);
      this.labelValue[i] = this.typeConversion.FahrenheitToCelcius(this.labelValue[i]);
    }
    this.drawForecastChart(this.labelName, this.labelValue);
    this.cd.detectChanges();
  }

  getFaraData() {
    this.symbolCelciusFar = 'F';
    this.symbolMeterMiles = 'm/h';

    console.log('inside the fara fucton   ');
    for (let i = 0; i < this.ForcastWeather.length; i++) {
      this.ForcastWeather[i].temperature_max = this.typeConversion.celciusToFahR(this.ForcastWeather[i].temperature_max);
      this.ForcastWeather[i].temperature_min = this.typeConversion.celciusToFahR(this.ForcastWeather[i].temperature_min);
      this.ForcastWeather[i].windspeed = this.typeConversion.meterPerSecToMilesPerHr(this.ForcastWeather[i].windspeed);
      this.labelValue[i] = this.typeConversion.celciusToFahR(this.labelValue[i]);
    }
    this.drawForecastChart(this.labelName, this.labelValue);
    this.cd.detectChanges();
  }

}
