import {ICalendarCell} from "../interfaces/calendar-cell.interface";

export const findMeal = (date: string, time: string, mealArr: ICalendarCell[]): ICalendarCell | undefined => {
  if (!time){
    return mealArr.find( meal => {
      return meal.date === date;
    });
  }
  else {
    return mealArr.find( meal => {
      return meal.date === date && meal.time === time;
    });
  }
}
