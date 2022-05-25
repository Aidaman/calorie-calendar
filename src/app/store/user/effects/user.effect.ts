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
      return this.uCervice.saveUser(user, this.uCervice.userId).pipe(
        map((res) => userUpdateSuccessAction({user: res})),
        catchError(()=> of(userUpdateFailureAction()) )
      );
    })
  ));

  userLogin$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(userLoginAction),
      switchMap( ({id})=> {
        return this.uCervice.loadUser(id).pipe(
          // @ts-ignore
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
