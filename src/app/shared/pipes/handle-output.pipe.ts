import { Pipe, PipeTransform } from '@angular/core';
import {findMeal} from "../consts/findMeal";
import {CalendarService} from "../../calendar/calendar.service";
import {ICalendarCell} from "../interfaces/calendar-cell.interface";

@Pipe({
  name: 'handlePipe'
})
export class HandleOutputPipe implements PipeTransform {
  // transform(date: Date, time: string = '', array: ICalendarCell[]): ICalendarCell | undefined {
  //   return findMeal(date, time, array);
  // }
  transform(value: { date: Date, meals: Map<string, ICalendarCell> }[], key: string, date: Date): ICalendarCell | null {
    let res;
    value.forEach((meals)=>{
      if (+meals.date === +date) res = meals.meals.get(key);
    });
    return res? res : null;
  }
}

