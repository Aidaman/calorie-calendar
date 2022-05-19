import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IUser} from "../../shared/interfaces/user";
import {IUserState} from "./user.reducer";

export const userFeatureSelector = createFeatureSelector<IUserState>('user');

export const userSelector = createSelector(
  userFeatureSelector,
  (userState: IUserState) => userState.user
);

export const hasUserValueSelector = createSelector(
  userFeatureSelector,
  (userState: IUserState) => userState.hasValue
);
