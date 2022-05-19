import {Injectable} from "@angular/core";
import {ICalendarCell} from "../shared/interfaces/calendar-cell.interface";
import {BehaviorSubject, Observable, of, switchMap, throwError} from "rxjs";
// import {weekChangeAction} from "../store/calendar/calendar.action";
// import {Store} from "@ngrx/store";
// import {hasWeekValueSelector, weekSelector} from "../store/calendar/selectors";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public week: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>([]);
  public mealsArr: ICalendarCell[] = this.getMeals()

  public getMealsAsync(): Observable<ICalendarCell[]>{
    return of(this.getMeals());
  }
  public getMeals(): ICalendarCell[]{
    return JSON.parse( localStorage.getItem('meals') as string ) as ICalendarCell[] || [];
  }

  public addNewMeal(calendarCell: ICalendarCell): Observable<ICalendarCell[]>{
    const newArr: ICalendarCell[] = this.getMeals();
    newArr.push(calendarCell);
    localStorage.setItem('meals', JSON.stringify(newArr));
    return of(newArr)
  }
  public deleteMeal(date: Date, time: string): Observable<ICalendarCell[]>{
    const newArr: ICalendarCell[] = this.getMeals().filter(meal => meal.date+' '+meal.time !== date+' '+time);
    localStorage.setItem('meals', JSON.stringify(newArr));
    return of(newArr) || throwError('A problem with deleting the meal appeared');
  }
}
