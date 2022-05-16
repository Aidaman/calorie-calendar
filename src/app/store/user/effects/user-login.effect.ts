import {Injectable} from "@angular/core";
import {UserDataService} from "../../../user-data.service";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {userLoginAction, userLoginFailureAction, userLoginSuccessAction} from "../user.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";


@Injectable()
export class UserLognEffect{
  userLogin$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(userLoginAction),
      switchMap( ()=> {
        return this.uCervice.loadUser().pipe(
          map((res)=> userLoginSuccessAction({user: res})),
          catchError(() =>  of(userLoginFailureAction()))
        );
      })
    )
  )

  constructor(private store: Store,
              private actions$: Actions,
              private uCervice: UserDataService){}
}
