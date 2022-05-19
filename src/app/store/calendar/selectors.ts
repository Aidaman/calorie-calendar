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

export const hasWeekValueSelector = createSelector(
  calendarFeatureSelector,
  (calendarState: ICalendarState) => calendarState.weekHasValue
);

export const weekSelector = createSelector(
  calendarFeatureSelector,
  (calendarState: ICalendarState) => calendarState.week
);
