import {Injectable} from "@angular/core";
import {UserDataService} from "../../../user-data.service";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {userUpdateAction, userUpdateFailureAction, userUpdateSuccessAction} from "../user.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class UserChangeEffect{
  userUpdate$ = createEffect( ()=>this.actions$.pipe(
      ofType(userUpdateAction),
      switchMap( ({user})=>{
        return this.uCervice.saveUser(user).pipe(
          map((res) => userUpdateSuccessAction({user: res})),
          catchError(()=> of(userUpdateFailureAction()) )
        );
      })
    ))

  constructor(private store: Store,
              private actions$: Actions,
              private uCervice: UserDataService){}
}
