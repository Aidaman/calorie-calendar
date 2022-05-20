import {Component, Input} from '@angular/core';
import {CalendarService} from "../calendar.service";
import {Store} from "@ngrx/store";
import {userSelector} from "../../store/user/selectors";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {mealsArrSelector, weekSelector} from "../../store/calendar/selectors";
import {UserDataService} from "../../user-data.service";

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss', "../calendar.component.scss"]
})
export class CalendarHeaderComponent {
  @Input('columns') meals: { date: Date, meals: Map<string, ICalendarCell> }[] = [];
  public user$ = this.udService.user$;
  public week = this.store.select(weekSelector);

  constructor(private cService: CalendarService,
              private store: Store,
              private udService: UserDataService,) {}
}
