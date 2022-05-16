import {Injectable} from "@angular/core";
import {ICalendarCell} from "../shared/interfaces/calendar-cell.interface";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {IdayKcals} from "../shared/interfaces/dayKcal";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public week: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>([]);
  // public week: BehaviorSubject<IWeekDay[]> = new BehaviorSubject<IWeekDay[]>([]);
  public mealsArr: ICalendarCell[] = this.getMeals()

  constructor(private store: Store) {}

  public generateTotalCaloriesArr(): IdayKcals[]{
    let dayKcalsArr: IdayKcals[] = [];
    for (const el of this.mealsArr) {
      let findVal = dayKcalsArr.find( d => {return d.date === el.date});
      if(!findVal){
        dayKcalsArr.push({date: el.date, amount: +el.kcal})
      } else{
        findVal.amount += (+el.kcal);
      }
    }
    return dayKcalsArr;
  }

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
