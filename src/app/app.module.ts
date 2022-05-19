import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import {  AddMealComponent} from "./Forms/add-meal/add-meal.component";
import {  UserProfileComponent} from "./Forms/user-profile/user-profile.component";
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
import {userReducer} from "./store/user/user.reducer";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {calendarReducer} from "./store/calendar/calendar.reducer";
import {UserEffect} from "./store/user/effects/user.effect";
import {CalendarEffect} from "./store/calendar/effects/calendar.effect";

@NgModule({
  declarations: [
    AppComponent,
    AddMealComponent,
    UserProfileComponent,
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
        StoreModule.forFeature('calendar', calendarReducer),
        StoreDevtoolsModule.instrument({

        }),
        EffectsModule.forRoot(
          [UserEffect,
                    CalendarEffect,]),

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
