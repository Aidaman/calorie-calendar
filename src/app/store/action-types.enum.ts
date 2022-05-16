export enum ActionTypes{
  //Calendar Actions
  WEEK_CHANGE = '[Calendar] week changed', //Set array of dates (1, 2, 3..)????
  WEEK_CHANGE_SUCCESS ='[Calendar] week changed success',
  WEEK_CHANGE_FAILURE ='[Calendar] week changed failure',

  ADD_MEAL = '[Calendar] added meal',
  ADD_MEAL_SUCCESS = '[Calendar] added meal success',
  ADD_MEAL_FAILURE = '[Calendar] added meal failure',

  REMOVE_MEAL = '[Calendar] removed meal',
  REMOVE_MEAL_SUCCESS = '[Calendar] removed meal success',
  REMOVE_MEAL_FAILURE = '[Calendar] removed meal failure',

  MEALS_LOAD = '[Calendar] meals loading',
  MEALS_LOAD_SUCCESS = '[Calendar] meals loaded successfully',
  MEALS_LOAD_FAILURE = "[Calendar] meals weren't loaded",

  //user Actions
  USER_UPDATE = '[User] params changed',
  USER_UPDATE_SUCCESS = '[User] params changed success',
  USER_UPDATE_FAILURE = '[User] params changed failure',

  USER_LOGIN = '[User] login',
  USER_LOGIN_SUCCESS = '[User] login success',
  USER_LOGIN_FAILURE = '[User] login failure',
}
