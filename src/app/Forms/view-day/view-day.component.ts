import { Component, OnInit } from '@angular/core';
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {Observable, of, switchMap} from "rxjs";
import {IUser} from "../../shared/interfaces/user";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {removeMealAction} from "../../store/calendar/calendar.action";
import {mealsInDaySelector} from "../../store/calendar/selectors";
import {userSelector} from "../../store/user/selectors";
import {CalendarService} from "../../calendar/calendar.service";
import {UserDataService} from "../../user-data.service";

@Component({
  selector: 'app-view-day',
  templateUrl: './view-day.component.html',
  styleUrls: ['../view-meal/view-meal.component.scss', '../user-profile/user-profile.component.scss', '../custom-control/custom-control.component.scss']
})
export class ViewDayComponent implements OnInit{
  public date: Date = new Date(+this.activeRoute.snapshot.params['date']);
  public time: string = this.activeRoute.snapshot.params['time'];

  public today: Date = new Date();
  public title: string = '';
  public summaryFats: number = 0;
  public summaryProtein: number = 0;
  public summaryCarbohydrates: number = 0;
  public summaryKCal: number = 0;

  public meals$: Observable<ICalendarCell[]> = this.store.select(mealsInDaySelector(this.date)).pipe(
    switchMap((value)=>{
      this.summaryFats = 0;
      this.summaryProtein = 0;
      this.summaryCarbohydrates = 0;
      this.summaryKCal = 0;
        value.forEach( meal => {
          this.summaryFats += (+meal.fats);
          this.summaryProtein += (+meal.proteins);
          this.summaryCarbohydrates += (+meal.carbohydrates);
          this.summaryKCal += (+meal.kcal);
        });
        return of(value);
      })
  );
  public user$: Observable<IUser> = this.store.select(userSelector);

  constructor(private activeRoute: ActivatedRoute,
              private calendarService: CalendarService,
              private udService: UserDataService,
              private router: Router,
              private store: Store,) { }

  ngOnInit(): void {}

  public deleteMealFromList(meal: ICalendarCell): void {
    this.store.dispatch(removeMealAction({id: meal.id}));
  }

}
