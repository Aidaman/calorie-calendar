import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import {  AddMealComponent} from "./Forms/add-meal/add-meal.component";
import {  RegistrationComponent} from "./Forms/registration/registration.component";
import {  ViewMealComponent} from "./Forms/view-meal/view-meal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "angularx-social-login";
import {CalendarModule} from "./calendar/calendar.module";
import {SharedModule} from "./shared/shared.module";
import {CustomControlComponent} from "./Forms/custom-control/custom-control.component";
import {StoreModule} from "@ngrx/store";
import {userReducer} from "./store/user/user-reducers";
import {EffectsModule} from "@ngrx/effects";
import {UserChangeEffect} from "./store/user/effects/user-change.effect";
import {UserLognEffect} from "./store/user/effects/user-login.effect";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {AddMealsEffect} from "./store/effects/add-meails.effect";
import {calendarReducers} from "./store/calendar/calendar-reducers";
import {RemoveMealsEffect} from "./store/effects/remove-meals.effect";
import {GetMealsArrEffect} from "./store/effects/get-meals-arr.effect";

@NgModule({
  declarations: [
    AppComponent,
    AddMealComponent,
    RegistrationComponent,
    ViewMealComponent,
    StartPageComponent,
    CustomControlComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule,
        CalendarModule,
        SharedModule,

        StoreModule.forRoot({}),
        StoreModule.forFeature('user', userReducer),
        StoreModule.forFeature('calendar', calendarReducers),
        StoreDevtoolsModule.instrument({

        }),
        EffectsModule.forRoot(
          [UserChangeEffect,
                    UserLognEffect,
                    AddMealsEffect,
                    RemoveMealsEffect,
                    GetMealsArrEffect]),

        // SocialAuthService,
        // GoogleLoginProvider,
        HammerModule
    ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('185231214533-f7bcruk4pkm5mnr5rl8hv3f2oflmlqb7.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
