import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { WeatherRequestService } from '../service/weather-request.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService, private myRouter: Router) { }

  ngOnInit() {
  }

  dashboardScreen() {
    this.myRouter.navigate(["/dashboard"]);
  }

  logOut() {
    this.authService.logout();
    this.myRouter.navigateByUrl('');
  }

  userProfile(){
    this.myRouter.navigateByUrl('info');
  }
}
