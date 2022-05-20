import {createReducer, on} from "@ngrx/store";
import {
  userLoginAction, userLoginFailureAction,
  userLoginSuccessAction,
  userUpdateAction,
  userUpdateFailureAction,
  userUpdateSuccessAction
} from "./user.action";
import {IUser} from "../../shared/interfaces/user";

export interface IUserState{
  isLoading: boolean,
  user: IUser,
  hasValue: boolean
}

const initialUserState: IUserState = {
  user: {},
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
      isLoading: false,
    })
  }),
)
