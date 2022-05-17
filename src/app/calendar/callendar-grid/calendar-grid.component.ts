import {Component, OnInit} from '@angular/core';
import {Months} from "../../shared/consts/months";
import {HoursEnum} from "../../shared/consts/hours.enum";
import {CalendarService} from "../calendar.service";
import {SelectedMonthService} from "../calendar-select/selected-month.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {loadMealAction} from "../../store/calendar/calendar.action";
import {Observable} from "rxjs";
import {mealsArrSelector} from "../../store/calendar/selectors";
import {decreaseWeek, generateDaysArr, increaseWeek} from 'src/app/shared/consts/generate-week';


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
              public selectedMonth: SelectedMonthService) { }

  ngOnInit(): void {
    this.store.dispatch(loadMealAction());
    this.cService.week.next(generateDaysArr(new Date(new Date().setDate( new Date().getDate() - new Date().getDay()+1) )));
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
    const sMonth = date.getMonth() > 9? date.getMonth() : '0'+date.getMonth();
    const navigationDate = `${date.getDate()}-${sMonth}-${date.getFullYear()}`;
    this.router.navigate(['/calendar', navigationDate.toString(), time, 'view']);
  }

  navigateEmptyCell(date: Date, time: string) {
    const sMonth = date.getMonth() > 9? date.getMonth() : '0'+date.getMonth();
    const navigationDate = `${date.getDate()}-${sMonth}-${date.getFullYear()}`
    this.router.navigate(['/calendar', navigationDate.toString(), time, 'add']);
  }

  public increase(): void {
    this.week.next(increaseWeek(this.week.value[0]));
    this.selectedMonth.changeMonth(this.week.value[0], this.week.value[6]);
  }

  public decrease(): void {
    this.week.next(decreaseWeek(this.week.value[0]));
    this.selectedMonth.changeMonth(this.week.value[0], this.week.value[6]);
  }
}
