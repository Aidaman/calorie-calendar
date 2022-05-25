import {createReducer, on} from "@ngrx/store";
import {
  userLoginAction, userLoginFailureAction,
  userLoginSuccessAction, userLogoutAction,
  userUpdateAction,
  userUpdateFailureAction,
  userUpdateSuccessAction
} from "./user.action";
import {IUser} from "../../shared/interfaces/user";
import {ICalendarCell} from "../../shared/interfaces/calendar-cell.interface";

export interface IUserState{
  isLoading: boolean,
  user: IUser,
  hasValue: boolean
}

const initialUserState: IUserState = {
  user: {
    id: '',
    gender: '',
    heightCm: 0,
    weightkg: 0,
    minCal: 0,
    maxCal: 0,
    fats: 0,
    proteins: 0,
    carbohydrates: 0,
  },
  isLoading: false,
  hasValue: false,
}

export const userReducer = createReducer(
  initialUserState,
  on(userUpdateAction, (state)=> {
    return ({
      ...state,
      isLoading: true
    })
  }),
  on(userUpdateSuccessAction, (state, action)=> {
    return ({
      ...state,
      user: action.user,
      isLoading: false,
      hasValue: true,
    })
  }),
  on(userUpdateFailureAction, (state)=> {
    return ({
      ...state,
      isLoading: false,
    })
  }),

  on(userLoginAction, (state)=> {
    return ({
      ...state,
      isLoading: true,
    })
  }),
  on(userLoginSuccessAction, (state, action)=> {
    return ({
      ...state,
      isLoading: false,
      hasValue: true,
      user: action.user
    })
  }),
  on(userLoginFailureAction, (state)=> {
    return ({
      ...state,
      hasValue: false,
      isLoading: false,
    })
  }),
  on(userLogoutAction, ()=> {
    return ({
      user: {
        id: '',
        gender: '',
        heightCm: 0,
        weightkg: 0,
        minCal: 0,
        maxCal: 0,
        fats: 0,
        proteins: 0,
        carbohydrates: 0,
        meals: [],
      },
      isLoading: false,
      hasValue: false,
    })
  })
)
