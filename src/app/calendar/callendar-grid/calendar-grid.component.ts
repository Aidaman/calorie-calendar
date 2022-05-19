import {Component, OnInit} from '@angular/core';
import {Months} from "../../shared/consts/months";
import {HoursEnum} from "../../shared/consts/hours.enum";
import {CalendarService} from "../calendar.service";
import {SelectedMonthService} from "../calendar-select/selected-month.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {loadMealsAction, weekChangeAction} from "../../store/calendar/calendar.action";
import {Observable, switchMap} from "rxjs";
import {hasMealsArrValueSelector, mealsArrSelector} from "../../store/calendar/selectors";
import {decreaseWeek, generateDaysArr, increaseWeek} from 'src/app/shared/consts/generate-week';
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {map} from "rxjs/operators";
// import {getValidDate} from "../../shared/consts/get-valid-date";

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss', '../calendar.component.scss']
})
export class CalendarGridComponent implements OnInit {
  public months: string[] = Months;
  public hours: string[] = HoursEnum;
  public week = this.cService.week;
  public meals$: Observable<ICalendarCell[]> = this.getMeals$();
  // public columns$: Observable<{ date: Date; meals: Map<string, ICalendarCell> }[]> = this.getMeals$();

  constructor(private cService: CalendarService,
              private router: Router,
              private store: Store,
              public selectedMonth: SelectedMonthService) { }

  ngOnInit(): void {
    const aMonday = new Date(new Date().setDate( new Date().getDate() - new Date().getDay()+1));
    this.cService.week.next(generateDaysArr(aMonday));
  }

  private getMeals$(): Observable<ICalendarCell[]>{
    return this.store.select(hasMealsArrValueSelector).pipe(
      switchMap((hasValue: boolean)=>{
        if (!hasValue){
          this.store.dispatch(loadMealsAction());
        }
        return this.store.select(mealsArrSelector)
      }),
      map((meals)=>{
        const newArray: ICalendarCell[] = []
        this.week.value.forEach((weekday)=>{
          meals.forEach((meal)=>{
              if (+weekday === +meal.date){
                newArray.push(meal);}
            })
          })
        return newArray;
      })
    );
  }

  // private getMeals$(): Observable<{ date: Date, meals: Map<string, ICalendarCell>}[]>{
  //   return this.store.select(hasMealsArrValueSelector).pipe(
  //     switchMap((hasValue: boolean)=>{
  //       if (!hasValue){
  //         this.store.dispatch(loadMealsAction());
  //       }
  //       return this.store.select(mealsArrSelector)
  //     }),
  //     map((meals) => {
  //
  //       return this.week.value.map((date) => {
  //         return {
  //           date,
  //           meals: meals.reduce((acc, meal) => {
  //             return +meal.date === +date ? acc.set(meal.time, meal) : acc
  //           }, new Map()) as Map<string, ICalendarCell>
  //         };
  //       })
  //     })
  //   );
  // }

  public navigateFilledCell(date: Date, time: string) {
    // const navigationDate = getValidDate(date);
    date.setHours(0,0,0,0);
    this.router.navigate(['/calendar', +date, time, 'view']);
  }

  public navigateEmptyCell(date: Date, time: string) {
    date.setHours(0,0,0,0);
    this.router.navigate(['/calendar', +date, time, 'add']);
  }

  public increase(): void {
    this.week.next(increaseWeek(this.week.value[0]));
    this.store.dispatch(weekChangeAction({week: this.week.value}));
    this.selectedMonth.changeMonth(this.week.value[0], this.week.value[6]);

    // this.columns$ = this.getMeals$();
    this.meals$ = this.getMeals$();
  }

  public decrease(): void {
    this.week.next(decreaseWeek(this.week.value[0]));
    this.store.dispatch(weekChangeAction({week: this.week.value}));
    this.selectedMonth.changeMonth(this.week.value[0], this.week.value[6]);

    // this.mcolumns$ = this.getMeals$();
    this.meals$ = this.getMeals$();
  }
}
