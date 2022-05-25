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
import {UserDataService} from "../../../user-data.service";

@Injectable()
export class CalendarEffect{
  addMeal$ = createEffect( ()=>this.actions$.pipe(
    ofType(addMealAction),
    switchMap(({meal})=>{
      return this.mealsService.addNewMeal(meal, this.udService.userId).pipe(
        map( (meals) => {
          return addMealSuccessAction({meal})
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
            const meals = mealsArr.find((value)=>value.userid === this.udService.userId);
            //@ts-ignore
            return loadMealsSuccessAction({id: meals.userid, mealsArr: meals.meals})
          }),
          catchError(()=>of(loadMealsFailureAction()))
        )
      })
    )
  );

  removeMeal$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(removeMealAction),
      switchMap(({id})=>{
        return this.mealsService.deleteMeal(id, this.udService.userId).pipe(
          map( (mealsArr) => {
            const meals = mealsArr.find((value)=>value.userid === this.udService.userId);
            //@ts-ignore
            return removeMealSuccessAction({meals: meals.meals})
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
              private udService: UserDataService,
              private actions$: Actions,) {}
}
