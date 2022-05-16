import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {addMealAction, addMealFailureAction, addMealSuccessAction} from "../calendar/calendar.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {CalendarService} from "../../calendar/calendar.service";
import {of} from "rxjs";

@Injectable()
export class AddMealsEffect {
  addMeals$ = createEffect( ()=>this.actions$.pipe(
    ofType(addMealAction),
    switchMap(({meal})=>{
      return this.mealsService.addNewMeal(meal).pipe(
        map( (meals) => addMealSuccessAction({meals: meals})),
        catchError( ()=> of(addMealFailureAction)),
      )
    })
  ))

  constructor(private store: Store,
              private mealsService: CalendarService,
              private actions$: Actions,) {}
}
