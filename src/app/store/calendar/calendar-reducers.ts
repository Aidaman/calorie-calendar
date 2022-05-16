import {createReducer, on} from "@ngrx/store";
import {
  addMealAction,
  addMealFailureAction,
  addMealSuccessAction,
  loadMealAction,
  loadMealFailureAction,
  loadMealSuccessAction,
  removeMealAction,
  removeMealFailureAction,
  removeMealSuccessAction,
  weekChangeAction,
  weekChangeFailureAction,
  weekChangeSuccessAction
} from "./calendar.action";
import {IWeekDay} from "../../shared/interfaces/week-day";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";

export interface ICalendarState{
  week: IWeekDay[],
  mealsArr: ICalendarCell[]
}

const initialCalendarState: ICalendarState = {
  week: [],
  mealsArr: JSON.parse( localStorage.getItem('meals') as string ) || [],
}

export const calendarReducers = createReducer(
  initialCalendarState,
  on(weekChangeAction, (state, action) => ({
    ...state,
    week: action.week,
  })),
  on(weekChangeSuccessAction, (state, action) => ({
    ...state,
    week: action.week,
  })),
  on(weekChangeFailureAction, (state) => ({
    ...state,
  })),

  on(addMealAction, (state) => ({
    ...state,
  })),
  on(addMealSuccessAction, (state, action) => ({
    ...state,
    mealsArr: action.meals,
  })),
  on(addMealFailureAction, (state) => ({
    ...state,
  })),

  on(removeMealAction, (state) => ({
    ...state,
  })),
  on(removeMealSuccessAction, (state, action) => ({
    ...state,
    mealsArr: action.meals,
  })),
  on(removeMealFailureAction, (state) => ({
    ...state,
  })),

  on(loadMealAction, (state) => ({
    ...state,
  })),
  on(loadMealSuccessAction, (state, action) => ({
    ...state,
    mealsArr: action.mealsArr,
  })),
  on(loadMealFailureAction, (state) => ({
    ...state,
  })),
);
