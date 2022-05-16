import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ICalendarState} from "./calendar-reducers";

export const calendarFeatureSelector = createFeatureSelector<ICalendarState>('calendarData');

export const weekSelector = createSelector(
  calendarFeatureSelector,
  (calendarState: ICalendarState) => calendarState.week
);

export const mealsArrSelector = createSelector(
  calendarFeatureSelector,
  (calendarState: ICalendarState) => calendarState.mealsArr
);
