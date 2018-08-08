import { Component, Injectable } from '@angular/core';
import * as firebase from "firebase";
//import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFireAuth } from "angularfire2/auth";

import {Observable} from 'rxjs';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: firebase.User;
  constructor(private auth: AuthServiceService) {
 
  }

  login(){
      this.auth.login();
     }
}
