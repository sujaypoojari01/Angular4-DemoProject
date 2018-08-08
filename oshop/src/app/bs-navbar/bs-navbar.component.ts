import { Component, OnInit } from "@angular/core";
import { AuthServiceService } from "../auth-service.service";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})

export class BsNavbarComponent {
 
  constructor(public auth: AuthServiceService) {}

  logout(){
    this.auth.logout();
  }
 
}
