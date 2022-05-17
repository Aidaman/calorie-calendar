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
  styleUrls: ['./view-meal.component.scss', '../registration/registration.component.scss', '../custom-control/custom-control.component.scss']
})
export class ViewMealComponent implements OnInit {
  private date: string = this.activeRoute.snapshot.params['date']
  public time: string = this.activeRoute.snapshot.params['time'];
  private fulldate: Date = new Date(+this.date.substr(6, 4), +this.date.substr(3, 2), +this.date.substr(0,2));

  // public isDayView: boolean = this.activeRoute.snapshot.params['isDayView'] !== undefined
  private meal?: ICalendarCell = findMeal(this.fulldate, this.time, this.cService.mealsArr);

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

      const month = +this.date.substr(3, 2);
      const day = +this.date.substr(0,2);
      const currentMonth = new Date().getMonth();
      const currentDay = new Date().getDate();
      // console.log(month, day, currentMonth, currentDay);

      if(currentDay === day &&
        currentMonth === month) {
        this.title = 'Today';
      } else{
        let header = Months[month];
        header = (header.substr(0, 1).toUpperCase())+(header.substr(1));

        this.title = `${header}-${day}`
      }

      this.cService.mealsArr.forEach( value => {
        console.log(value.date.toString(), this.date);
        if(value.date.toString() === this.date) {
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

    this.store.dispatch(removeMealAction({date: this.fulldate, time: this.time}));
    this.router.navigate(['/calendar']);
  }

  public deleteMealFromList(meal: ICalendarCell): void {
    // this.cService.deleteMeal(meal.date, meal.time);

    this.store.dispatch(removeMealAction({date: meal.date, time: meal.time}));
    this.meals = this.meals.filter(obj => obj !== meal)
  }
}
