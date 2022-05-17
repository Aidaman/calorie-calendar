import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeekControlComponent} from "./callendar-grid/week-control/week-control.component";
import {CalendarComponent} from "./calendar.component";
import {CalendarGridComponent} from "./callendar-grid/calendar-grid.component";
import {CalendarHeaderComponent} from "./calendar-header/calendar-header.component";
import {CalendarSelectComponent} from "./calendar-select/calendar-select.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    WeekControlComponent,
    CalendarComponent,
    CalendarGridComponent,
    CalendarHeaderComponent,
    CalendarSelectComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class CalendarModule { }
