import {Component, OnInit} from '@angular/core';
import {CalendarService} from "./calendar.service";
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  constructor(private calendarService: CalendarService) {
  }

  ngOnInit(): void {
    const aMonday = new Date(new Date().setDate( new Date().getDate() - new Date().getDay()+1));
    this.calendarService.weekGenerate(aMonday);
  }

}
