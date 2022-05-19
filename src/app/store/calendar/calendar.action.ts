import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../action-types.enum";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";

export const weekChangeAction = createAction(
  ActionTypes.WEEK_CHANGE,
  props<{week: Date[]}>()
)
export const weekChangeSuccessAction = createAction(
  ActionTypes.WEEK_CHANGE_SUCCESS,
  props<{week: Date[]}>()
)
export const weekChangeFailureAction = createAction(
  ActionTypes.WEEK_CHANGE_FAILURE,
)

export const addMealAction = createAction(
  ActionTypes.ADD_MEAL,
  props<{meal: ICalendarCell}>(),
)
export const addMealSuccessAction = createAction(
  ActionTypes.ADD_MEAL_SUCCESS,
  props<{meals: ICalendarCell[]}>(),
)
export const addMealFailureAction = createAction(
  ActionTypes.ADD_MEAL_FAILURE,
)

export const removeMealAction = createAction(
  ActionTypes.REMOVE_MEAL,
  props<{date: Date, time: string}>(),
)
export const removeMealSuccessAction = createAction(
  ActionTypes.REMOVE_MEAL_SUCCESS,
  props<{meals: ICalendarCell[]}>(),
)
export const removeMealFailureAction = createAction(
  ActionTypes.REMOVE_MEAL_FAILURE,
)

export const loadMealsAction = createAction(
  ActionTypes.MEALS_LOAD,
)
export const loadMealsSuccessAction = createAction(
  ActionTypes.MEALS_LOAD_SUCCESS,
  props<{mealsArr: ICalendarCell[]}>(),
)
export const loadMealsFailureAction = createAction(
  ActionTypes.MEALS_LOAD_FAILURE,
)
