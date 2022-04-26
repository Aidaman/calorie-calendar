import {Component, OnInit} from '@angular/core';
import {Months} from "../../shared/consts/months";
import {SelectedMonthService} from "../calendar-select/selected-month.service";
import {IWeekDay} from "../../shared/interfaces/week-day";
import {CalendarService} from "../calendar.service";
import {WeekControlService} from "./week-control.service";

@Component({
  selector: 'app-week-control',
  templateUrl: './week-control.component.html',
  styleUrls: ['./week-control.component.scss']
})
export class WeekControlComponent{
  public months: string[] = Months;
  public week = this.calendarService.week;

  constructor(private weekCtrlService: WeekControlService,
              private selectedMonth: SelectedMonthService,
              private calendarService: CalendarService) {
  }

  public decrease(): void {
    this.weekCtrlService.decrease()
  }

  public increase(): void {
    this.weekCtrlService.increase()
  }

  public dayClick(weekday: IWeekDay): void {
    this.weekCtrlService.dayClick(weekday);
  }

  public onMonthChanged(e: string): void {
    this.weekCtrlService.onMonthChanged(e);
  }
}
