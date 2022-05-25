import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../action-types.enum";
import {IUser} from "../../shared/interfaces/user";

export const userUpdateAction = createAction(
  ActionTypes.USER_UPDATE,
  props<{user: IUser}>(),
)

export const userUpdateSuccessAction = createAction(
  ActionTypes.USER_UPDATE_SUCCESS,
  props<{user: IUser}>(),
)

export const userUpdateFailureAction = createAction(
  ActionTypes.USER_UPDATE_FAILURE,
)

export const userLoginAction = createAction(
  ActionTypes.USER_LOGIN,
  props<{id: string}>()
)

export const userLoginSuccessAction = createAction(
  ActionTypes.USER_LOGIN_SUCCESS,
  props<{user: IUser}>(),
)

export const userLoginFailureAction = createAction(
  ActionTypes.USER_LOGIN_FAILURE,
)

export const userLogoutAction = createAction(
  ActionTypes.USER_LOGOUT,
)
