import {ICalendarCell} from "../interfaces/calendar-cell.interface";

export const findMeal = (date: Date, time: string, mealArr: ICalendarCell[]): ICalendarCell | undefined => {
  return mealArr.find(meal => {
    return +meal.date === +date && meal.time === time;
  });
}

