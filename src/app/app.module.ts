/**Temp API ID */
//'e43b83b9cb9fa9598bb8c1fa4da2f00b';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './service/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { CurrentWeatherComponent } from './dashboard/current-weather/current-weather.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForcastWeatherComponent } from './dashboard/forcast-weather/forcast-weather.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NgModule } from '@angular/core';
import {TypeConversionService} from './service/type-conversion.service';
import { UserInfoComponent } from './user-info/user-info.component';
import {WeatherRequestService} from './service/weather-request.service';

const appRoutes: Routes = [
  { component: LoginComponent, path: '' },
  { component: LoginComponent, path: 'login', redirectTo: '' },
  { component: DashboardComponent, path: 'dashboard', canActivate: [AuthGuard] },
  { component: UserInfoComponent, path: 'info', canActivate: [AuthGuard] },
  { component: LoginComponent, path: '**' } /*wildcard router to avoid error */
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    DashboardComponent,
    UserInfoComponent,
    CurrentWeatherComponent,
    ForcastWeatherComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    WeatherRequestService,
    TypeConversionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
