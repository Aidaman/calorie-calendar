import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColorFillPipe} from "./pipes/color-fill.pipe";
import {HandleOutputPipe} from "./pipes/handle-output.pipe";
import {HandleKcalPipe} from "./pipes/handleKcal.pipe";
import {ShortPipe} from "./pipes/short.pipe";
import {FindMealPipe} from "./pipes/find-meal.pipe";



@NgModule({
  declarations: [
    ColorFillPipe,
    HandleOutputPipe,
    HandleKcalPipe,
    ShortPipe,
    FindMealPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ColorFillPipe,
    HandleOutputPipe,
    HandleKcalPipe,
    ShortPipe,
    FindMealPipe,
  ]
})
export class SharedModule { }
