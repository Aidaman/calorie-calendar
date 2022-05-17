import {Component, OnInit} from '@angular/core';
import {Months} from "../../../shared/consts/months";
import {SelectedMonthService} from "../../calendar-select/selected-month.service";
import {CalendarService} from "../../calendar.service";
import {Router} from "@angular/router";
import {decreaseWeek, generateDaysArr, increaseWeek} from 'src/app/shared/consts/generate-week';

@Component({
  selector: 'app-week-control',
  templateUrl: './week-control.component.html',
  styleUrls: ['./week-control.component.scss']
})
export class WeekControlComponent{
  public months: string[] = Months;
  public week = this.calendarService.week;
  private newDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  // public isActive = this.week === new Date()

  constructor(private selectedMonth: SelectedMonthService,
              private router: Router,
              private calendarService: CalendarService) {
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
    const sMonth = weekday.getMonth() > 9? weekday.getMonth() : '0'+weekday.getMonth();
    const sDate = weekday.getDate() > 9? weekday.getDate() : '0'+weekday.getDate();
    const navigationDate = `${weekday.getDate()}-${sMonth}-${weekday.getFullYear()}`;
      this.router.navigate(['/calendar', navigationDate.toString(), 'view']);
  }

  public onMonthChanged(e: string): void {
    const dateOnMonth = new Date(this.week.value[0].getFullYear(), Months.indexOf(e));
    const monday = new Date(dateOnMonth.getFullYear(), dateOnMonth.getMonth(),
      (dateOnMonth.getDate() - dateOnMonth.getDate()+1)+(8-dateOnMonth.getDay()));

    generateDaysArr(monday);
  }

  public isDayActive(weekday: Date): boolean{
    const weekdayDate = new Date(weekday.getFullYear(), weekday.getMonth(), weekday.getDate());
    return weekdayDate === this.newDate;
  }
}
