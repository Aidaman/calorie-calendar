import {Component, OnInit} from '@angular/core';
import {Months} from "../../shared/consts/months";
import {HoursEnum} from "../../shared/consts/hours.enum";
import {CalendarService} from "../calendar.service";
import {SelectedMonthService} from "../calendar-select/selected-month.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {loadMealsAction} from "../../store/calendar/calendar.action";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {hasMealsArrValueSelector, mealsArrSelector, weekSelector} from "../../store/calendar/selectors";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss', '../calendar.component.scss']
})
export class CalendarGridComponent implements OnInit {
  public months: string[] = Months;
  public hours: string[] = HoursEnum;
  public week$: BehaviorSubject<Date[]> = this.cService.week;
  public columns$: Observable<{ date: Date; meals: Map<string, ICalendarCell>}[]> = this.getMeals$();

  constructor(private cService: CalendarService,
              private router: Router,
              private store: Store,
              public selectedMonth: SelectedMonthService) { }

  ngOnInit(): void {}

  private getMeals$(): Observable<{ date: Date, meals: Map<string, ICalendarCell>}[]>{
    return this.store.select(hasMealsArrValueSelector).pipe(
      switchMap((hasValue: boolean)=>{
        if (!hasValue){
          this.store.dispatch(loadMealsAction());
        }
        return this.store.select(mealsArrSelector)
      }),
      map((meals: ICalendarCell[]) => {
        return this.week$.value.map((date) => {
          return {
            date,
            meals: meals.reduce((acc, meal) => {
              return +meal.date === +date ? acc.set(meal.time, meal) : acc
            }, new Map()) as Map<string, ICalendarCell>
          };
        })
      })
    );
  }

  public navigateFilledCell(date: Date, time: string) {
    date = new Date(+date);
    date.setHours(0,0,0,0);
    this.router.navigate(['/calendar', +date, time, 'view']);
  }

  public navigateEmptyCell(date: Date, time: string) {
    date = new Date(+date);
    date.setHours(0,0,0,0);
    this.router.navigate(['/calendar', +date, time, 'add']);
  }

  public increase(): void {
    this.cService.weekIncrease()
    this.columns$ = this.getMeals$();
  }

  public decrease(): void {
    this.cService.weekDecrease()
    this.columns$ = this.getMeals$();
  }
}
