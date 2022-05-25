import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ICalendarState} from "./calendar.reducer";

export const calendarFeatureSelector = createFeatureSelector<ICalendarState>('calendar');

export const mealsArrSelector = createSelector(
  calendarFeatureSelector,
  (calendarState: ICalendarState) => calendarState.mealsArr
);

export const hasMealsArrValueSelector = createSelector(
  calendarFeatureSelector,
  (calendarState: ICalendarState) => calendarState.mealsArrHasValue
);

export const mealsInDaySelector = (date: Date) => createSelector(
  calendarFeatureSelector,
  (calendarState: ICalendarState) => calendarState.mealsArr.filter((value)=> +value.date === +date),
)

export const mealSelector = (date: Date, time: string) => createSelector(
  calendarFeatureSelector,
  (calendarState: ICalendarState) => calendarState.mealsArr.find((value)=> (+value.date === +date && value.time === time)),
)

/** is not needed due to week changes often **/
//   export const hasWeekValueSelector = createSelector(
//   calendarFeatureSelector,
//   (calendarState: ICalendarState) => calendarState.weekHasValue
// );

export const weekSelector = createSelector(
  calendarFeatureSelector,
  (calendarState: ICalendarState) => calendarState.week
);
