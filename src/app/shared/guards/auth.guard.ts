import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(
    private _authService: AuthService,
    private _router: Router
){ };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this._authService.user) {
        this._router.navigate(['/home']);
      }
    return !!this._authService.user;
  }
}
