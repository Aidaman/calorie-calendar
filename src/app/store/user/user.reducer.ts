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
    console.log('User update started')
    return ({
      ...state,
      isLoading: true
    })
  }),
  on(userUpdateSuccessAction, (state, action)=> {
    console.log('User updated successfully')
    return ({
      ...state,
      user: action.user,
      isLoading: false,
      hasValue: true,
    })
  }),
  on(userUpdateFailureAction, (state)=> {
    console.log('User update is unsuccessful')
    return ({
      ...state,
      isLoading: false,
    })
  }),

  on(userLoginAction, (state)=> {
    console.log('user login started')
    return ({
      ...state,
      isLoading: true,
    })
  }),
  on(userLoginSuccessAction, (state, action)=> {
    console.log('user login successful')
    return ({
      ...state,
      isLoading: false,
      hasValue: true,
      user: action.user
    })
  }),
  on(userLoginFailureAction, (state)=> {
    console.log('user login UNsuccessful')
    return ({
      ...state,
      isLoading: false,
    })
  }),
)
