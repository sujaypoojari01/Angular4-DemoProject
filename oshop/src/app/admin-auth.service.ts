import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthServiceService } from "./auth-service.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminAuthService implements CanActivate {
  constructor(private auth: AuthServiceService) {}

  canActivate() {
    this.auth.user$.pipe(map(user => {}));
    return false;
  }
}
