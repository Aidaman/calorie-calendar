import {Injectable} from "@angular/core";
import {ICalendarCell} from "../shared/interfaces/calendar-cell.interface";
import {BehaviorSubject} from "rxjs";
import {IWeekDay} from "../shared/interfaces/week-day";
import {IdayKcals} from "../shared/interfaces/dayKcal";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public week: BehaviorSubject<IWeekDay[]> = new BehaviorSubject<IWeekDay[]>([]);
  public mealsArr: ICalendarCell[] = this.getMeals();

  public generateTotalCaloriesArr(): IdayKcals[]{
    let dayKcalsArr: IdayKcals[] = [];
    for (const el of this.mealsArr) {
      let findVal = dayKcalsArr.find( d=> {return d.date === el.date});
      if(!findVal){
        dayKcalsArr.push({date: el.date, amount: +el.kcal})
      } else{
        findVal.amount += (+el.kcal);
      }
    }
    return dayKcalsArr;
  }

  public getMeals(): ICalendarCell[]{
    return JSON.parse( localStorage.getItem('meals') as string ) || [];
  }
  public addNewMeal(calendarCell: ICalendarCell): void{
    const newArr: ICalendarCell[] = this.getMeals();
    newArr.push(calendarCell);
    localStorage.setItem('meals', JSON.stringify(newArr));
  }
  public deleteMeal(date: string, time: string): void{
    const newArr: ICalendarCell[] = this.getMeals().filter(meal => meal.date+' '+meal.time !== date+' '+time);
    localStorage.setItem('meals', JSON.stringify(newArr));
    this.mealsArr = newArr;
  }
}
