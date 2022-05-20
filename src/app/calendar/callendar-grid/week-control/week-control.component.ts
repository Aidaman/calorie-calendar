import {Component} from '@angular/core';
import {Months} from "../../../shared/consts/months";
import {SelectedMonthService} from "../../calendar-select/selected-month.service";
import {CalendarService} from "../../calendar.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {weekSelector} from "../../../store/calendar/selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-week-control',
  templateUrl: './week-control.component.html',
  styleUrls: ['./week-control.component.scss']
})
export class WeekControlComponent{
  public months: string[] = Months;
  public week$: Observable<Date[]> = this.store.select(weekSelector);

  constructor(private selectedMonth: SelectedMonthService,
              private router: Router,
              private store: Store,
              private calendarService: CalendarService,) {
  }

  public decrease(): void {
    this.calendarService.weekDecrease();
  }

  public increase(): void {
    this.calendarService.weekIncrease();
  }

  public dayClick(weekday: Date): void {
    this.router.navigate(['/calendar', +weekday, '12:00', true, 'view']);
  }

  public isDayActive(weekday: Date): boolean{
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    return +weekday === +currentDate;
  }
}
