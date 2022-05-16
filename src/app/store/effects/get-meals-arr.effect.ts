import {Injectable} from "@angular/core";
import {CalendarService} from "../../calendar/calendar.service";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadMealAction, loadMealFailureAction, loadMealSuccessAction} from "../calendar/calendar.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class GetMealsArrEffect {
  getMealsAsync = createEffect(
    ()=>this.actions$.pipe(
      ofType(loadMealAction),
      switchMap( ()=>{
        return this.mealsService.getMealsAsync().pipe(
          map((mealsArr)=> loadMealSuccessAction({mealsArr})),
          catchError(()=>of(loadMealFailureAction()))
        )
      })
    )
  )

  constructor(private store: Store,
              private mealsService: CalendarService,
              private actions$: Actions,) {}
}
