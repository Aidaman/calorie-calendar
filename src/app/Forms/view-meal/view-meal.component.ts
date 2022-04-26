import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";
import {CalendarService} from "../../calendar/calendar.service";
import {findMeal} from "../../shared/consts/findMeal";
import {Months} from "../../shared/consts/months";
import {TitleCasePipe} from "@angular/common";
import {UserDataService} from "../../user-data.service";

@Component({
  selector: 'app-view-meal',
  templateUrl: './view-meal.component.html',
  styleUrls: ['./view-meal.component.scss', '../registration/registration.component.scss', '../custom-control/custom-control.component.scss']
})
export class ViewMealComponent implements OnInit {
  private date: string = this.activeRoute.snapshot.params['day']
  private time: string = this.activeRoute.snapshot.params['time'];
  private meal?: ICalendarCell = findMeal(this.date, this.time, this.cService.mealsArr);

  public isDayView: boolean = this.activeRoute.snapshot.params['isDayView'] !== undefined

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
              private cService: CalendarService,
              private udService: UserDataService) { }

  ngOnInit(): void {
    if(this.isDayView){
      this.fats = this.protein = this.carbohydrates = this.kcal = 0;

      let month = this.date.substr(0,2);
      const day = this.date.substr(3, 2)
      const currentDay = new Date().toLocaleDateString().substr(0,2);
      const currentMonth = new Date().toLocaleDateString().substr(3,2);

      if(currentDay === day &&
        currentMonth === month) {
        this.title = 'Today';
      } else{
        month = Months[+month-1];
        month = (month.substr(0, 1).toUpperCase())+(month.substr(1));

        this.title = `${month} ${day}`
      }

      this.cService.mealsArr.forEach( value => {
        if(value.date === this.date) this.meals.push(value);
      });

      this.meals.forEach( value => {
        //@ts-ignore
        this.fats = this.fats + (+value.fats);
        //@ts-ignore
        this.protein = this.protein + (+value.proteins);
        //@ts-ignore
        this.carbohydrates = this.carbohydrates + (+value.carbohydrates);
        //@ts-ignore
        this.kcal = this.kcal + (+value.kcal);
      } )
    }

  }

  public deleteMeal(): void {
    this.cService.deleteMeal(this.date, this.time);
    this.router.navigate(['/calendar']);
  }

  public deleteMealFromList(meal: ICalendarCell): void {
    this.meals = this.meals.filter(obj => obj !== meal)
    this.cService.deleteMeal(meal.date, meal.time);
  }
}
