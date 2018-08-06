import { Component, Injectable } from '@angular/core';
import * as firebase from "firebase";
//import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFireAuth } from "angularfire2/auth";

import {Observable} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth) {

    this.user = afAuth.authState;
   }

 

  login(){
      const provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.auth.signInWithPopup(provider);

  }

}
