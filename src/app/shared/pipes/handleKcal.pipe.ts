import { Pipe, PipeTransform } from '@angular/core';
import {ICalendarCell} from "../interfaces/calendar-cell.interface";

@Pipe({
  name: 'handleKcal'
})
export class HandleKcalPipe implements PipeTransform {
  // transform(date: Date, arr: {date: Date, meals: Map<string, ICalendarCell> }[]): number | undefined {
    // let amount: number = 0;
    // arr.forEach((column)=>{
    //   if (+date === +column.date){
    //     column.meals.forEach((value)=>{
    //       amount += value.kcal;
    //     })
    //   }
    // })
    // console.log('====----====');
    // return amount === 0? 0 : amount;
  // }

  transform(date: Date, arr: {date: Date, meals: Map<string, ICalendarCell> }[]): number | undefined {
    let amount: number = 0;
    arr.forEach((meal)=>{
      meal.meals.forEach((cell)=>{
        if (+date === +cell.date){
          amount += cell.kcal;
        }
      })
    })
    return amount === 0? undefined : amount;
  }

}
