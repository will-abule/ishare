import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { NotifyService } from '../services/notify.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

 @Injectable({providedIn: 'root'})
export class UserGuard implements CanActivate {

  constructor(private auth: AuthService, private notify: NotifyService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.user.pipe(
        take(1),
        map (user => this.auth.users(user) ? true : false),
        tap(canView => {
          if (!canView) {
            this.notify.update('Access denied. Please login', 'error')
            this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }})
          }
        })
      );
  }
}

