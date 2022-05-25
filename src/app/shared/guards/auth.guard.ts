import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {finalize, Observable, of, switchMap} from 'rxjs';
import { Store } from "@ngrx/store";
import { hasUserValueSelector } from "../../store/user/selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private hasValue: boolean = false;
  constructor(private store: Store, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(hasUserValueSelector).pipe(
        switchMap((hasValue)=>{
          this.hasValue = hasValue;
          return of(hasValue);
        }),
        finalize(()=>{
          if (!this.hasValue) this.router.navigate(['/']);
        })
    );
  }
}
