import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {DaysOfWeek} from "../../shared/consts/days-of-week";
import {Months} from "../../shared/consts/months";
import {SelectedMonthService} from "../calendar-select/selected-month.service";
import {Router} from "@angular/router";
import {IWeekDay} from "../../shared/interfaces/week-day";
import {CalendarService} from "../calendar.service";

interface IMonth{
  name: string;
  totalDays: number;
}

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

  private nextWeek = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  private days: IWeekDay[] = [];

  private monday = new Date(this.today.setDate( this.today.getDate() - this.today.getDay()+1) );

  public months: string[] = Months;

  constructor(private selectedMonth: SelectedMonthService,
              private calendarService: CalendarService,
              private router: Router) {
    this.nextWeek = this.monday;
    this.generateDaysArr();
  }

  public decrease(): void{
    this.monday = new Date( this.monday.setDate( this.monday.getDate() - this.monday.getDay()-6) );
    this.generateDaysArr();
  }

  public increase(): void{
    this.monday = new Date( this.monday.setDate( this.monday.getDate() - this.monday.getDay()+8) );
    this.generateDaysArr();
  }

  private generateDaysArr(){
    this.days = []

    //first is pushing current monday, then push through cycle next 6 days
    const mMonth: string = this.selectedMonth.getMonth( this.months[this.monday.getMonth()]);
    const mDate: string = this.monday.getDate() > 9? this.monday.getDate().toString() : '0'+this.monday.getDate();
    this.days.push({dayNum: this.monday.getDate(),
      nameOfDay: weekDays[this.monday.getDay()].nameOfDay,
      month: this.monday.getMonth(),
      date: mMonth+'-'+mDate});

    for (let i = 1; i < 7; i++) {
      this.nextWeek = new Date(this.monday.getFullYear(), this.monday.getMonth(), this.monday.getDate()+i);

      const cMonth: string = this.selectedMonth.getMonth( this.months[this.nextWeek.getMonth()]);
      const cDate: string = this.nextWeek.getDate() > 9? this.nextWeek.getDate().toString() : '0'+this.nextWeek.getDate();

      this.days.push({dayNum: this.nextWeek.getDate(),
        nameOfDay: weekDays[this.nextWeek.getDay()].nameOfDay,
        month: this.nextWeek.getMonth(),
        date: cMonth+'-'+cDate})
    }
    this.calendarService.week.next(this.days)

    if(this.nextWeek.getMonth() != this.monday.getMonth()){
      this.selectedMonth.select.next(this.months[this.monday.getMonth()]);
    }

    //setting to one day 'active'-class
    this.days.map( (value) => {
      if (value.dayNum === (new Date).getDate() && value.month === (new Date).getMonth()) value.activeFlag = true;
    })

    this.selectedMonth.select.next(this.months[this.monday.getMonth()]);
  }

  public dayClick(weekday: IWeekDay): void {
    const sMonth = this.selectedMonth.getMonth( this.months[weekday.month]);
    const sDate = weekday.dayNum > 9? weekday.dayNum : '0'+weekday.dayNum;
    this.router.navigate(['calendar', sMonth+'-'+sDate, '12:00', 'day', 'view'])
  }

  public onMonthChanged(e: string): void {
    const dateOnMonth = new Date(this.today.getFullYear(), Months.indexOf(e));
    // console.log(dateOnMonth)
    this.monday = this.nextWeek = new Date(dateOnMonth.getFullYear(), dateOnMonth.getMonth(),
      (dateOnMonth.getDate() - dateOnMonth.getDate()+1)+(8-dateOnMonth.getDay()));

    this.generateDaysArr();

  }
}
