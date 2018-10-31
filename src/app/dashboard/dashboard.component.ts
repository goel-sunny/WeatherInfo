import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForcastWeatherComponent } from './forcast-weather/forcast-weather.component';
import { TypeConversionService } from '../service/type-conversion.service';
import { WeatherRequestService } from '../service/weather-request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(ForcastWeatherComponent) forcastChild: ForcastWeatherComponent;
  @ViewChild(CurrentWeatherComponent) currentChild: CurrentWeatherComponent;
  /*first default value will be assign to the  */
  public lat: number;
  public lon: number;

  public CelFraFlag: boolean = true;
  @ViewChild('cel') cel: ElementRef;
  @ViewChild('fra') fra: ElementRef;


  public flag: boolean = false;
  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    /*default live location is tracked using navigator object */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.flag = true;
        this.cd.detectChanges();
      });
    } else {
      /**This is for live location detector on */
      alert('Turn on Live Location Detector');
    }
  }

  getWeatherInfo(cityname) {
    this.forcastChild.getForcastWeatherInfo.subscribe(() => {
      this.currentChild.getCurrentWeatherInfo.subscribe(() => {
        this.cd.detectChanges();
      });
    });


  }
  update(value) {

    if (value == 'c' && !this.CelFraFlag) {
      this.cel.nativeElement.style.backgroundColor = 'lightgreen';
      this.fra.nativeElement.style.backgroundColor = 'white';
      this.fra.nativeElement.style.color = 'white';
      this.CelFraFlag = true;
      this.forcastChild.getCelciusData();
      this.currentChild.getCelciusData();

    } 
    if(value == 'f' && this.CelFraFlag ) {
      this.fra.nativeElement.style.backgroundColor = 'lightgreen';
      this.cel.nativeElement.style.backgroundColor = 'white';
      this.cel.nativeElement.style.color = 'white';
      this.CelFraFlag = false;
      this.forcastChild.getFaraData();
      this.currentChild.getFaraData();

    }
  }
}
