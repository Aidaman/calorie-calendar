import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addMealAction,
  addMealFailureAction,
  addMealSuccessAction,
  loadMealsAction,
  loadMealsFailureAction,
  loadMealsSuccessAction,
  removeMealAction,
  removeMealFailureAction,
  removeMealSuccessAction,
  weekChangeAction, weekChangeFailureAction,
  weekChangeSuccessAction
} from "../calendar.action";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Store} from "@ngrx/store";
import {CalendarService} from "../../../calendar/calendar.service";

@Injectable()
export class CalendarEffect{
  addMeals$ = createEffect( ()=>this.actions$.pipe(
    ofType(addMealAction),
    switchMap(({meal})=>{
      return this.mealsService.addNewMeal(meal).pipe(
        map( (meals) => {
          return addMealSuccessAction({meals: meals})
        }),
        catchError( ()=> of(addMealFailureAction)),
      )
    })
  ));

  getMealsAsync$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(loadMealsAction),
      switchMap( ()=>{
        return this.mealsService.getMealsAsync().pipe(
          map((mealsArr)=> {
            console.log('got the meals', mealsArr);
            return loadMealsSuccessAction({mealsArr})
          }),
          catchError(()=>of(loadMealsFailureAction()))
        )
      })
    )
  );

  removeMeal$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(removeMealAction),
      switchMap(({date, time})=>{
        return this.mealsService.deleteMeal(date, time).pipe(
          map( (meals) => {
            return removeMealSuccessAction({meals: meals})
          }),
          catchError( ()=> of(removeMealFailureAction)),
        )
      })
    ));

  weekChanges$ = createEffect(
    ()=> {
      return this.actions$.pipe(
        ofType(weekChangeAction),
        switchMap(({week}) => {
          return this.mealsService.week.pipe(
            map((week) => weekChangeSuccessAction({week: week})),
            catchError(() => of(weekChangeFailureAction)));
        })
      );
    }
  )

  constructor(private store: Store,
              private mealsService: CalendarService,
              private actions$: Actions,) {}
}
