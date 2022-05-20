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
  public mealsArr: Observable<ICalendarCell[]> = this.getMealsAsync()

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

  public getMealsAsync(): Observable<ICalendarCell[]>{
    return of(this.getMeals());
  }
  private getMeals(): ICalendarCell[]{
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
