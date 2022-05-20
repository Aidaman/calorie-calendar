import {Pipe, PipeTransform} from "@angular/core";
import {ICalendarCell} from "../interfaces/calendar-cell.interface";
import {findMeal} from "../consts/findMeal";

@Pipe({
  name: 'findMealPipe'
})
export class FindMealPipe implements PipeTransform {
  transform(date: Date, time: string = '', array: ICalendarCell[]): ICalendarCell | undefined {
    return findMeal(date, time, array);
  }
}
