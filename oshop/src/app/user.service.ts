import { Injectable } from '@angular/core';
import { AppUser } from './model/app-user';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from "firebase";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db : AngularFireDatabase) { }

  save(user: firebase.User){
    this.db.object('user/'+ user.uid).update({
        name: user.displayName,
        email: user.email
    });
  }

  get(uid: string){
    return this.db.object('user/' + uid).valueChanges();
  }
}
