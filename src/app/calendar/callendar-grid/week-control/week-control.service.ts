import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {DaysOfWeek} from "../../../shared/consts/days-of-week";
import {Months} from "../../../shared/consts/months";
import {SelectedMonthService} from "../../calendar-select/selected-month.service";
import {Router} from "@angular/router";
import {IWeekDay} from "../../../shared/interfaces/week-day";
import {CalendarService} from "../../calendar.service";
import {Observable} from "rxjs";
import {ICalendarCell} from "../../../shared/interfaces/calendar-cell.interface";
import {mealsArrSelector} from "../../../store/calendar/selectors";
import {map} from "rxjs/operators";

const weekDays: IWeekDay[] = [
  {dayNum: 0, nameOfDay: "sun", activeFlag: false, date: ''},
  {dayNum: 1, nameOfDay: "mon", activeFlag: false, date: ''},
  {dayNum: 2, nameOfDay: "tue", activeFlag: false, date: ''},
  {dayNum: 3, nameOfDay: "wed", activeFlag: false, date: ''},
  {dayNum: 4, nameOfDay: "thu", activeFlag: false, date: ''},
  {dayNum: 5, nameOfDay: "fri", activeFlag: false, date: ''},
  {dayNum: 6, nameOfDay: "sat", activeFlag: false, date: ''},
]

@Injectable({
  providedIn: 'root'
})
export class WeekControlService {
  public today = new Date();

  private currentWeek = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  private days: Date[] = [];
  // private days: IWeekDay[] = [];

  private monday = new Date(this.today.setDate( this.today.getDate() - this.today.getDay()+1) );

  public months: string[] = Months;

  constructor(private selectedMonth: SelectedMonthService,
              private calendarService: CalendarService,
              private router: Router) {
    this.currentWeek = this.monday;
    this.generateDaysArr(this.monday);
  }

  public decrease(): void{
    this.monday = new Date( this.monday.setDate( this.monday.getDate() - this.monday.getDay()-6) );
    this.generateDaysArr(this.monday);
  }

  public increase(): void{
    this.monday = new Date( this.monday.setDate( this.monday.getDate() - this.monday.getDay()+8) );
    this.generateDaysArr(this.monday);
  }

  //TODO: Сделать чистой функцией
  private generateDaysArr(monday: Date){
    const days = []
    //first is pushing current monday, then push through cycle next 6 days
    days.push(monday);
    for (let i = 1; i < 7; i++) {
      const nextDay = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+i);
      days.push(nextDay)
    }
    this.calendarService.week.next(days)
  }

  public getMonth(){
    if(this.currentWeek.getMonth() != this.monday.getMonth()){
      this.selectedMonth.select.next(this.months[this.monday.getMonth()]);
    }
  }

  public onMonthChanged(e: string): void {
    const dateOnMonth = new Date(this.today.getFullYear(), Months.indexOf(e));
    this.monday = this.currentWeek = new Date(dateOnMonth.getFullYear(), dateOnMonth.getMonth(),
      (dateOnMonth.getDate() - dateOnMonth.getDate()+1)+(8-dateOnMonth.getDay()));

    this.generateDaysArr(this.monday);
  }
}
