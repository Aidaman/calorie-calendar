import { Component, OnInit } from '@angular/core';
import {CalendarService} from "../calendar.service";
import {findKCal} from "../../shared/consts/findKCal";

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss', "../calendar.component.scss"]
})
export class CalendarHeaderComponent {
  public meals = this.cService.getMealsAsync();
  public week = this.cService.week;
  constructor(private cService: CalendarService) { }
}
