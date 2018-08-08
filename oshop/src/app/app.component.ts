import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 constructor(private userService: UserService, private auth: AuthServiceService, router:Router){

  auth.user$.subscribe(user => {
    if(user) {
      // calls userSevice to save the user details in database
      this.userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      router.navigateByUrl(returnUrl);
    }
  })
 }
}
