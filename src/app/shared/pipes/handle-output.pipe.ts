import { Pipe, PipeTransform } from '@angular/core';
import {findMeal} from "../consts/findMeal";
import {CalendarService} from "../../calendar/calendar.service";
import {ICalendarCell} from "../interfaces/calendar-cell.interface";

@Pipe({
  name: 'handlePipe'
})
export class HandleOutputPipe implements PipeTransform {
  constructor(private cCervice: CalendarService) {}

  transform(date: Date, time: string = '', array: ICalendarCell[] = this.cCervice.mealsArr): ICalendarCell | undefined {
    return findMeal(date, time, array);
  }

}

