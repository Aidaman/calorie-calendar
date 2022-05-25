import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {Store} from "@ngrx/store";
import {removeMealAction} from "../../store/calendar/calendar.action";
import {Observable} from "rxjs";
import {mealSelector} from "../../store/calendar/selectors";

@Component({
  selector: 'app-view-meal',
  templateUrl: './view-meal.component.html',
  styleUrls: ['./view-meal.component.scss', '../user-profile/user-profile.component.scss', '../custom-control/custom-control.component.scss']
})
export class ViewMealComponent {
  public date: Date = new Date(+this.activeRoute.snapshot.params['date']);
  public time: string = this.activeRoute.snapshot.params['time'];

  public meal$: Observable<ICalendarCell | undefined> = this.store.select(mealSelector(this.date, this.time));

  public title: string = '';

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private store: Store,) { }

  public deleteMeal(meal: ICalendarCell): void {
    this.store.dispatch(removeMealAction({id: meal.id}));
    this.router.navigate(['/calendar']);
  }
}
