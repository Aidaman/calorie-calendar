import { Pipe, PipeTransform } from '@angular/core';
import {findMeal} from "../consts/findMeal";
import {CalendarService} from "../../calendar/calendar.service";
import {ICalendarCell} from "../interfaces/calendar-cell.interface";

@Pipe({
  name: 'handlePipe'
})
export class HandleOutputPipe implements PipeTransform {
  transform(date: Date, time: string = '', array: ICalendarCell[]): ICalendarCell | undefined {
    return findMeal(date, time, array);
  }
  // transform(value: Map<string, ICalendarCell>, key: string): ICalendarCell | null {
  //   return value.get(key) ?? null;
  // }
}

