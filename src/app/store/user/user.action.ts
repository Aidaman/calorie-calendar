import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../action-types.enum";
import {IUser} from "../../shared/interfaces/user";

//      >>>user<<<      //
export const userUpdateAction = createAction(
  ActionTypes.USER_UPDATE,
  props<{user: IUser}>(),
)

export const userUpdateSuccessAction = createAction(
  ActionTypes.USER_UPDATE_SUCCESS,
  props<{user: IUser | null}>(),
)

export const userUpdateFailureAction = createAction(
  ActionTypes.USER_UPDATE_FAILURE,
)

export const userLoginAction = createAction(
  ActionTypes.USER_LOGIN,
)

export const userLoginSuccessAction = createAction(
  ActionTypes.USER_LOGIN_SUCCESS,
  props<{user: IUser | null}>(),
)

export const userLoginFailureAction = createAction(
  ActionTypes.USER_LOGIN_FAILURE,
)
