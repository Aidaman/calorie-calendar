import { NgModule } from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StartPageComponent } from './start-page/start-page.component';
import {  AddMealComponent} from "./Forms/add-meal/add-meal.component";
import {  RegistrationComponent} from "./Forms/registration/registration.component";
import {  ViewMealComponent} from "./Forms/view-meal/view-meal.component";
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarSelectComponent } from './calendar/calendar-select/calendar-select.component';
import { ShortPipe } from './shared/pipes/short.pipe';
import { CalendarGridComponent } from './calendar/callendar-grid/calendar-grid.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WeekControlComponent } from './calendar/week-control/week-control.component';
import { HandleOutputPipe } from './shared/pipes/handle-output.pipe';
import { CustomControlComponent } from './Forms/custom-control/custom-control.component';
import {  ColorFillPipe} from "./shared/pipes/color-fill.pipe";
import {  HandleKcalPipe} from "./shared/pipes/handleKcal.pipe";
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "angularx-social-login";

@NgModule({
  declarations: [
    AppComponent,
    AddMealComponent,
    RegistrationComponent,
    ViewMealComponent,
    CalendarComponent,
    StartPageComponent,
    CalendarHeaderComponent,
    CalendarSelectComponent,
    ShortPipe,
    CalendarGridComponent,
    WeekControlComponent,
    HandleOutputPipe,
    CustomControlComponent,
    ColorFillPipe,
    HandleKcalPipe,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule,
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
