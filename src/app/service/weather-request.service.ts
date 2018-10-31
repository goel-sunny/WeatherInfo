import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable()
export class WeatherRequestService {

  constructor(private http: HttpClient) {
  }

  sessionStorageApiCallSettings(key) {
    let apiCallData: any = {};
    let keyData: any = {};
    let date = new Date();
    let apiCall: any = [];
    if (sessionStorage.getItem('apiCall') === null) {
      apiCallData.key = key;
      apiCallData.keyData = [];
      keyData.time_hr = date.getHours();
      keyData.time_min = date.getMinutes();
      apiCallData.keyData.push(keyData);
      apiCall.push(apiCallData);
      sessionStorage.setItem('apiCall', JSON.stringify(apiCall));
    } else {
      apiCall = JSON.parse(sessionStorage.getItem('apiCall'));
      let iterator = 0;
      let flag = false;
      apiCall.forEach(element => {
        if (element.key == key) {
          let keyData: any = {};
          keyData.time_hr = date.getHours();
          keyData.time_min = date.getMinutes();
          apiCall[iterator].keyData.push(keyData);
          //  let  res = (time_hours-element.time_hr)*60 + (time_min-element.time_min);
          flag = true;
        }
        iterator++;
      });

      if (!flag) {
        let keyData: any = {};
        apiCallData = {};
        apiCallData.key = key;
        apiCallData.keyData = [];
        keyData.time_hr = date.getHours();
        keyData.time_min = date.getMinutes();
        apiCallData.key = key;
        apiCallData.keyData.push(keyData);
        apiCall.push(apiCallData);
      }
      sessionStorage.setItem('apiCall', JSON.stringify(apiCall));
    }
  }

  getForcastWeatherRequestByCityName(name) {
    let URL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + name + '&&APPID=' + JSON.parse(sessionStorage.getItem('currentUser')).key;
    this.sessionStorageApiCallSettings(JSON.parse(sessionStorage.getItem('currentUser')).key);
    return this.http.get(URL);
  }

  getForecastWeatherRequestByCordinates(lat, lon) {
    this.sessionStorageApiCallSettings(JSON.parse(sessionStorage.getItem('currentUser')).key);
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&&APPID=' + JSON.parse(sessionStorage.getItem('currentUser')).key);
  }

  getCurrentWeatherRequestByCityName(name) {
    let URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&&APPID=' + JSON.parse(sessionStorage.getItem('currentUser')).key;
    this.sessionStorageApiCallSettings(JSON.parse(sessionStorage.getItem('currentUser')).key);
    return this.http.get(URL);
  }

  getCurrentWeathertRequestByCordinates(lat, lon) {
    this.sessionStorageApiCallSettings(JSON.parse(sessionStorage.getItem('currentUser')).key);
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&&APPID=' + JSON.parse(sessionStorage.getItem('currentUser')).key);
  }




}

