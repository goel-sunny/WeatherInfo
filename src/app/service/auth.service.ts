import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private myRouter: Router) { }

  isAuthenticateUser() {
    if (sessionStorage.getItem('currentUser') == null) {
      return false;
    }
    return true;
  }

  setUserCache() {

  }

  logout() {
     sessionStorage.clear(); 
    }
}
