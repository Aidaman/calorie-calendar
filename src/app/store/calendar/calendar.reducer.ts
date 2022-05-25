import {createReducer, on} from "@ngrx/store";
import {
  addMealAction,
  addMealFailureAction,
  addMealSuccessAction, calendarClearAction,
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
  id: string,
  week: Date[],
  isLoading: boolean;
  weekHasValue: boolean;
  mealsArrHasValue: boolean;
}

const initialCalendarState: ICalendarState = {
  mealsArr: [],
  id: '',
  week: [],
  isLoading: false,
  weekHasValue: false,
  mealsArrHasValue: false,
}

export const calendarReducer = createReducer(
  initialCalendarState,
  on(weekChangeAction, (state) => ({
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
    mealsArr: [...state.mealsArr, action.meal],
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
    id: action.id,
  })),
  on(loadMealsFailureAction, (state) => ({
    ...state,
    mealsArrHasValue: false,
    isLoading: false,
  })),
  on(calendarClearAction, (state)=>({
    ...state,
    mealsArr: [],
    id: '',
    week: [],
    isLoading: false,
    mealsArrHasValue: false,
    weekHasValue: false,
  })),
);
