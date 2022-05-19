import {createReducer, on} from "@ngrx/store";
import {
  addMealAction,
  addMealFailureAction,
  addMealSuccessAction,
  loadMealsAction,
  loadMealsFailureAction,
  loadMealsSuccessAction,
  removeMealAction,
  removeMealFailureAction,
  removeMealSuccessAction,
  weekChangeAction,
  weekChangeFailureAction,
  weekChangeSuccessAction
} from "./calendar.action";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";

export interface ICalendarState{
  mealsArr: ICalendarCell[]
  week: Date[],
  isLoading: boolean;
  weekHasValue: boolean;
  mealsArrHasValue: boolean;
}

const initialCalendarState: ICalendarState = {
  mealsArr: [],
  week: [],
  isLoading: false,
  weekHasValue: false,
  mealsArrHasValue: false,
}

export const calendarReducer = createReducer(
  initialCalendarState,
  on(weekChangeAction, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(weekChangeSuccessAction, (state, action) => ({
    ...state,
    week: action.week,
    isLoading: false,
    weekHasValue: true,
  })),
  on(weekChangeFailureAction, (state) => ({
    ...state,
    week: [],
    isLoading: false,
    weekHasValue: false,
  })),

  on(addMealAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(addMealSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    mealsArr: action.meals,
  })),
  on(addMealFailureAction, (state) => ({
    ...state,
    mealsArr: [],
    isLoading: false,
  })),

  on(removeMealAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(removeMealSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    mealsArr: action.meals,
  })),
  on(removeMealFailureAction, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(loadMealsAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadMealsSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    mealsArrHasValue: true,
    mealsArr: action.mealsArr,
  })),
  on(loadMealsFailureAction, (state) => ({
    ...state,
    mealsArrHasValue: false,
    isLoading: false,
  })),
);
