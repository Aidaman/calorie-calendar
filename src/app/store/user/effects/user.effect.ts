import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  userLoginAction, userLoginFailureAction,
  userLoginSuccessAction,
  userUpdateAction,
  userUpdateFailureAction,
  userUpdateSuccessAction
} from "../user.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Store} from "@ngrx/store";
import {UserDataService} from "../../../user-data.service";

@Injectable()
export class UserEffect{
  userUpdate$ = createEffect( ()=>this.actions$.pipe(
    ofType(userUpdateAction),
    switchMap( ({user})=>{
      return this.uCervice.saveUser(user).pipe(
        map((res) => userUpdateSuccessAction({user: res})),
        catchError(()=> of(userUpdateFailureAction()) )
      );
    })
  ));

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
  );

  constructor(private store: Store,
              private actions$: Actions,
              private uCervice: UserDataService){}
}
