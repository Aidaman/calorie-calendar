import {Injectable} from "@angular/core";
import {ICalendarCell} from "../shared/interfaces/calendar-cell.interface";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import { Store } from "@ngrx/store";
import {decreaseWeek, generateDaysArr, increaseWeek} from "../shared/consts/generate-week";
import {weekChangeAction} from "../store/calendar/calendar.action";
import {SelectedMonthService} from "./calendar-select/selected-month.service";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public week: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>([]);

  constructor(private store: Store,
              public selectedMonth: SelectedMonthService){}

  public weekIncrease(): Date[] {
    this.week.next(increaseWeek(this.week.value[0]));
    this.store.dispatch(weekChangeAction({week: this.week.value}));
    this.selectedMonth.changeMonth(this.week.value[0], this.week.value[6]);
    return this.week.value
  }
  public weekDecrease(): Date[] {
    this.week.next(decreaseWeek(this.week.value[0]));
    this.store.dispatch(weekChangeAction({week: this.week.value}));
    this.selectedMonth.changeMonth(this.week.value[0], this.week.value[6]);
    return this.week.value
  }
  public weekGenerate(monday: Date): Date[] {
    this.week.next(generateDaysArr(monday));
    this.store.dispatch(weekChangeAction({week: this.week.value}));
    this.selectedMonth.changeMonth(this.week.value[0], this.week.value[6]);
    return this.week.value
  }

  public getMealsAsync(): Observable<{ userid: string; meals: ICalendarCell[] }[]>{
    return of(this.getMeals());
  }

  private getMeals(): { userid: string; meals: ICalendarCell[] }[]{
    return (JSON.parse( localStorage.getItem('meals') as string ) as {userid: string, meals: ICalendarCell[]}[]);
  }

  public addNewMeal(calendarCell: ICalendarCell, id: string): Observable<{ userid: string; meals: ICalendarCell[] }[]>{
    if(this.getMeals()){
      const meals = this.getMeals();
      meals.forEach((value)=>{
        if(value.userid === id){
          value.meals.push(calendarCell);
        }
      });
      localStorage.setItem('meals', JSON.stringify(meals));
      return of(meals);
    } else return throwError( ()=>'A problem with meals appeared');
  }

  public deleteMeal(mealId: string, userid: string): Observable<{ userid: string; meals: ICalendarCell[] }[]>{
    if(this.getMeals()){
      let meals = this.getMeals();
      meals.map((value)=>{
        if(value.userid === userid) value.meals = value.meals.filter((meal)=> meal.id !== mealId);
      });

      localStorage.setItem('meals', JSON.stringify(meals));
      return of(meals)
    } else return throwError( ()=>'A problem with meals appeared');
  }
}
