import { Pipe, PipeTransform } from '@angular/core';
import {ICalendarCell} from "../interfaces/calendar-cell.interface";
// import {getValidDate} from "../consts/get-valid-date";

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

  // transform(date: Date, arr: {date: Date, meals: Map<string, ICalendarCell> }[]): number | undefined {
  //   let amount: number = 0;
  //   const argDate = getValidDate(new Date(+date));
  //   arr.forEach((meal)=>{
  //     meal.meals.forEach((cell)=>{
  //       const cellDate = getValidDate((new Date(+meal.date)));
  //       if (argDate === cellDate){
  //         console.log(argDate, cellDate);
  //         console.log('date', +date, 'meal date', +meal.date, 'cell date', +cell.date);
  //         amount += cell.kcal;
  //       }F
  //     })
  //   })
  //   return amount === 0? 0 : amount;
  // }
  transform(date: Date, arr: ICalendarCell[] | null): number | undefined {
    let amount: number = 0;
    arr?.forEach((meal)=>{
        if (+date === +meal.date){
          amount += meal.kcal;
        }
    })
    return amount === 0? 0 : amount;
  }

}
