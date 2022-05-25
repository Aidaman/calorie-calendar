import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";
import {StartPageComponent} from "./start-page/start-page.component";
import {UserProfileComponent} from "./Forms/user-profile/user-profile.component";
import {AddMealComponent} from "./Forms/add-meal/add-meal.component";
import {ViewMealComponent} from "./Forms/view-meal/view-meal.component";
import {CalendarGridComponent} from "./calendar/callendar-grid/calendar-grid.component";
import {ViewDayComponent} from "./Forms/view-day/view-day.component";
import {AuthGuard} from "./shared/guards/auth.guard";

//TODO: Guard
const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard], children: [
      {path: '', component: CalendarGridComponent},
      // {path: ':day/watch', component: ViewDayComponent},
      {path: ':date/:time/add', component: AddMealComponent},
      {path: ':date/:time/view', component: ViewMealComponent},
      {path: ':date/:time/view-day', component: ViewDayComponent},
    ]},
  {path: 'profile', canActivate: [AuthGuard], component: UserProfileComponent},

  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

