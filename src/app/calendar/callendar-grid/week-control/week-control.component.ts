import {Component} from '@angular/core';
import {Months} from "../../../shared/consts/months";
import {SelectedMonthService} from "../../calendar-select/selected-month.service";
import {CalendarService} from "../../calendar.service";
import {Router} from "@angular/router";
import {decreaseWeek, increaseWeek} from 'src/app/shared/consts/generate-week';

@Component({
  selector: 'app-week-control',
  templateUrl: './week-control.component.html',
  styleUrls: ['./week-control.component.scss']
})
export class WeekControlComponent{
  public months: string[] = Months;
  public week = this.calendarService.week;
  // private newDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  constructor(private selectedMonth: SelectedMonthService,
              private router: Router,
              private calendarService: CalendarService,) {
  }

  public decrease(): void {
    this.week.next(decreaseWeek(this.week.value[0]));
    this.selectedMonth.changeMonth(this.week.value[0], this.week.value[6]);
  }

  public increase(): void {
    this.week.next(increaseWeek(this.week.value[0]));
    this.selectedMonth.changeMonth(this.week.value[0], this.week.value[6]);
  }

  public dayClick(weekday: Date): void {
    // const navigationDate = getValidDate(weekday);
    this.router.navigate(['/calendar', +weekday, 'view']);
  }

  public isDayActive(weekday: Date): boolean{
    // const weekdayDate = getValidDate(weekday);
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    return +weekday === +currentDate;
  }
}
