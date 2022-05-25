import {Component, Input} from '@angular/core';
import {CalendarService} from "../calendar.service";
import {Store} from "@ngrx/store";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {weekSelector} from "../../store/calendar/selectors";
import {userSelector} from "../../store/user/selectors";
import {Observable} from "rxjs";
import {IUser} from "../../shared/interfaces/user";

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss', "../calendar.component.scss"]
})
export class CalendarHeaderComponent {
  @Input('columns') meals: { date: Date, meals: Map<string, ICalendarCell> }[] = [];
  public user$: Observable<IUser> = this.store.select(userSelector);
  public week: Observable<Date[]> = this.store.select(weekSelector);

  constructor(private cService: CalendarService,
              private store: Store,) {}
}
