import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase";
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$= afAuth.authState;
   }

  login(){
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl',returnUrl);

     const provider = new firebase.auth.GoogleAuthProvider();
     this.afAuth.auth.signInWithPopup(provider);
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
