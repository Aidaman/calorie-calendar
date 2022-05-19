import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {CalendarService} from "../../calendar/calendar.service";
import {findMeal} from "../../shared/consts/findMeal";
import {Months} from "../../shared/consts/months";
import {UserDataService} from "../../user-data.service";
import {Store} from "@ngrx/store";
import {removeMealAction} from "../../store/calendar/calendar.action";

@Component({
  selector: 'app-view-meal',
  templateUrl: './view-meal.component.html',
  styleUrls: ['./view-meal.component.scss', '../user-profile/user-profile.component.scss', '../custom-control/custom-control.component.scss']
})
export class ViewMealComponent implements OnInit {
  private date: Date = this.activeRoute.snapshot.params['date']
  public time: string = this.activeRoute.snapshot.params['time'];

  private meal?: ICalendarCell = findMeal(this.date, this.time, this.cService.mealsArr);

  public title?: string = this.meal?.title;
  public kcal?: number = this.meal?.kcal;
  public protein?: number = this.meal?.proteins;
  public carbohydrates?: number = this.meal?.carbohydrates;
  public fats?: number = this.meal?.fats;
  public img?: string = this.meal?.image;

  public meals: ICalendarCell[] = []

  public userMinKCal: number = this.udService.minCal;
  public userFats: number = this.udService.fats;
  public userProteins: number = this.udService.proteins;
  public userCarbohydrates: number = this.udService.carbohydrates;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private store: Store,
              private cService: CalendarService,
              private udService: UserDataService) { }

  ngOnInit(): void {
    if(!this.time){
      this.fats = this.protein = this.carbohydrates = this.kcal = 0;

      const newDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      newDate.setHours(0,0,0,0);

      if(+this.date === +newDate) {
        this.title = 'Today';
      } else {
        const time = new Date(+this.date);
        let header = Months[time.getMonth()];
        header = (header.substr(0, 1).toUpperCase())+(header.substr(1));

        this.title = `${header}-${time.getDate()}`
      }


      this.cService.mealsArr.forEach( value => {
        console.log(+value.date, +this.date);
        if(+value.date === +this.date) {
          this.meals.push(value);
        }
      });

      this.meals.forEach( value => {
        // @ts-ignore
        this.fats += (+value.fats);
        // @ts-ignore
        this.protein += (+value.proteins);
        // @ts-ignore
        this.carbohydrates += (+value.carbohydrates);
        // @ts-ignore
        this.kcal += (+value.kcal);
      } )
    }

  }

  public deleteMeal(): void {
    // this.cService.deleteMeal(this.date, this.time);
    this.store.dispatch(removeMealAction({date: this.date, time: this.time}));
    this.router.navigate(['/calendar']);
  }

  public deleteMealFromList(meal: ICalendarCell): void {
    // this.cService.deleteMeal(meal.date, meal.time);
    this.store.dispatch(removeMealAction({date: meal.date, time: meal.time}));
    this.meals = this.meals.filter(obj => obj !== meal)
  }
}
