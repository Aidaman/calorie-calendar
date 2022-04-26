import {Component, OnInit} from '@angular/core';
import {Months} from "../../shared/consts/months";
import {HoursEnum} from "../../shared/consts/hours.enum";
import {CalendarService} from "../calendar.service";
import {SelectedMonthService} from "../calendar-select/selected-month.service";
import {Router} from "@angular/router";
import {WeekControlService} from "../week-control/week-control.service";

@Component({
  selector: 'app-callendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss', '../calendar.component.scss']
})
export class CalendarGridComponent implements OnInit {
  public month: string = '';
  public months: string[] = Months;
  public hours: string[] = HoursEnum;
  public week = this.cService.week;

  constructor(private cService: CalendarService,
              private router: Router,
              private weekControlService: WeekControlService,
              public selectedMonth: SelectedMonthService) { }

  ngOnInit(): void {
    this.cService.generateTotalCaloriesArr();
  }

  navigateFilledCell(date: string, time: string) {
    this.router.navigate(['calendar', date, time, 'view']);
  }

  navigateEmptyCell(date: string, time: string) {
    this.router.navigate(['calendar', date, time, 'add']);
  }

  public increase(): void {
    this.weekControlService.increase();
  }

  public decrease(): void {
    this.weekControlService.decrease();
  }
}
