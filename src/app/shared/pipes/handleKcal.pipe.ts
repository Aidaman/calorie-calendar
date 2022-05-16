import { Pipe, PipeTransform } from '@angular/core';
import {CalendarService} from "../../calendar/calendar.service";
import {findKCal} from "../consts/findKCal";
import {IdayKcals} from "../interfaces/dayKcal";

@Pipe({
  name: 'handleKcal'
})
export class HandleKcalPipe implements PipeTransform {

  constructor(private cCervice: CalendarService) {}

  transform(date: Date): IdayKcals | undefined {
    return findKCal(date, this.cCervice.generateTotalCaloriesArr());
  }

}
