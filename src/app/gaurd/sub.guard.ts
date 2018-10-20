import { NotifyService } from '../services/notify.service';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

 @Injectable({providedIn: 'root'})
export class SubGuard implements CanActivate {

  constructor(private auth: AuthService, private notify: NotifyService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(
      take(1),
      map (user => user.roles.subscriber ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          this.notify.update('Access denied - Subscribers only', 'error')
          this.router.navigate(['/payment'], {queryParams: { returnUrl: state.url }})
        }
      })
    )
  }
}
