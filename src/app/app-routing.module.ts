import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarComponent} from "./calendar/calendar.component";
import {StartPageComponent} from "./start-page/start-page.component";
import {UserProfileComponent} from "./Forms/user-profile/user-profile.component";
import {AddMealComponent} from "./Forms/add-meal/add-meal.component";
import {ViewMealComponent} from "./Forms/view-meal/view-meal.component";
import {CalendarGridComponent} from "./calendar/callendar-grid/calendar-grid.component";

const routes: Routes = [
  {path: '', component: StartPageComponent, pathMatch: 'full'},
  {path: 'calendar', component: CalendarComponent, children: [
      {path: '', component: CalendarGridComponent},
      // {path: ':day/watch', component: ViewDayComponent},
      {path: ':date/:time/add', component: AddMealComponent},
      {path: ':date/:time/view', component: ViewMealComponent},
      {path: ':date/:time/:isDay/view', component: ViewMealComponent},
    ]},
  {path: 'profile', component: UserProfileComponent},

  /*                TEST                 */
  // {path: 'a', component: AddMealComponent},
  // {path: 'b', component: ViewMealComponent},
  // {path: 'c', component: ViewDayComponent},

  {path: '**', component: StartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

