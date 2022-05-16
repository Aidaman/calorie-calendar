import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {CalendarService} from "../../calendar/calendar.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addMealFailureAction,
  addMealSuccessAction,
  removeMealAction, removeMealFailureAction,
  removeMealSuccessAction
} from "../calendar/calendar.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class RemoveMealsEffect{
  removeMeal$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(removeMealAction),
      switchMap(({date, time})=>{
        return this.mealsService.deleteMeal(date, time).pipe(
          map( (meals) => removeMealSuccessAction({meals: meals})),
          catchError( ()=> of(removeMealFailureAction)),
        )
      })
    ))

  constructor(private store: Store,
  private mealsService: CalendarService,
  private actions$: Actions,) {}
}
