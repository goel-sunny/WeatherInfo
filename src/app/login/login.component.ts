import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private myRouter: Router) { 
    
  }

  ngOnInit() {
  }

  logIn(username, key) {
    console.log('usernam      '+username+'            key '+key);
    let userCredentialsRecord: any = {};
    if (sessionStorage.getItem('currentUser') === null) {
      userCredentialsRecord.username = username;
      userCredentialsRecord.key = key;
      sessionStorage.setItem('currentUser', JSON.stringify(userCredentialsRecord));
       this.myRouter.navigate(['dashboard']); 
    } else {
      alert("Logout first from existing User");
    }
  }
}
