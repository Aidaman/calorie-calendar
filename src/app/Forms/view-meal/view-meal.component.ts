import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {CalendarService} from "../../calendar/calendar.service";
import {Months} from "../../shared/consts/months";
import {UserDataService} from "../../user-data.service";
import {Store} from "@ngrx/store";
import {removeMealAction} from "../../store/calendar/calendar.action";
import {Observable} from "rxjs";
import {IUser} from "../../shared/interfaces/user";

@Component({
  selector: 'app-view-meal',
  templateUrl: './view-meal.component.html',
  styleUrls: ['./view-meal.component.scss', '../user-profile/user-profile.component.scss', '../custom-control/custom-control.component.scss']
})
export class ViewMealComponent implements OnInit {
  public date: Date = new Date(+this.activeRoute.snapshot.params['date']);
  public time: string = this.activeRoute.snapshot.params['time'];
  public isDay: boolean = this.activeRoute.snapshot.params['isDay'] !== undefined;
  public meals: ICalendarCell[] = [];

  public meals$: Observable<ICalendarCell[]> = this.cService.mealsArr;
  public user$: Observable<IUser> = this.udService.user$;

  public title: string = '';
  public summaryfats: number = 0;
  public summaryprotein: number = 0;
  public summarycarbohydrates: number = 0;
  public summarykcal: number = 0;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private store: Store,
              private udService: UserDataService,
              private cService: CalendarService,) { }

  ngOnInit(): void {
    console.log(this.isDay)
    if(!this.isDay) {
      const newDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      newDate.setHours(0, 0, 0, 0);

      if (+this.date === +newDate) {
        this.title = 'Today';
      } else {
        const time = new Date(+this.date);
        let header = Months[time.getMonth()];
        header = (header.substr(0, 1).toUpperCase()) + (header.substr(1));

        this.title = `${header}-${time.getDate()}`
      }
    }
  }

  public generateMealsList(mealsArr: ICalendarCell[]): ICalendarCell[]{
      mealsArr.forEach((value)=>{
        if (+this.date === +value.date){
          this.meals.push(value);
        }
      });

      this.meals.forEach( value => {
        this.summaryfats += (+value.fats);
        this.summaryprotein += (+value.proteins);
        this.summarycarbohydrates += (+value.carbohydrates);
        this.summarykcal += (+value.kcal);
      } );
    return this.meals;
  }

  public deleteMeal(): void {
    this.store.dispatch(removeMealAction({date: this.date, time: this.time}));
    this.router.navigate(['/calendar']);
  }

  public deleteMealFromList(meal: ICalendarCell): void {
    this.store.dispatch(removeMealAction({date: meal.date, time: meal.time}));
    this.meals = this.meals.filter(obj => obj !== meal)
  }
}
