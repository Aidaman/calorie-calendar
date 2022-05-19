import {Component, Input} from '@angular/core';
import {CalendarService} from "../calendar.service";
import {Store} from "@ngrx/store";
import {userSelector} from "../../store/user/selectors";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {mealsArrSelector} from "../../store/calendar/selectors";

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss', "../calendar.component.scss"]
})
export class CalendarHeaderComponent {
  // @Input('columns') meals: { date: Date, meals: Map<string, ICalendarCell> }[] = [];
  public meals$ = this.store.select(mealsArrSelector);
  public user$ = this.store.select(userSelector);
  public week = this.cService.week;
  constructor(private cService: CalendarService, private store: Store) {}
}
