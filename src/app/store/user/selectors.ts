import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IUser} from "../../shared/interfaces/user";

export interface IUserState{
  user: IUser | null
}

export const userFeatureSelector = createFeatureSelector<IUserState>('user');

export const userSelector = createSelector(
  userFeatureSelector,
  (userState: IUserState) => userState.user
);
