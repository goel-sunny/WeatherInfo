import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  public ApiCallCouter: any = [];
  public apiCallCouterData: any = {};
  constructor() { }


  ngOnInit() {
    let apiCall: any = {};
    let date = new Date();

    apiCall = JSON.parse(sessionStorage.getItem('apiCall'));
    apiCall.forEach(element => {
      this.apiCallCouterData = {};
      this.apiCallCouterData.key = element.key;
      this.apiCallCouterData.counter = 0;
      let iterator = 0, length = 0;
      length = element.keyData.length;
      element.keyData.forEach(element1 => {
        let curr_hr = date.getHours();
        let curr_min = date.getMinutes();
        let res = (curr_hr - element1.time_hr) * 60 + (curr_min - element1.time_min);
        if (res <= 10) {
          this.apiCallCouterData.counter++;
        }
        iterator++;

        if (iterator == length) {
          this.ApiCallCouter.push(this.apiCallCouterData);
        }
      });
    });
    
    /**setting of the Username and the API Key */
    (<HTMLInputElement> document.getElementById('username')).value =   JSON.parse(sessionStorage.getItem(('currentUser'))).username;
    (<HTMLInputElement> document.getElementById('key')).value =   JSON.parse(sessionStorage.getItem(('currentUser'))).key;
 
  }

  confirmCall(){
        let currentUser:any ={};
        currentUser.username = (<HTMLInputElement> document.getElementById('username')).value;
        currentUser.key = (<HTMLInputElement> document.getElementById('key')).value;
        sessionStorage.setItem('currentUser',JSON.stringify(currentUser));
  }
}
