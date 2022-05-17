import {ICalendarCell} from "../interfaces/calendar-cell.interface";

export const findMeal = (date: Date, time: string, mealArr: ICalendarCell[]): ICalendarCell | undefined => {
  const sDate = date.getDate() > 9? date.getDate() : '0'+date.getDate();
  const sMonth = date.getMonth() > 9? date.getMonth() : '0'+date.getMonth();
  const sYear = date.getFullYear();
  return mealArr.find(meal => {
    return meal.date.toString() === `${sDate}-${sMonth}-${sYear}` && meal.time === time;
  });
}

