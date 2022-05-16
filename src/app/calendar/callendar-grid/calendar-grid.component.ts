import {Component, OnInit} from '@angular/core';
import {Months} from "../../shared/consts/months";
import {HoursEnum} from "../../shared/consts/hours.enum";
import {CalendarService} from "../calendar.service";
import {SelectedMonthService} from "../calendar-select/selected-month.service";
import {Router} from "@angular/router";
import {WeekControlService} from "./week-control/week-control.service";
import {Store} from "@ngrx/store";
import {loadMealAction} from "../../store/calendar/calendar.action";
import {Observable} from "rxjs";
import {mealsArrSelector} from "../../store/calendar/selectors";
import {decrease, increase } from 'src/app/shared/consts/generate-week';


@Component({
  selector: 'app-callendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss', '../calendar.component.scss']
})
export class CalendarGridComponent implements OnInit {
  //@Input() meals!: ICallendarCell[]
  public month: string = '';
  public months: string[] = Months;
  public hours: string[] = HoursEnum;
  public week = this.cService.week;
  public meals$ = this.store.select(mealsArrSelector);

  constructor(private cService: CalendarService,
              private router: Router,
              private store: Store,
              private weekControlService: WeekControlService,
              public selectedMonth: SelectedMonthService) { }

  ngOnInit(): void {
    this.store.dispatch(loadMealAction())
  }

  // public days: Observable<ICalendarCell[]> = this.store.select(mealsArrSelector).pipe(
  //  switchMap()
  //   map((meals) => {
  //     return this.cService.week.map((date) => {
  //       return {
  //         date,
  //         meals: meals.reduce((acc, meal) => +meal.date === +date ? acc.set(meal.time, meal.name) : acc, new Map()) as Map<number, string>
  //       };
  //     })
  //   })
  // );

  navigateFilledCell(date: Date, time: string) {
    this.router.navigate(['calendar', date, time, 'view']);
    // this.router.navigate(['calendar', `${date.getMonth()}-${date.getDate()}`, time, 'view']);
  }

  navigateEmptyCell(date: Date, time: string) {
    this.router.navigate(['calendar', `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`, time, 'add']);
    // this.router.navigate(['calendar', `${date.getMonth()}-${date.getDate()}`, time, 'add']);
  }

  public increase(): void {
    // this.weekControlService.increase();
    this.week.next(increase(this.week.value[0]));
  }

  public decrease(): void {
    // this.weekControlService.decrease();
    this.week.next(decrease(this.week.value[0]));
  }
}
